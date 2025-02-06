import { Route, Routes } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import Login from "../Pages/LoginPage/Login";
import Profile from "../Components/Profile";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Suggestions from "../Pages/Suggestions/Suggestions";

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/suggestions" element={<Suggestions />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default MainRoutes;
