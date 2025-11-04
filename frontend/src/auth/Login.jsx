import React from "react";
import styled from "styled-components";
import { COLORS } from "../Home/Styled";

const Login = () => {
  return (
    <LoginContainer>
      <LoginForm>
        <h2>Log in</h2>
        <InputGroup>
          <label>Email</label>
          <input type="email" placeholder="Unesite vaš email" />
        </InputGroup>
        <InputGroup>
          <label>Lozinka</label>
          <input type="password" placeholder="Unesite vašu lozinku" />
        </InputGroup>
        <ButtonContainer>
          <LoginButton>Prijavi se</LoginButton>
        </ButtonContainer>
      </LoginForm>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${COLORS.gray100};
`;

const LoginForm = styled.form`
  background: white;
  padding: 3rem 6rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;

  h2 {
    color: ${COLORS.indigo};
    margin-bottom: 1.5rem;
    text-align: center;
  }
`;

const InputGroup = styled.div`
  margin-bottom: 1rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: ${COLORS.gray700};
  }

  input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid ${COLORS.gray300};
    border-radius: 4px;
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: ${COLORS.indigo};
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
`;

const LoginButton = styled.button`
  padding: 0.75rem 2rem;
  background-color: ${COLORS.indigo};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${COLORS.indigoLight};
  }
`;

export default Login;
