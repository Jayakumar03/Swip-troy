import "./App.css";
import Home from "./Components/Home";
import Bookmarkpage from "./Components/Bookmarkpage";

import IndividualStory from "./Components/individualstories/IndividualStory";
import { Routes, Route } from "react-router-dom";

// copoments to check code rabbit ai
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/bookmark/:id" element={<Bookmarkpage />} />
      <Route path="/individualstory/:id" element={<IndividualStory />} />
    </Routes>
  );
};

export default App;
