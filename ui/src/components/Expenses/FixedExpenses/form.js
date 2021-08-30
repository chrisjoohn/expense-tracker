import styled from "styled-components";

const StyledBtn = styled.button`
  margin-top: 20px;
  background-color: #00bfa6;
  color: #fff;
  border: 0px;
  padding: 10px;
  border-radius: 10px;
`;

const FixedExpenseForm = (props) => {
  const { submitHandler } = props;
  const defaultHandler = (e) => e.preventDefault();

  return (
    <form onSubmit={submitHandler || defaultHandler}>
      <label>Title</label>
      <input className="form-control"></input>
      <label>Amount</label>
      <input className="form-control"></input>
      <label>Months to pay</label>
      <input className="form-control"></input>
      <div style={{ textAlign: "center" }}>
        <StyledBtn>Create Expense</StyledBtn>
      </div>
    </form>
  );
};

export default FixedExpenseForm;
