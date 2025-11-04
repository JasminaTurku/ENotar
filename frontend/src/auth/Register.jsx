import React, { useState } from "react";
import styled from "styled-components";
import { COLORS } from "../Home/Styled";

const Register = () => {
  const [userType, setUserType] = useState("gradjanin");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log("Selected user type:", userType);
  };

  return (
    <RegisterContainer>
      <RegisterForm onSubmit={handleSubmit}>
        <h2>Registracija</h2>
        <UserTypeGroup>
          <UserTypeButton
            type="button"
            active={userType === "gradjanin"}
            onClick={() => setUserType("gradjanin")}
          >
            Građanin
          </UserTypeButton>
          <UserTypeButton
            type="button"
            active={userType === "notar"}
            onClick={() => setUserType("notar")}
          >
            Notar
          </UserTypeButton>
        </UserTypeGroup>
        <InputGroup>
          <label>Ime</label>
          <input type="text" placeholder="Unesite vaše ime" />
        </InputGroup>
        <InputGroup>
          <label>Prezime</label>
          <input type="text" placeholder="Unesite vaše prezime" />
        </InputGroup>
        <InputGroup>
          <label>Email</label>
          <input type="email" placeholder="Unesite vaš email" />
        </InputGroup>
        <InputGroup>
          <label>Lozinka</label>
          <input type="password" placeholder="Unesite vašu lozinku" />
        </InputGroup>
        <ButtonContainer>
          <RegisterButton>Registruj se</RegisterButton>
        </ButtonContainer>
      </RegisterForm>
    </RegisterContainer>
  );
};

const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${COLORS.gray100};
`;

const RegisterForm = styled.form`
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

const UserTypeGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const UserTypeButton = styled.button`
  padding: 0.5rem 2rem;
  border: 2px solid ${COLORS.indigo};
  border-radius: 4px;
  background-color: ${(props) => (props.active ? COLORS.indigo : "white")};
  color: ${(props) => (props.active ? "white" : COLORS.indigo)};
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;

  &:hover {
    background-color: ${(props) =>
      props.active ? COLORS.indigoLight : COLORS.gray100};
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
    padding: 0.5rem;
    border: 1px solid ${COLORS.gray300};
    border-radius: 4px;
    font-size: 0.9rem;

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

const RegisterButton = styled.button`
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

export default Register;
