import "./App.css";
import { Route, Routes } from "react-router";
import { RequireAuth } from "./routes/RequireAuth";
import LoginPage from "./pages/auth/LoginPage";
import RegistrationPage from "./pages/auth/RegistrationPage";
import ProfileMe from "./pages/profile/ProfileMe";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/signup" element={<RegistrationPage />} />
        <Route
          exact
          path="/user"
          element={
            <RequireAuth>
              <ProfileMe />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
