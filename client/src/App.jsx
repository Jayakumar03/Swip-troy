
import Home from "./Components/Home";

import Bookmarkpage from "./Components/Bookmarkpage"
import { Routes, Route, } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/bookmark" element={<Bookmarkpage />} />
    </Routes>
  );
};

export default App;
