import React, { useState } from "react";
import Content from "../layout/content/Content";
import Head from "../layout/head/Head";
import TrafficChannel from "../components/partials/analytic/traffic-channel/Traffic";
import AudienceOverview from "../components/partials/analytic/audience-overview/AudienceOverview";
import SessionDevice from "../components/partials/analytic/session-devices/SessionDevice";
import WebsitePerformance from "../components/partials/analytic/website-perfomance/WebsitePerfomance";
import BrowserUsers from "../components/partials/analytic/browser-users/BrowserUser";
import TrafficDoughnut from "../components/partials/analytic/traffic-dougnut/TrafficDoughnut";
import PageView from "../components/partials/analytic/page-view/PageView";
import ActiveUser from "../components/partials/analytic/active-user/ActiveUser";
import UserMap from "../components/partials/analytic/user-map/UserMap";
import { Card, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Button,
  Col,
  Icon,
  PreviewAltCard,
  Row,
} from "../components/Component";

const AnalyticsDashboard: React.FC = () => {
  const [sm, updateSm] = useState<boolean>(false);

  const handleDropdownClick = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    ev.preventDefault();
  };

  return (
    <React.Fragment>
      <Head title="Analytic Dashboard" />
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page>Analytics Dashboard</BlockTitle>
              <BlockDes className="text-soft">
                <p>Welcome to Analytics Dashboard Template.</p>
              </BlockDes>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <Button
                  className={`btn-icon btn-trigger toggle-expand me-n1 ${sm ? "active" : ""}`}
                  onClick={() => updateSm(!sm)}
                >
                  <Icon name="more-v" />
                </Button>
                <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    <li>
                      <UncontrolledDropdown>
                        <DropdownToggle tag="a" className="dropdown-toggle btn btn-white btn-dim btn-outline-light">
                          <Icon className="d-none d-sm-inline" name="calender-date" />
                          <span>
                            <span className="d-none d-md-inline">Last</span> 30 Days
                          </span>
                          <Icon className="dd-indc" name="chevron-right" />
                        </DropdownToggle>
                        <DropdownMenu end>
                          <ul className="link-list-opt no-bdr">
                            <li>
                              <DropdownItem tag="a" onClick={handleDropdownClick} href="#!">
                                <span>Last 30 days</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem tag="a" onClick={handleDropdownClick} href="#dropdownitem">
                                <span>Last 6 months</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem tag="a" onClick={handleDropdownClick} href="#dropdownitem">
                                <span>Last 3 weeks</span>
                              </DropdownItem>
                            </li>
                          </ul>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </li>
                    <li className="nk-block-tools-opt">
                      <Button color="primary">
                        <Icon name="reports" />
                        <span>Reports</span>
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <Block>
          <Row className="g-gs">
            <Col xxl="6">
              <PreviewAltCard className="card-bordered h-100">
                <AudienceOverview />
              </PreviewAltCard>
            </Col>
            <Col xxl="6">
              <Row className="g-gs">
                <Col sm="6">
                  <PreviewAltCard className="card-bordered">
                    <PageView />
                  </PreviewAltCard>
                </Col>
                <Col sm="6">
                  <PreviewAltCard className="card-bordered">
                    <SessionDevice />
                  </PreviewAltCard>
                </Col>
                <Col sm="6">
                  <PreviewAltCard className="card-bordered">
                    <ActiveUser />
                  </PreviewAltCard>
                </Col>
                <Col sm="6">
                  <PreviewAltCard className="card-bordered">
                    <WebsitePerformance />
                  </PreviewAltCard>
                </Col>
              </Row>
            </Col>
            <Col xxl="8">
              <Card className="card-bordered h-100">
                <UserMap />
              </Card>
            </Col>
            <Col xxl="4">
              <Row className="g-gs">
                <Col md="6" xxl="12">
                  <PreviewAltCard className="card-bordered">
                    <TrafficDoughnut />
                  </PreviewAltCard>
                </Col>
                <Col md="6" xxl="12">
                  <PreviewAltCard className="card-bordered">
                    <BrowserUsers />
                  </PreviewAltCard>
                </Col>
              </Row>
            </Col>
            <Col>
              <Card className="card-bordered">
                <TrafficChannel />
              </Card>
            </Col>
          </Row>
        </Block>
      </Content>
    </React.Fragment>
  );
};

export default AnalyticsDashboard;