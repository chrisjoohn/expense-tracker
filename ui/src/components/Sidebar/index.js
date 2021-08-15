import styled from "styled-components";
import { useLocation, useHistory } from "react-router-dom";

const Wrapper = styled.div`
  position: absolute;
  z-index: 2;
  width: 100vw;
  height: 100%;
`;

const SidebarWrapper = styled.div`
  position: relative;
  height: 100%;
  background-color: #00bfa6;
  width: 20vw;
  z-index: 4;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  text-align: center;
  color: #fff;
`;

const SidebarItemsContainer = styled.div``;

const LogoutContainer = styled.div`
  margin-bottom: 20px;
`;

const SidebarItem = styled.a`
  font-weight: ${({ active }) => active && "bold"};
  font-size: 25px;
  display: block;
  color: white;
`;

const SIDEBAR_ITEMS = [
  { name: "Home", path: "/" },
  { name: "Fixed Expenses", path: "/fixed-expenses" },
  { name: "Reports", path: "/reports" },
];

const Sidebar = (props) => {
  const { pathname } = useLocation();
  const history = useHistory();

  const { hidden, hideSidebar } = props;

  const logoutClickHandler = (e) => {
    e.preventDefault();
  };

  const sidebarItemClickHandler = (e, path) => {
    e.preventDefault();
    history.push(path);
    hideSidebar();
  };

  return (
    <Wrapper hidden={hidden} onClick={hideSidebar}>
      <SidebarWrapper onClick={(e) => e.stopPropagation()}>
        <div />
        <SidebarItemsContainer>
          {SIDEBAR_ITEMS.map((sidebarItem) => (
            <SidebarItem
              style={{ display: "block" }}
              key={sidebarItem.path}
              active={pathname === sidebarItem.path}
              href="#"
              onClick={(e) => sidebarItemClickHandler(e, sidebarItem.path)}
              style={{ color: "white" }}
              className="no-hightlights"
            >
              {" "}
              {sidebarItem.name}
            </SidebarItem>
          ))}
        </SidebarItemsContainer>
        <LogoutContainer>
          <hr style={{ width: "60%", backgroundColor: "white" }} />
          <SidebarItem
            href="#"
            onClick={logoutClickHandler}
            style={{ color: "white" }}
          >
            Logout
          </SidebarItem>
        </LogoutContainer>
      </SidebarWrapper>
    </Wrapper>
  );
};

export default Sidebar;
