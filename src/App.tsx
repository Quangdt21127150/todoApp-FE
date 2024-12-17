import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TaskPage from "./pages/TaskPage";

const App = () => {
  const isAuthenticated = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <TaskPage /> : <LoginPage />}
        />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/tasks"
          element={isAuthenticated ? <TaskPage /> : <LoginPage />}
        />

        <Route
          path=""
          element={isAuthenticated ? <TaskPage /> : <LoginPage />}
        />
      </Routes>
    </Router>
  );
};

export default App;
