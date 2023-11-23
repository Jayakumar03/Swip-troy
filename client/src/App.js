import "./App.css";
import Home from "./Components/Home";

import Bookmarkpage from "./Components/Bookmarkpage";

// import EditStories from "./Components/storiesmodal/EditStoriesModal";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/bookmark" element={<Bookmarkpage />} />

      {/* <Route path="/" element={<EditStories />} /> */}
    </Routes>
  );
};

export default App;
