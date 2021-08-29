import BootstrapModal from "react-bootstrap/Modal";
import styled from "styled-components";

const StyledTitle = styled.h4`
  color: #00bfa6;
  text-align: center;
  margin-top: 10px;
  font-weight: bold;
`;

const StyledModalChildren = styled.div``;

const Modal = ({ show, setShow, children, title }) => {
  return (
    <BootstrapModal
      size="md"
      centered
      show={show}
      onHide={() => setShow(false)}
    >
      <BootstrapModal.Body>
        <StyledModalChildren>
          <StyledTitle>{title}</StyledTitle>
          {children}
        </StyledModalChildren>
      </BootstrapModal.Body>
    </BootstrapModal>
  );
};

export default Modal;
