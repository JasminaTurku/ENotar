import styled from "styled-components";
import { COLORS } from "../../Styled";

export const Card = styled.div`
  background: ${COLORS.white};
  border-radius: 12px;
  padding: 18px;
  box-shadow: 0 8px 20px rgba(16, 24, 40, 0.06);
  width: 50%;
`;

export const CardTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
`;

export const CardSubtitle = styled.p`
  margin: 6px 0 0;
  color: ${COLORS.gray600};
  font-size: 13px;
`;

export const Form = styled.form`
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const FormDiv = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  gap: 6px;
`;

export const Label = styled.label`
  font-size: 12px;
  color: ${COLORS.gray600};
`;

export const Input = styled.input`
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

export const Select = styled.select`
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid ${COLORS.gray200};
  font-size: 14px;

  &:focus {
    box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.06);
    border-color: ${COLORS.indigo};
  }
`;

export const Row = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  & > * {
    flex: 1;
  }
`;

export const FormButtons = styled.div`
  display: flex;
  gap: 8px;
`;

export const ErrorMessage = styled.div`
  color: #dc2626;
  font-size: 14px;
  margin: 8px 0;
  text-align: center;
`;
