import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Home from "./Home/Home.jsx";
import AuthForm from "./auth/AuthForm";
import NotarProfile from "./Home/NotarProfile";
import GradjaninProfile from "./Home/GradjaninProfile";
import AdminPanel from "./Home/AdminPanel";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AuthWrapper />} />
          <Route path="/profil-notara" element={<NotarProfile />} />
          <Route path="/profil-gradjanina" element={<GradjaninProfile />} />
          <Route path="/admin" element={<AdminPanel />} />
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
