import { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import {
  DeleteExpenseRequest,
  UpdateExpenseRequest,
} from "store/actionCreators/expense";

import { DeleteModal } from "components/Modal";
import { DeleteIcon } from "icons";

const ExpenseItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #818181;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const ExpenseTitle = styled.span`
  margin-left: 3px;
  cursor: pointer;
  text-decoration: ${({ checked }) => checked && "line-through"};
`;

const ExpenseAmount = styled.span`
  font-weight: bold;
`;

const ExpenseItem = (props) => {
  const { title = "Sample", amount = 0, isPaid = false, _id: id } = props;
  const dispatch = useDispatch();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const updateItem = () => {
    dispatch(UpdateExpenseRequest({ id, data: { isPaid: !isPaid } }));
  };

  const deleteItem = () => {
    dispatch(DeleteExpenseRequest({ id }));
    setShowDeleteModal(false);
  };

  return (
    <ExpenseItemWrapper>
      <DeleteModal
        show={showDeleteModal}
        setShow={setShowDeleteModal}
        item={title}
        title="Delete Expense"
        deleteHandler={deleteItem}
      ></DeleteModal>
      <div>
        <input
          type="checkbox"
          checked={isPaid}
          onChange={() => {}}
          onClick={updateItem}
        />
        <ExpenseTitle checked={isPaid} onClick={updateItem}>
          {title}
        </ExpenseTitle>
      </div>
      <ExpenseAmount>
        &#8369; {amount}
        <DeleteIcon
          onClick={() => setShowDeleteModal(true)}
          style={{
            height: "15px",
            color: "red",
            marginLeft: "5px",
            cursor: "pointer",
          }}
        />
      </ExpenseAmount>
    </ExpenseItemWrapper>
  );
};

export default ExpenseItem;
