import getUserByName from "../../endpoints/getUserByName.js";
import { JMBG_LENGTH } from "./constants.js";

/**
 * Validates form data for scheduling an appointment
 * @param {Object} formData - The form data to validate
 * @returns {Object} - { isValid: boolean, error: string|null }
 */
export const validateFormData = (formData) => {
  const { notarIme, gradjaninJmbg, vrstaOvere, datum, vreme } = formData;

  if (!notarIme || !gradjaninJmbg || !vrstaOvere || !datum || !vreme) {
    return { isValid: false, error: "Molimo popunite sva polja" };
  }

  if (gradjaninJmbg.length !== JMBG_LENGTH) {
    return { isValid: false, error: "JMBG mora imati tačno 13 cifara" };
  }

  return { isValid: true, error: null };
};

/**
 * Formats numeric input by removing non-digit characters and limiting length
 * @param {string} value - The input value to format
 * @param {number} maxLength - Maximum allowed length
 * @returns {string} - Formatted numeric string
 */
export const formatNumericInput = (value, maxLength) => {
  return value.replace(/\D/g, "").slice(0, maxLength);
};

/**
 * Fetches user data by identifier (JMBG for citizen, name for notary)
 * @param {string} identifier - The identifier to search for
 * @param {string} userType - Type of user ('gradjanin' or 'notar')
 * @returns {Promise<number>} - User ID
 * @throws {Error} - If user is not found
 */
export const fetchUserData = async (identifier, userType) => {
  const response = await getUserByName(identifier, userType);

  if (!response.ok) {
    const userTypeText = userType === "gradjanin" ? "građanina" : "notara";
    throw new Error(
      `Nije moguće pronaći ${userTypeText} sa unesenim podacima.`
    );
  }

  const data = await response.json();
  return data.id;
};
