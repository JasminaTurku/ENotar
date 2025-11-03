import { NavStyled } from "../Styled";

export const NavComponet = ({ onLinkClick, mobile = false, links }) => (
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
  </NavStyled>
);

export default NavComponet;
