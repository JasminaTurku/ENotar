import React from "react";
import {
  ContactGrid,
  ContactSection,
  Input,
  COLORS,
  FormStyled,
  ContactButton,
  A,
  TextArea,
} from "../Styled";

const ContactComponent = () => {
  return (
    <ContactSection id="kontakt">
      <ContactGrid>
        <FormStyled>
          <div style={{ display: "grid", gap: 10 }}>
            <Input placeholder="Ime i prezime" />
            <Input placeholder="E-mail" />
            <TextArea placeholder="Poruka" />
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <A>Pošalji</A>
            </div>
          </div>
        </FormStyled>

        <div style={{ padding: 18 }}>
          <div style={{ color: COLORS.gray600 }}>
            Adresa: Trg primer 1, Grad
          </div>
          <div style={{ color: COLORS.gray600, marginTop: 8 }}>
            Email: podrška@e-notar.rs
          </div>
          <div style={{ color: COLORS.gray600, marginTop: 8 }}>
            Tel: +381 11 123 456
          </div>

          <div style={{ marginTop: 16 }}>
            <h4 style={{ margin: 0, fontWeight: 700 }}>Radno vreme</h4>
            <div style={{ color: COLORS.gray600, marginTop: 6 }}>
              Pon–Pet: 08:00–16:00
            </div>
          </div>
        </div>
      </ContactGrid>
    </ContactSection>
  );
};

export default ContactComponent;
