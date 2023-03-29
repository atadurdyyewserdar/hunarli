import "./App.css";
import { Route, Routes } from "react-router";
import { RequireAuth } from "./routes/RequireAuth";
import LoginPage from "./pages/auth/LoginPage";
import RegistrationPage from "./pages/auth/RegistrationPage";
import HomePage from "./pages/home/HomePage";
import SelectedJob from "./pages/job_post/SelectedJob";
import SearchPage from "./pages/search/SearchPage";
import NewJobPost from "./pages/job_post/NewJobPost";
import EditJob from "./pages/job_post/EditJob";
import ForgotPassword from "./pages/auth/ForgotPassword";
import { NewPasswordForm } from "./pages/auth/NewPasswordForm";
import MyProfile from "./pages/profile/MyProfile";
import EmailVerification from "./pages/auth/EmailVerification";

function App() {
  return (
    <div className="flex flex-col justify-between">
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/search" element={<SearchPage />} />
        <Route exact path="/jobs/:id" element={<SelectedJob />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/signup" element={<RegistrationPage />} />
        <Route exact path="/reset-password" element={<ForgotPassword />} />
        <Route
          exact
          path="/verify-email/confirm"
          element={<EmailVerification />}
        />
        <Route
          exact
          path="/reset-password/new/:token"
          element={<NewPasswordForm />}
        />
        <Route
          exact
          path="/editjob/:id"
          element={
            <RequireAuth>
              <EditJob />
            </RequireAuth>
          }
        />
        <Route
          exact
          path="/myprofile"
          element={
            <RequireAuth>
              <MyProfile />
            </RequireAuth>
          }
        />
        <Route
          exact
          path="/newjob"
          element={
            <RequireAuth>
              <NewJobPost />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
