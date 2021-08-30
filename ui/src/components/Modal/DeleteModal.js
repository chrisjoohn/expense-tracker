import Modal from "react-bootstrap/Modal";
import styled from "styled-components";

const StyledBtn = styled.button`
  background-color: ${({ danger }) => danger && "#ed5e68"};
  color: ${({ danger }) => danger && "#fff"};
  border: 0px;
  border-radius: 5px;
  padding: 10px;
  margin-right: 10px;
`;

const MessageContainer = styled.span`
  margin-top: 20px;
  margin-left: 40px;
  display: block;
`;

const BtnContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  padding-left: 50px;
  padding-right: 50px;
`;

const DeleteModal = ({ show, setShow, title, item, deleteHandler }) => {
  return (
    <Modal size="md" centered show={show} onHide={() => setShow(false)}>
      <Modal.Body>
        <div>
          <h5>{title}</h5>
          <MessageContainer>
            Are you sure you want to delete <strong>{item}</strong>?
          </MessageContainer>
          <BtnContainer>
            <StyledBtn onClick={() => setShow(false)}>Cancel</StyledBtn>
            <StyledBtn danger onClick={deleteHandler}>
              Delete
            </StyledBtn>
          </BtnContainer>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteModal;
