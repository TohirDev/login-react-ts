import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/login-page";
import RegisterPage from "./pages/auth/register-page";
import HomePage from "./pages/dashboard/home";

function App() {
  return (
    <Routes>
      <Route element={<HomePage />} path="/" />
      <Route element={<LoginPage />} path="/login" />
      <Route element={<RegisterPage />} path="/register" />
    </Routes>
  );
}

export default App;
