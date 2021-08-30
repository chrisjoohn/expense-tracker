import styled from "styled-components";
import { useForm } from "react-hook-form";

import { useDispatch } from "react-redux";
import { CreateExpenseRequest } from "store/actionCreators/expense";

const StyledBtn = styled.button`
  margin-top: 20px;
  background-color: #00bfa6;
  color: #fff;
  border: 0px;
  padding: 10px;
  border-radius: 10px;
  cursor: ${({ disabled }) => disabled && "not-allowed"};
`;

const InputField = styled.input`
  color: ${({ hasError }) => hasError && "red"};
  border: ${({ hasError }) => hasError && "1px solid red"};
`;

const InputFieldError = styled.span`
  color: red;
  font-size: 12px;
`;

const OtherExpenseForm = (props) => {
  const { setShowModal } = props;
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm();

  const submitHandler = (data) => {
    new Promise((resolve, reject) => {
      dispatch(CreateExpenseRequest({ resolve, reject, data }));
    })
      .then(() => {
        setShowModal(false);
      })
      .catch((err) => {
        // Do something here with the errors
      });
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div>
        <label>Title</label>
        <InputField
          className="form-control"
          {...register("title", { required: true })}
          hasError={errors.title}
          placeholder="Title"
        />
        {errors.title && errors.title.type === "required" && (
          <InputFieldError>This field is required</InputFieldError>
        )}
      </div>
      <div>
        <label>Amount</label>
        <InputField
          className="form-control"
          {...register("amount", { required: true })}
          hasError={errors.title}
          type="number"
          placeholder="Amount"
        />
        {errors.amount && errors.amount.type === "required" && (
          <InputFieldError>This field is required</InputFieldError>
        )}
      </div>
      <div style={{ textAlign: "center" }}>
        <StyledBtn type="submit" disabled={isSubmitting}>
          Create Expense
        </StyledBtn>
      </div>
    </form>
  );
};

export default OtherExpenseForm;
