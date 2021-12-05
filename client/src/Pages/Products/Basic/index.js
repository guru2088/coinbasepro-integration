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

import { MultiSelect } from "react-multi-select-component";

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
import {Session} from 'bc-react-session';
import {
    faAngleUp,
    faArrowRight,
    faArrowUp,
    faArrowLeft,
    faAngleDown
} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {GetSubscriptions,Subscribe} from '../../../api';

 function LoadSubscriptions(props) {
    const { subscribedProducts} = props;


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
                               <th className="text-center">Subscription ID</th>
                               <th className="text-center">Product</th>
                               <th className="text-center">CreatedAt</th>
                               <th className="text-center">Status</th>
                           </tr>
                           </thead>
                           <tbody>

                           {subscribedProducts.map(value =>
                             <tr>
                                 <td className="text-center text-muted">{value["id"]}</td>
                                 <td className="text-center text-muted">{value["products"].toString()}</td>
                                 <td className="text-center text-muted">{value["createdAt"]}</td>
                                 {value["active"]&&
                                    <td className="text-center text-muted">Active</td>
                                 }
                                 {!value["active"]&&
                                    <td className="text-center text-muted">In-Active</td>
                                 }
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
            product_types: [
              {"value" : 1, "label": "BTC-USD"},
              {"value" : 2, "label": "ETH-USD"},
              {"value" : 3, "label": "XRP-USD"},
              {"value" : 4, "label": "LTC-USD"}
            ],
            subscribed_product_types:[

            ],
            products:[

            ]
        };
        this.onsubmit = this.onsubmit.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);
        Session.login('app');

        const history = this;




        GetSubscriptions(Session.getPayload().userID).then(function(response) {
          const result = []
          response.value.data.forEach(function (value, i) {
              result.push({id: value["_id"], products: value["obj"]["productID"], createdAt: value["createdAt"]})
              if(i === response.value.data.length - 1){
                result.sort((a, b) => (a._id < b._id) ? 1 : -1);
                result[0]["active"] =  true
                history.setState({subscribed_product_types: result})
              }
          });
        });
    }

    updateInputValue(event) {
      const localarr = [];
      for(var i = 0; i < event.length; i ++){
        localarr.push(event[i])
        if( i === event.length - 1){
          this.setState({products : localarr})
        }
      }

    }

    onsubmit(){
      const history = this;

      if(this.state.products.length === 0){
        alert("Please select some product types")
      }
      else{
        const localaArr = []
        this.state.products.forEach(function (value, i) {
            localaArr.push(value["label"])
            if(i === history.state.products.length - 1){
              Subscribe(localaArr,Session.getPayload().userID).then(function(response) {
                if(response.status === "success"){
                  alert("Successfully saved");
                  window.location.reload()
                }
                else{
                  alert("Error in saving data,Please contact administrator")
                }
              });
            }
        });
      }

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
                            heading="Products Subscribe / Un Subscribe"
                            subheading="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                            icon="pe-7s-car icon-gradient bg-mean-fruit"
                        />
                        <Card className="main-card mb-3">
                            <CardBody>
                                <CardTitle>Product</CardTitle>
                                <Form>
                                    <FormGroup row>
                                      <Label for="camera_types" sm={2}>Product Types</Label>
                                        <Col sm={{size: 10, offset: 2}}>
                                            <MultiSelect
                                              options={this.state.product_types}
                                              value={this.state.products}
                                              onChange={this.updateInputValue}
                                              hasSelectAll ={false}
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                      <Col sm={{size: 10, offset: 2}}>
                                          <Button onClick = {this.onsubmit}>Submit</Button>
                                      </Col>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                        </Card>
                        <LoadSubscriptions subscribedProducts={this.state.subscribed_product_types} />
                    </div>
                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}
