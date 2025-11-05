import React, { useState } from "react";
import { Button, COLORS } from "../Styled";
import styled from "styled-components";
import zakaziNotara from "../endpoints/ZakaziNotara.js";
import getUserByName from "../endpoints/getUserByName.js";
import SelectComponent from "./SelectComponentNotari/SelectComponentNotar.jsx";
import SelectComponentGradovi from "./SelectComponentGradovi/SelectComponentGradovi.jsx";

const SchedulingComponent = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    notarIme: "",
    gradjaninJmbg: "",
    vrstaOvere: "",
    datum: "",
    vreme: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id === "notar-ime"
        ? "notarIme"
        : id === "gradjanin-ime"
        ? "gradjaninIme"
        : id === "service"
        ? "vrstaOvere"
        : id]: value,
    }));
  };

  const handleZakazi = async (e) => {
    e.preventDefault();
    console.log("Form data:", formData);

    if (
      !formData.notarIme ||
      !formData.gradjaninJmbg ||
      !formData.vrstaOvere ||
      !formData.datum ||
      !formData.vreme
    ) {
      setError("Molimo popunite sva polja");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // First, get the gradjanin ID by JMBG
      const gradjaninResponse = await getUserByName(
        formData.gradjaninJmbg,
        "gradjanin"
      );

      if (!gradjaninResponse.ok) {
        throw new Error("Nije moguće pronaći građanina sa unesenim JMBG-om.");
      }

      const gradjaninData = await gradjaninResponse.json();
      const gradjaninId = gradjaninData.id;

      // Get notar by name
      const notarResponse = await getUserByName(formData.notarIme, "notar");

      if (!notarResponse.ok) {
        throw new Error(
          "Nije moguće pronaći notara sa unesenim imenom i prezimenom."
        );
      }

      const notarData = await notarResponse.json();
      const notarId = notarData.id;

      const termin = {
        gradjanin_id: gradjaninId,
        notar_id: notarId,
        vrsta_overe: formData.vrstaOvere,
        datum: formData.datum,
        vreme: formData.vreme,
        status: "zakazano",
      };

      const data = await zakaziNotara(termin);
      console.log("Termin zakazan:", data);
      onClose?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card>
      <CardTitle>Brzo zakažite termin</CardTitle>
      <CardSubtitle>Unesite osnovne podatke i odaberite notara.</CardSubtitle>
      <Form id="zakazi">
        <FormDiv>
          <Label htmlFor="gradovi">Grad</Label>
          <SelectComponentGradovi
            id="gradovi"
            value={formData.grad}
            onChange={handleInputChange}
          />
        </FormDiv>
        <FormDiv>
          <Label htmlFor="notar-ime">Izaberi notara </Label>
          <SelectComponent
            id="notar-ime"
            value={formData.notarIme}
            onChange={handleInputChange}
          />
        </FormDiv>

        <div>
          <Label htmlFor="gradjanin-jmbg">JMBG građana</Label>
          <Input
            id="gradjanin-jmbg"
            type="text"
            inputMode="numeric"
            placeholder="1223456789023"
            pattern="[0-9]{13}"
            maxLength={13}
            value={formData.gradjaninJmbg}
            onChange={(e) => {
              // Dozvoli samo cifre i ograniči dužinu
              const numericValue = e.target.value
                .replace(/\D/g, "")
                .slice(0, 13);
              setFormData((prev) => ({
                ...prev,
                gradjaninJmbg: numericValue,
              }));
            }}
          />
        </div>

        <div>
          <Label htmlFor="service">Vrsta overe</Label>
          <Select
            id="service"
            value={formData.vrstaOvere}
            onChange={handleInputChange}
          >
            <option value="">— Izaberite —</option>
            <option value="overa_potpisa">Overa potpisa</option>
            <option value="overa_punomocja">Overa punomoćja</option>
            <option value="overa_ugovora">Overa ugovora</option>
          </Select>
        </div>

        <Row>
          <Input
            type="date"
            id="datum"
            value={formData.datum}
            onChange={handleInputChange}
          />
          <Input
            type="time"
            id="vreme"
            value={formData.vreme}
            onChange={handleInputChange}
          />
        </Row>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <FormButtons>
          <Button
            primary
            type="submit"
            onClick={handleZakazi}
            disabled={loading}
          >
            {loading ? "Učitavanje..." : "Zakaži"}
          </Button>
          <Button type="button">Sačuvaj kao nacrt</Button>
          <Button type="button" onClick={onClose}>
            Otkaži
          </Button>
        </FormButtons>
      </Form>
    </Card>
  );
};

const FormDiv = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  gap: 6px;
`;

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

const ErrorMessage = styled.div`
  color: #dc2626;
  font-size: 14px;
  margin: 8px 0;
  text-align: center;
`;

export default SchedulingComponent;
