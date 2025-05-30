import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import DetailMovie from "../pages/DetailMovie";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<DetailMovie />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
