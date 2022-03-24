import { useState, useEffect, createRef } from "react";
import styled from "styled-components";
import { ChevronUp, Chevrondown } from "icons";
import useOutsideClick from "utils/detectOutsideClickUtil";

const Wrapper = styled.div`
  height: 40px;
  background: transparent;
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;
  min-width: 150px;
`;

const StyledSelect = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: 10px;
  margin-right: 5px;
  position: relative;
`;

const OptionList = styled.div`
  margin-top: 1px;
  display: block;
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
`;

const Option = styled.div`
  cursor: pointer;
  border: 1px solid black;
  border-top: 0px;
  background-color: #f3f3f3;
  padding: 5px;
`;

const iconStyles = {
  height: 15,
  width: 15,
  position: "absolute",
  right: 0,
};

const Select = (props) => {
  const [isListOpen, setIsListOpen] = useState(false);
  const [inputPlaceholder, setInputPlaceHolder] = useState("");
  const ref = createRef();

  const { options, onChange, placeholder, defaultVal } = props;

  useOutsideClick(ref, () => {
    setIsListOpen(false);
  });

  useEffect(() => {
    if (defaultVal?.placeholder) {
      setInputPlaceHolder(defaultVal.placeholder);
    }
  }, []);

  const changeHandler = (item) => {
    setIsListOpen(false);
    setInputPlaceHolder(item.placeholder);
    onChange(item);
  };

  const containerClickHandler = () => {
    setIsListOpen(!isListOpen);
  };

  return (
    <Wrapper ref={ref}>
      <StyledSelect onClick={containerClickHandler}>
        {placeholder + inputPlaceholder}{" "}
        {isListOpen ? (
          <ChevronUp style={iconStyles} />
        ) : (
          <Chevrondown style={iconStyles} />
        )}
      </StyledSelect>
      <OptionList isOpen={isListOpen}>
        {options &&
          options.map((item, i) => {
            return (
              <Option onClick={() => changeHandler(item)} key={i}>
                {item.placeholder}
              </Option>
            );
          })}
      </OptionList>
    </Wrapper>
  );
};

export default Select;
