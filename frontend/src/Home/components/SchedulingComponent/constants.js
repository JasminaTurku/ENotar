// Service types for notary appointments
export const SERVICE_TYPES = [
  { value: "", label: "— Izaberite —" },
  { value: "overa_potpisa", label: "Overa potpisa" },
  { value: "overa_punomocja", label: "Overa punomoćja" },
  { value: "overa_ugovora", label: "Overa ugovora" },
];

// JMBG validation constant
export const JMBG_LENGTH = 13;

// Field mapping for form inputs
export const FIELD_MAPPING = {
  "notar-ime": "notarIme",
  "gradjanin-ime": "gradjaninIme",
  service: "vrstaOvere",
};
