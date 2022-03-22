import { useRef } from "react";
import styled from "styled-components";
import { useLocation, useHistory } from "react-router-dom";
import useOutsideClick from "../../utils/detectOutsideClickUtil";

const SidebarWrapper = styled.div`
  position: absolute;
  height: 100%;
  background-color: #00bfa6;
  width: 20vw;
  z-index: 4;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  text-align: center;
  color: #fff;
  left: ${({ isOpen }) => (isOpen ? "-500px" : 0)};
  transition: left ease-in-out 0.8s;
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
  { name: "Reports", path: "/reports" },
];

const Sidebar = (props) => {
  const { pathname } = useLocation();
  const history = useHistory();
  const ref = useRef();

  const { hidden, hideSidebar } = props;

  const logoutClickHandler = (e) => {
    e.preventDefault();
    hideSidebar();
    localStorage.removeItem("auth_token");
    history.push("/login");
  };

  const sidebarItemClickHandler = (e, path) => {
    e.preventDefault();
    history.push(path);
    hideSidebar();
  };

  useOutsideClick(ref, hideSidebar);

  return (
    <SidebarWrapper isOpen={hidden} onClick={hideSidebar} ref={ref}>
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
  );
};

export default Sidebar;
