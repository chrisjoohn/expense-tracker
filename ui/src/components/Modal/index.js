import BootstrapModal from "react-bootstrap/Modal";
import styled from "styled-components";

const StyledTitle = styled.h4`
  color: #00bfa6;
  text-align: center;
  margin-top: 10px;
  font-weight: bold;
`;

const StyledModalChildren = styled.div`
  padding: 10px;
`;

const Modal = ({ show, setShow, children, title }) => {
  return (
    <BootstrapModal
      size="sm"
      centered
      show={show}
      onHide={() => setShow(false)}
    >
      <BootstrapModal.Body>
        <StyledTitle>{title}</StyledTitle>
        <StyledModalChildren>{children}</StyledModalChildren>
      </BootstrapModal.Body>
    </BootstrapModal>
  );
};

export default Modal;
