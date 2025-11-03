import React from "react";
import {
  Card,
  CardSubtitle,
  CardTitle,
  Form,
  FormButtons,
  Input,
  Label,
  Row,
  Select,
  Button,
} from "../Styled";

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

export default SchedulingComponent;
