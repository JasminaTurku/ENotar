import { Button, COLORS } from "../Styled";
import styled from "styled-components";
import { links } from "../constants";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const NavComponent = ({ onLinkClick, mobile = false }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    logout();
    alert("Uspešno ste se odjavili!");
  };

  const handleProfileClick = () => {
    if (user.type === "notar") {
      navigate("/profil-notara");
    } else {
      navigate("/profil-gradjanina");
    }
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

      {isAuthenticated ? (
        <UserSection>
          <UserButton onClick={handleProfileClick}>
            {user.type === "notar" ? "Notar" : "Građanin"}
          </UserButton>
          <Button onClick={handleLogout}>Odjavi se</Button>
        </UserSection>
      ) : (
        <Button onClick={handleLogin}>Prijavi se</Button>
      )}
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

const UserSection = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const UserButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${COLORS.indigo};
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.15s;

  &:hover {
    background-color: ${COLORS.indigoDark};
  }
`;

export default NavComponent;
