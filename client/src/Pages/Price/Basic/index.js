import React, {Component, Fragment} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';

import {
    Row, Col,
    Button,
    CardHeader,
    Card,
    CardBody,
    Progress,
    TabContent,
    TabPane,
    CardTitle,
    Form,
    FormGroup,
    Label,
    Input,
    FormText
} from 'reactstrap';


import PageTitle from '../../../Layout/AppMain/PageTitle';

import {
    AreaChart, Area, Line,
    ResponsiveContainer,
    Bar,
    BarChart,
    ComposedChart,
    CartesianGrid,
    Tooltip,
    LineChart
} from 'recharts';
import { w3cwebsocket as W3CWebSocket } from "websocket";


import {
    faAngleUp,
    faArrowRight,
    faArrowUp,
    faArrowLeft,
    faAngleDown
} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Session} from 'bc-react-session';

import {GetSubscriptions,GetPrices} from '../../../api';



function LoadPrices(props) {
   const { prices} = props;


   return (
     <Row>
          <Col md="12">
              <Card className="main-card mb-3">
                  <div className="card-header">Product Subscription
                      <div className="btn-actions-pane-right">
                          <div role="group" className="btn-group-sm btn-group">
                              <button className="active btn btn-info">Last Week</button>
                              <button className="btn btn-info">All Month</button>
                          </div>
                      </div>
                  </div>
                  <div className="table-responsive">
                      <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                          <thead>
                          <tr>
                              <th className="text-center">ID</th>
                              <th className="text-center">type</th>
                              <th className="text-center">Last Trade ID</th>
                              <th className="text-center">Product ID</th>
                              <th className="text-center">SEQUENCE</th>
                              <th className="text-center">Time</th>

                          </tr>
                          </thead>
                          <tbody>
                            {prices.map(value =>
                              <tr>
                                  <td className="text-center text-muted">{value["_id"]}</td>
                                  <td className="text-center text-muted">{value["type"]}</td>
                                  <td className="text-center text-muted">{value["last_trade_id"]}</td>
                                  <td className="text-center text-muted">{value["product_id"]}</td>
                                  <td className="text-center text-muted">{value["sequence"]}</td>
                                  <td className="text-center text-muted">{value["time"]}</td>

                              </tr>
                             )}
                          </tbody>
                      </table>
                  </div>

              </Card>
          </Col>
      </Row>
   )
}


export default class AnalyticsDashboard1 extends Component {
    constructor() {
        super();

        this.state = {

          priceResponse : [

          ]
        };


    }

    componentWillMount() {
      Session.login('app');
      const history = this;

      const interval = setInterval(() => {
        GetSubscriptions(Session.getPayload().userID).then(function(response) {
          const result = []
          response.value.data.forEach(function (value, i) {
              result.push({id: value["_id"], products: value["obj"]["productID"], createdAt: value["createdAt"]})
              if(i === response.value.data.length - 1){
                result.sort((a, b) => (a._id < b._id) ? 1 : -1);
                GetPrices(result[0]["products"]).then(function(priceResponse) {
                  console.log(priceResponse.value.data)
                  history.setState({priceResponse: priceResponse.value.data})
                });
              }
          });
        });
      }, 50000);



    }

    render() {

        return (
            <Fragment>
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <div>
                      <PageTitle
                          heading="View Prices"
                          subheading="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                          icon="pe-7s-car icon-gradient bg-mean-fruit"
                      />
                      <LoadPrices prices={this.state.priceResponse} />

                    </div>
                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}
