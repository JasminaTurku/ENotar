import React, { useState } from "react";
import styled from "styled-components";
import { COLORS } from "../Home/Styled";

const Register = () => {
  const [userType, setUserType] = useState("gradjanin");
  const [formData, setFormData] = useState({
    ime: "",
    email: "",
    lozinka: "",
    telefon: "",
    grad: "",
  });
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [existingNotar, setExistingNotar] = useState(null);
  const [kod, setKod] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Proveri da li email već postoji kada korisnik klikne na email polje
  const handleEmailCheck = async (email) => {
    if (!email || userType !== "notar") return;

    setCheckingEmail(true);
    setError("");

    try {
      const response = await fetch(
        `http://localhost:5000/api/notari/proveri-status/${encodeURIComponent(
          email
        )}`
      );
      const data = await response.json();

      if (data.exists) {
        console.log("📧 Email postoji:", data);
        console.log("📊 Status:", data.status);
        console.log("✅ Aktiviran:", data.aktiviran);

        // NE prikazuj grešku odmah, samo postavi existingNotar
        // Forma će sama promeniti prikaz na osnovu ovog stanja
        setExistingNotar(data);

        // Prikaži poruku samo ako je status drugačiji od code_sent
        if (data.status === "activated" || data.aktiviran) {
          setError(
            "Ovaj nalog je već aktiviran. Možete se prijaviti direktno."
          );
        } else if (data.status === "pending") {
          setError(
            "Registracija je već poslata. Čekate da administrator pošalje aktivacioni kod."
          );
        } else if (data.status === "rejected") {
          setError(
            "Vaša registracija je odbijena. Kontaktirajte administratora."
          );
        } else if (data.status === "code_sent") {
          console.log("✅ Kod je poslat! Menjam formu...");
          // Forma će se automatski promeniti jer je existingNotar set
        }
        // Ako je code_sent, forma će se sama promeniti
      } else {
        console.log("❌ Email ne postoji u bazi");
        setExistingNotar(null);
        setError("");
      }
    } catch (err) {
      console.error("Greška pri proveri email-a:", err);
    } finally {
      setCheckingEmail(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Proveri email kada korisnik prekine kucanje
    if (name === "email" && value.includes("@")) {
      clearTimeout(window.emailCheckTimeout);
      window.emailCheckTimeout = setTimeout(() => {
        handleEmailCheck(value);
      }, 500); // Smanjen timeout na 500ms za brži odgovor
    }
  };

  const handleActivation = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!kod) {
      setError("Molimo unesite aktivacioni kod");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/notari/aktiviraj",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            notarId: existingNotar.id,
            kod: kod.trim(),
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess("✅ Nalog uspešno aktiviran! Možete se prijaviti.");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        setError(data.error || "Neispravan kod");
      }
    } catch (err) {
      console.error("Greška pri aktivaciji:", err);
      setError("Greška pri aktivaciji. Pokušajte ponovo.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // PRVO proveri da li email već postoji (za notare)
    if (userType === "notar" && formData.email) {
      await handleEmailCheck(formData.email);

      // Pauziraj malo da se state ažurira
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    // NOVO: Ako notar već postoji, ne dozvoli registraciju
    if (existingNotar) {
      setError(
        "Ovaj email već postoji u sistemu. Molimo koristite drugu email adresu ili aktivirajte postojeći nalog."
      );
      return;
    }

    // Validacija
    if (!formData.ime || !formData.email || !formData.lozinka) {
      setError("Sva polja su obavezna");
      return;
    }

    if (userType === "notar" && (!formData.telefon || !formData.grad)) {
      setError("Telefon i grad su obavezni za notare");
      return;
    }

    try {
      const endpoint =
        userType === "notar"
          ? "http://localhost:5000/api/notari"
          : "http://localhost:5000/api/gradjani";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        if (userType === "notar") {
          setSuccess(
            "✅ Registracija uspešna! Administrator će poslati aktivacioni kod na vaš email."
          );
        } else {
          setSuccess("✅ Registracija uspešna! Možete se prijaviti.");
          setTimeout(() => {
            window.location.href = "/login";
          }, 2000);
        }
      } else {
        setError(data.error || "Greška pri registraciji");
      }
    } catch (err) {
      console.error("Greška pri registraciji:", err);
      setError("Greška pri registraciji. Pokušajte ponovo.");
    }
  };

  // Ako notar već postoji sa kodom, prikaži formu za unos koda
  console.log("🔍 Provera da li treba prikazati formu za aktivaciju:");
  console.log("  - existingNotar:", existingNotar);
  console.log("  - existingNotar?.status:", existingNotar?.status);
  console.log("  - existingNotar?.aktiviran:", existingNotar?.aktiviran);

  if (
    existingNotar &&
    existingNotar.status === "code_sent" &&
    !existingNotar.aktiviran
  ) {
    console.log("✅ PRIKAZUJEM FORMU ZA AKTIVACIJU!");
    return (
      <RegisterContainer>
        <RegisterForm onSubmit={handleActivation}>
          <h2>🔐 Aktivacija Naloga</h2>
          <InfoBox>
            <p>
              <strong>Email:</strong> {existingNotar.email}
            </p>
            <p>
              <strong>Ime:</strong> {existingNotar.ime}
            </p>
            <p>
              Administrator je poslao aktivacioni kod na vaš email:{" "}
              <strong>{existingNotar.email}</strong>
            </p>
            <p style={{ fontSize: "0.9rem", color: COLORS.gray600 }}>
              Proverite inbox i spam folder.
            </p>
          </InfoBox>

          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}

          <InputGroup>
            <label>Aktivacioni Kod</label>
            <input
              type="text"
              placeholder="Unesite kod (npr. NOT-XXXX)"
              value={kod}
              onChange={(e) => setKod(e.target.value.toUpperCase())}
            />
          </InputGroup>

          <ButtonContainer>
            <RegisterButton type="submit">Aktiviraj Nalog</RegisterButton>
          </ButtonContainer>

          <BackLink onClick={() => setExistingNotar(null)}>
            ← Nazad na registraciju
          </BackLink>
        </RegisterForm>
      </RegisterContainer>
    );
  }

  return (
    <RegisterContainer>
      <RegisterForm onSubmit={handleSubmit}>
        <h2>Registracija</h2>
        <UserTypeGroup>
          <UserTypeButton
            type="button"
            active={userType === "gradjanin"}
            onClick={() => setUserType("gradjanin")}
          >
            Građanin
          </UserTypeButton>
          <UserTypeButton
            type="button"
            active={userType === "notar"}
            onClick={() => setUserType("notar")}
          >
            Notar
          </UserTypeButton>
        </UserTypeGroup>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}

        <InputGroup>
          <label>Ime</label>
          <input
            type="text"
            name="ime"
            placeholder="Unesite vaše ime"
            value={formData.ime}
            onChange={handleInputChange}
          />
        </InputGroup>

        <InputGroup>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Unesite vaš email"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={(e) => handleEmailCheck(e.target.value)}
          />
          {checkingEmail && <SmallText>Proveravam email...</SmallText>}
        </InputGroup>

        <InputGroup>
          <label>Lozinka</label>
          <input
            type="password"
            name="lozinka"
            placeholder="Unesite vašu lozinku"
            value={formData.lozinka}
            onChange={handleInputChange}
          />
        </InputGroup>

        {userType === "notar" && (
          <>
            <InputGroup>
              <label>Telefon</label>
              <input
                type="tel"
                name="telefon"
                placeholder="Unesite broj telefona"
                value={formData.telefon}
                onChange={handleInputChange}
              />
            </InputGroup>
            <InputGroup>
              <label>Grad</label>
              <input
                type="text"
                name="grad"
                placeholder="Unesite grad"
                value={formData.grad}
                onChange={handleInputChange}
              />
            </InputGroup>
          </>
        )}

        <ButtonContainer>
          <RegisterButton type="submit">Registruj se</RegisterButton>
        </ButtonContainer>
      </RegisterForm>
    </RegisterContainer>
  );
};

const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${COLORS.gray100};
`;

const RegisterForm = styled.form`
  background: white;
  padding: 3rem 6rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;

  h2 {
    color: ${COLORS.indigo};
    margin-bottom: 1.5rem;
    text-align: center;
  }
`;

const UserTypeGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const UserTypeButton = styled.button`
  padding: 0.5rem 2rem;
  border: 2px solid ${COLORS.indigo};
  border-radius: 4px;
  background-color: ${(props) => (props.active ? COLORS.indigo : "white")};
  color: ${(props) => (props.active ? "white" : COLORS.indigo)};
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;

  &:hover {
    background-color: ${(props) =>
      props.active ? COLORS.indigoLight : COLORS.gray100};
  }
`;

const InputGroup = styled.div`
  margin-bottom: 1rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: ${COLORS.gray700};
  }

  input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid ${COLORS.gray300};
    border-radius: 4px;
    font-size: 0.9rem;

    &:focus {
      outline: none;
      border-color: ${COLORS.indigo};
    }
  }
`;

const InfoBox = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;

  p {
    margin: 0.5rem 0;
  }
`;

const ErrorMessage = styled.div`
  background-color: #fee;
  color: #c33;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  border-left: 4px solid #c33;
`;

const SuccessMessage = styled.div`
  background-color: #efe;
  color: #2a2;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  border-left: 4px solid #2a2;
`;

const SmallText = styled.p`
  font-size: 0.8rem;
  color: ${COLORS.gray600};
  margin-top: 0.3rem;
`;

const BackLink = styled.a`
  display: block;
  text-align: center;
  margin-top: 1rem;
  color: ${COLORS.indigo};
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    text-decoration: underline;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
`;

const RegisterButton = styled.button`
  padding: 0.75rem 2rem;
  background-color: ${COLORS.indigo};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${COLORS.indigoLight};
  }
`;

export default Register;
