import styled from "styled-components";

const StyledBtn = styled.button`
  margin-top: 20px;
  background-color: #00bfa6;
  color: #fff;
  border: 0px;
  padding: 10px;
  border-radius: 10px;
`;

const OtherExpenseForm = (props) => {
  const { submitHandler } = props;
  const defaultHandler = (e) => e.preventDefault();

  return (
    <form onSubmit={submitHandler || defaultHandler}>
      <label>Title</label>
      <input className="form-control" required></input>
      <label>Amount</label>
      <input className="form-control" required></input>
      <div style={{ textAlign: "center" }}>
        <StyledBtn>Create Expense</StyledBtn>
      </div>
    </form>
  );
};

export default OtherExpenseForm;
