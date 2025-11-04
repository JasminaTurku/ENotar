import React from "react";
import { COLORS, A, BREAKPOINTS } from "../Styled";
import styled from "styled-components";

const ContactComponent = () => {
  return (
    <ContactSection id="kontakt">
      <ContactGrid>
        <FormStyled>
          <div style={{ display: "grid", gap: 10 }}>
            <Input placeholder="Ime i prezime" />
            <Input placeholder="E-mail" />
            <TextArea placeholder="Poruka" />
            <DivWrapperA>
              <A>Pošalji</A>
            </DivWrapperA>
          </div>
        </FormStyled>

        <div style={{ padding: 18 }}>
          <div style={{ color: COLORS.gray600 }}>
            Adresa: Trg primer 1, Grad
          </div>
          <DivStyled>Email: podrška@e-notar.rs</DivStyled>
          <DivStyled>Tel: +381 11 123 456</DivStyled>

          <div style={{ marginTop: 16 }}>
            <H4>Radno vreme</H4>
            <DivStyled>Pon–Pet: 08:00–16:00</DivStyled>
          </div>
        </div>
      </ContactGrid>
    </ContactSection>
  );
};

const ContactSection = styled.section`
  padding: 28px 24px;
`;

const ContactGrid = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  gap: 20px;

  @media (min-width: ${BREAKPOINTS.md}) {
    grid-template-columns: 1fr 360px;
  }
`;

const FormStyled = styled.form`
  background: ${COLORS.white};
  padding: 18px;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(16, 24, 40, 0.04);
`;

const TextArea = styled.textarea`
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid ${COLORS.gray200};
  min-height: 120px;
`;

const Input = styled.input`
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid ${COLORS.gray200};
  outline: none;
  font-size: 14px;

  &:focus {
    box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.06);
    border-color: ${COLORS.indigo};
  }
`;
const H4 = styled.h4`
  margin: 0;
  font-weight: 700;
`;

const DivStyled = styled.div`
  color: ${COLORS.gray600};
  margin-top: 8px;
`;

const DivWrapperA = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default ContactComponent;
