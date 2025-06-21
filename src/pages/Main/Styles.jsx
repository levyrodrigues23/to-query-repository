import styled, { keyframes, css } from "styled-components";

export const Container = styled.div`
  max-width: 700px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  padding: 30px;
  margin: 80px auto;

  div {
    display: flex;
    align-items: center;
    justify-content: center;

    h1 {
      font-size: 20px;
      display: flex;
      align-items: center;
      flex-direction: row;

      svg {
        margin-right: 10px;
      }
    }
  }
`;

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  position: relative;

  input {
    flex: 1;
    border: 1px solid ${(props) => (props.error ? "#ff0000" : "#ddd")};
    padding: 12px 15px;
    border-radius: 4px;
    font-size: 17px;
  }
`;

const animate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const SubmitButton = styled.button.attrs((props) => ({
  type: "submit",
  disabled: props.loading,
}))`
  background: #0d2636;
  border: 0;
  border-radius: 4px;
  margin-left: 10px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }

  ${(props) =>
    props.loading &&
    css`
      svg {
        animation: ${animate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 20px;

  li {
    padding: 15px 0px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    & + li {
      border-top: 1px solid #ddd;
    }

    span {
      display: flex;
      align-items: center;
    }

    a {
      color: #0d2636;
      text-decoration: none;
    }
  }
`;

export const DeleteButton = styled.button.attrs({
  type: "button",
})`
  background: transparent;
  color: #0d2636;
  border: 0;
  padding: 8px 7px;
  outline: 0;
  border-radius: 4px;
`;

export const Suggestions = styled.ul`
  position: absolute;
  left: 0;
  top: 60px;
  background: #fff;
  width: 100%;
  max-height: 220px;
  overflow-y: auto;
  border: 1px solid #ddd;
  border-radius: 0 0 4px 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  z-index: 10;
  list-style: none;
  padding: 0;

  li {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 15px;
    cursor: pointer;
    transition: background 0.2s;

    img {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: 1px solid #eee;
      object-fit: cover;
    }

    &:hover {
      background: #f5f5f5;
    }
  }
`;
