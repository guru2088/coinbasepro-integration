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

import {
    faAngleUp,
    faArrowRight,
    faArrowUp,
    faArrowLeft,
    faAngleDown
} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Session} from 'bc-react-session';


import {GetSubscriptions,GetMatches} from '../../../api';



function LoadMatches(props) {
   const { matches} = props;


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
                              <th className="text-center">trade_id</th>
                              <th className="text-center">time</th>
                              <th className="text-center">taker_order_id</th>
                              <th className="text-center">size</th>
                              <th className="text-center">side</th>
                              <th className="text-center">sequence</th>
                              <th className="text-center">product_id</th>
                              <th className="text-center">price</th>
                              <th className="text-center">maker_order_id</th>


                          </tr>
                          </thead>
                          <tbody>
                            {matches.map(value =>
                              <tr>
                                  <td className="text-center text-muted">{value["_id"]}</td>
                                  <td className="text-center text-muted">{value["type"]}</td>
                                  <td className="text-center text-muted">{value["trade_id"]}</td>
                                  <td className="text-center text-muted">{value["time"]}</td>
                                  <td className="text-center text-muted">{value["taker_order_id"]}</td>
                                  <td className="text-center text-muted">{value["size"]}</td>
                                  {value["side"] === "sell" &&
                                      <td className="text-center text-muted bg-danger">{value["side"]}</td>
                                  }
                                  {value["side"] === "buy" &&
                                      <td className="text-center text-muted bg-success">{value["side"]}</td>
                                  }
                                  <td className="text-center text-muted">{value["sequence"]}</td>
                                  <td className="text-center text-muted">{value["product_id"]}</td>
                                  <td className="text-center text-muted">{value["price"]}</td>
                                  <td className="text-center text-muted">{value["maker_order_id"]}</td>


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

          matchResponse : [

          ]
        };
    }


    componentWillMount() {

      Session.login('app');
      const history = this;
      GetSubscriptions(Session.getPayload().userID).then(function(response) {
        const result = []
        response.value.data.forEach(function (value, i) {
            result.push({id: value["_id"], products: value["obj"]["productID"], createdAt: value["createdAt"]})
            if(i === response.value.data.length - 1){
              result.sort((a, b) => (a._id < b._id) ? 1 : -1);
              GetMatches(result[0]["products"]).then(function(matchResponse) {
                console.log(matchResponse.value.data)
                history.setState({matchResponse: matchResponse.value.data})
              });
            }
        });
      });
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
                          heading="Match View"
                          subheading="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                          icon="pe-7s-car icon-gradient bg-mean-fruit"
                      />

                      <LoadMatches matches={this.state.matchResponse} />

                    </div>
                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}
