
# Setup and build the client

FROM node:14.8 as client

WORKDIR /usr/app/client/
COPY client/package*.json ./
RUN npm install -qy
COPY client/ ./
RUN npm run build


# Setup socket

FROM node:14.8 as socket

WORKDIR /usr/app/socket/
COPY socket/package*.json ./
RUN npm install -qy
COPY socket/ ./

# Setup the server

FROM node:14.8

WORKDIR /usr/app/
COPY --from=client /usr/app/client/build/ ./client/build/
COPY --from=socket /usr/app/socket/ ./client/build/

WORKDIR /usr/app/server/
COPY server/package*.json ./
RUN npm install -qy
COPY server/ ./

ENV PORT 8000

EXPOSE 8000

CMD ["npm", "start"]