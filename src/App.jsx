import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from "../src/components/Layout";
import Home from "../src/pages/Homepage";
import Admin from "../src/pages/Admin";
import Liked from "../src/pages/Likedpage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="admin" element={<Admin />} />
          <Route path="liked" element={<Liked />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
