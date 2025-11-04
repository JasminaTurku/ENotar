import { Button, COLORS } from "../Styled";
import styled from "styled-components";
import { links } from "../constants";
import { useNavigate } from "react-router-dom";

export const NavComponent = ({ onLinkClick, mobile = false }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <NavStyled mobile={mobile}>
      {links.map((l) => (
        <a
          key={l.href + l.label}
          href={l.href}
          className={l.cta ? "cta" : ""}
          onClick={onLinkClick}
        >
          {l.label}
        </a>
      ))}
      <Button onClick={handleLogin}>Prijavi se</Button>
    </NavStyled>
  );
};

const NavStyled = styled.nav`
  display: ${(props) => (props.mobile ? "flex" : "none")};
  gap: 1.5rem;
  align-items: center;
  font-size: 0.875rem;
  flex-direction: ${(props) => (props.mobile ? "column" : "row")};

  @media (min-width: 768px) {
    display: flex;
    align-items: center;
  }

  a {
    color: ${COLORS.gray700};
    text-decoration: none;
    transition: color 0.15s;
  }

  a:hover {
    color: ${COLORS.indigo};
  }
  a.cta {
    padding: 0.5rem 1rem;
    border: 1px solid ${COLORS.indigo};
    color: ${COLORS.indigo};
    border-radius: 6px;
  }
`;
export default NavComponent;
