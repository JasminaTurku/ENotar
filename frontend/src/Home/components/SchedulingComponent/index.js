import React, { useState } from "react";
import { Button } from "../../Styled";
import zakaziNotara from "../../endpoints/ZakaziNotara.js";
import SelectComponent from "../SelectComponentNotari/SelectComponentNotar.jsx";
import SelectComponentGradovi from "../SelectComponentGradovi/SelectComponentGradovi.jsx";
import { SERVICE_TYPES, JMBG_LENGTH, FIELD_MAPPING } from "./constants.js";
import {
  validateFormData,
  formatNumericInput,
  fetchUserData,
} from "./utils.js";
import {
  Card,
  CardTitle,
  CardSubtitle,
  Form,
  FormDiv,
  Label,
  Input,
  Select,
  Row,
  FormButtons,
  ErrorMessage,
} from "./Styled.js";

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
    const fieldName = FIELD_MAPPING[id] || id;

    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleJmbgChange = (e) => {
    const numericValue = formatNumericInput(e.target.value, JMBG_LENGTH);
    setFormData((prev) => ({
      ...prev,
      gradjaninJmbg: numericValue,
    }));
  };

  const handleZakazi = async (e) => {
    e.preventDefault();

    // Validate form data
    const validation = validateFormData(formData);
    if (!validation.isValid) {
      setError(validation.error);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch user IDs in parallel for better performance
      const [gradjaninId, notarId] = await Promise.all([
        fetchUserData(formData.gradjaninJmbg, "gradjanin"),
        fetchUserData(formData.notarIme, "notar"),
      ]);

      // Create appointment object
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
            maxLength={JMBG_LENGTH}
            value={formData.gradjaninJmbg}
            onChange={handleJmbgChange}
          />
        </div>

        <div>
          <Label htmlFor="service">Vrsta overe</Label>
          <Select
            id="service"
            value={formData.vrstaOvere}
            onChange={handleInputChange}
          >
            {SERVICE_TYPES.map((service) => (
              <option key={service.value} value={service.value}>
                {service.label}
              </option>
            ))}
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

export default SchedulingComponent;
