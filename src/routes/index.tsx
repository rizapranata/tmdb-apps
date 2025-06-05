import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import DetailMovie from "../pages/DetailMovie";
import Search from "../pages/Search";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/search" element={<Search />} />
      <Route path="/movie/:id" element={<DetailMovie />} />
      <Route path="/" element={<Home />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
