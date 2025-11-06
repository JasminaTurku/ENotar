import styled from "styled-components";

const COLORS = {
  indigo: "#4f46e5",
  indigoDark: "#3730a3",
  indigoLightBg: "#eef2ff",
  gray50: "#f9fafb",
  gray100: "#f3f4f6",
  gray200: "#e5e7eb",
  gray300: "#d1d5db",
  gray500: "#6b7280",
  gray600: "#4b5563",
  gray700: "#374151",
  gray800: "#1f2937",
  white: "#ffffff",
  darkFooter: "#111827",
  green: "#10b981",
  orange: "#f59e0b",
};

const BREAKPOINTS = {
  md: "768px",
  lg: "1024px",
};

const Button = styled.button`
  padding: 10px 12px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  background: ${(p) => (p.primary ? COLORS.indigo : "transparent")};
  color: ${(p) => (p.primary ? "white" : COLORS.gray700)};
  border: ${(p) => (p.primary ? "none" : `1px solid ${COLORS.gray200}`)};

  &:hover {
    opacity: 0.95;
  }
`;

const A = styled.a`
  padding: 8px 12px;
  border-radius: 8px;
  background: ${COLORS.indigo};
  color: white;
  text-decoration: none;
`;

const AStyled = styled.a`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid ${COLORS.gray200};
  text-decoration: none;
  color: ${COLORS.gray700};
`;

export { BREAKPOINTS, COLORS, Button, A, AStyled };
