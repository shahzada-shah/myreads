import { BrowserRouter, Routes, Route } from "react-router-dom";

import Search from "./pages/Search";
import Library from "./pages/Library";
// import Home from "./pages/Home";

export default function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Library />} />
        <Route path="/search" element={<Search />} />
        <Route path="/library" element={<Library />} />
        <Route path="*" element={<Library />} />
      </Routes>
    </BrowserRouter>
  );
}
