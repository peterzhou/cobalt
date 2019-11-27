import styled from "@emotion/styled";

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(97, 111, 196);
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: rgb(107, 121, 206);
  }
  transition: background-color 0.16s ease-in-out;
  border: 0px;
  padding: 8px 16px;
  color: rgb(187, 188, 190);
  font-size: 14px;
`;

export const Input = styled.input`
  -webkit-appearance: none;
  border: none;
  background-image: none;
  background-color: rgb(45, 47, 49);
  padding: 10px 12px;
  border-radius: 4px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.18);
  font-size: 14px;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: #a0a0a0;
  }
  color: rgb(244, 244, 246);
`;
