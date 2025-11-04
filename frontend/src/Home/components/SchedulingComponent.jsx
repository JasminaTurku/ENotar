import React from "react";
import { Button, COLORS } from "../Styled";
import styled from "styled-components";

const SchedulingComponent = ({ onClose }) => {
  return (
    <Card>
      <CardTitle>Brzo zakažite termin</CardTitle>
      <CardSubtitle>Unesite osnovne podatke i odaberite notara.</CardSubtitle>

      <Form id="zakazi">
        <div>
          <Label htmlFor="fullname">Ime i prezime notara </Label>
          <Input id="fullname" placeholder="Marko Marković" />
        </div>

        <div>
          <Label htmlFor="service">Vrsta overe</Label>
          <Select id="service" defaultValue="">
            <option value="">— Izaberite —</option>
            <option>Overa potpisa</option>
            <option>Overa punomoćja</option>
            <option>Overa ugovora</option>
          </Select>
        </div>

        <Row>
          <Input type="date" />
          <Input type="time" />
        </Row>

        <FormButtons>
          <Button primary type="submit">
            Zakaži
          </Button>
          <Button type="button">Sačuvaj kao nacrt</Button>
          <Button type="otkazi" onClick={onClose}>
            Otkazi
          </Button>
        </FormButtons>
      </Form>
    </Card>
  );
};

const Card = styled.div`
  background: ${COLORS.white};
  border-radius: 12px;
  padding: 18px;
  box-shadow: 0 8px 20px rgba(16, 24, 40, 0.06);
`;
const CardTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
`;

const CardSubtitle = styled.p`
  margin: 6px 0 0;
  color: ${COLORS.gray600};
  font-size: 13px;
`;

const Form = styled.form`
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  font-size: 12px;
  color: ${COLORS.gray600};
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

const Select = styled.select`
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid ${COLORS.gray200};
  font-size: 14px;

  &:focus {
    box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.06);
    border-color: ${COLORS.indigo};
  }
`;

const Row = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  & > * {
    flex: 1;
  }
`;

const FormButtons = styled.div`
  display: flex;
  gap: 8px;
`;

export default SchedulingComponent;
