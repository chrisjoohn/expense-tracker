import styled from "styled-components";
import { Switch, Route } from "react-router-dom";
import { useState } from "react";

import Sidebar from "components/Sidebar";
import { MenuIcon } from "icons";

import Main from "./Main";
import Reports from "./Reports";

const DashboardWrapper = styled.div`
  height: 100vh;
  background-color: #f3f3f3;
`;

const Dashboard = (props) => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <DashboardWrapper>
      <Sidebar
        hideSidebar={() => setShowSidebar(false)}
        hidden={!showSidebar}
      />
      <MenuIcon
        onClick={() => setShowSidebar(!showSidebar)}
        className="menu-icon"
        style={{
          height: "30px",
          width: "30px",
          position: "absolute",
          top: "40",
          left: "12%",
          cursor: "pointer",
        }}
      />
      <Switch>
        <Route path="/reports" component={Reports} exact />
        {/*
        <Route
          path="/fixed-expenses"
          render={() => <h1>Fixed Expenses</h1>}
          exact
        />
            */}
        <Route path="/" component={Main} exact />
      </Switch>
    </DashboardWrapper>
  );
};

export default Dashboard;
