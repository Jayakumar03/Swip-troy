import "./App.css";
import Home from "./Components/Home";
import Bookmarkpage from "./Components/Bookmarkpage";

import Indi from "./Components/individualstories/IndividualStory";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/bookmark" element={<Bookmarkpage />} />
      <Route path="/" element={<Indi />} />
    </Routes>
  );
};

export default App;
