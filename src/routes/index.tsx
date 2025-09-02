import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import DetailMovie from "../pages/DetailMovie";
import Search from "../pages/Search";
import Categories from "../pages/Categories";
import LoginForm from "../pages/Login";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/categories" element={<Categories />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/search" element={<Search />} />
      <Route path="/movie/:id" element={<DetailMovie />} />
      <Route path="/" element={<Home />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
