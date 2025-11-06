import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Home from "./Home/Home.jsx";
import AuthForm from "./auth/AuthForm";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AuthWrapper />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

// Wrapper komponenta koja rukuje sa navigacijom
function AuthWrapper() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
  };

  return <AuthForm onClose={handleClose} />;
}

export default App;
