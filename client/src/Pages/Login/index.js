import React, {Component, Fragment} from 'react';
import {Route, Redirect} from 'react-router-dom';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Session} from 'bc-react-session';
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


const style = {
  "width": "100%",
  "text-align": "center",
  "display": "flex",
  "justify-content": "center",
  "margin" : "10rem"
}

import {Signup,LoginUser} from '../../api';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
          register_email: '',
          register_password: '',
          register_confirm_password: '',
          login_email: '',
          login_password: '',
          redirect: 0
        };
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);

    }


    login(){

      if(this.state.login_email === ""){
        alert("eMail cannot be empty")
      }
      else if(this.state.login_password === ""){
        alert("password cannot be empty")
      }
      else{

        const history = this;
        LoginUser(this.state.login_email,this.state.login_password).then(function(response) {
          console.log(response.value.data.status)
          if(!response.value.data.status){
            alert("Invalid Credentials")
          }
          else{
            Session.login('app');

            Session.setPayload({
              eMail: response.value.data.email,
              userID: response.value.data.userID,
            });
            history.setState({redirect : 1})
          }
        });
      }
    }


    register(){
        if(this.state.register_email === ""){
          alert("Email address cannot be empty")
        }
        else if(this.state.register_password === ""){
          alert("Password cannot be empty")
        }
        else if(this.state.register_confirm_password === ""){
          alert("ConfirmPassword cannot be empty")
        }
        else if(this.state.register_confirm_password !== this.state.register_password){
          alert("Password Mismatch")
        }
        else{
          Signup(this.state.register_email,this.state.register_confirm_password).then(function(response) {
              if(response.value.data.acknowledged){
                alert("User registered successfully")
                window.location.reload()
              }
          });
        }
    }

    updateInputValue(event) {
      this.setState({
        [event.target.id]: event.target.value
      });
    }







    render() {
        return (
            <Fragment  >
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}
                    >

                    <Form onKeyPress={this.onKeyUp}>
                      <FormGroup row>
                      <div style = {style}>
                        <Card className="main-card mb-12">
                            <CardBody>
                                <CardTitle>Login</CardTitle>
                                <Form>
                                    <FormGroup row>
                                        <Col sm={10}>
                                          <Input type="text" name="text" id="login_email" placeholder = "Email" onChange={event => this.updateInputValue(event)} />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col sm={10}>
                                          <Input type="password" name="text" id="login_password" placeholder = "Password" onChange={event => this.updateInputValue(event)} />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                      <Col sm={{size: 10, offset: 0}}>
                                          <Button onClick={this.login}>Login</Button>
                                      </Col>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                        </Card>

                      </div>


                      <div style = {style}>

                      <Card className="main-card mb-12">
                          <CardBody>
                              <CardTitle>Signup</CardTitle>
                              <Form>
                                  <FormGroup row>
                                      <Col sm={10}>
                                        <Input type="text" name="text" id="register_email" placeholder = "Email" onChange={event => this.updateInputValue(event)} />
                                      </Col>
                                  </FormGroup>

                                  <FormGroup row>
                                      <Col sm={10}>
                                        <Input type="password" name="text" id="register_password" placeholder = "Password" onChange={event => this.updateInputValue(event)} />
                                      </Col>
                                  </FormGroup>

                                  <FormGroup row>
                                      <Col sm={10}>
                                        <Input type="password" name="text" id="register_confirm_password" placeholder = "ConfirmPassword" onChange={event => this.updateInputValue(event)} />
                                      </Col>
                                  </FormGroup>

                                  <FormGroup row>
                                    <Col sm={{size: 10, offset: 0}}>
                                        <Button onClick={this.register}>Signup</Button>
                                    </Col>
                                  </FormGroup>

                              </Form>
                          </CardBody>
                      </Card>

                      </div>

                      { this.state.redirect === 1 &&
                        <Route  render={() => (
                          <Redirect to="/dashboards/basic"/>
                        )}/>
                      }

                      </FormGroup>
                    </Form>

                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}
