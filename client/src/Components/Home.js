import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddStories from "./storiesmodal/AddStoriesModal";
import EditStories from "./storiesmodal/AddStoriesModal";
import IndividualStory from "./individualstories/IndividualStory";

import "./home.css";
import axios from "axios";
import styles from "./bookmarkpage.module.css";
import Bookmarkicon from "../Image/bookmark-icon.png";
import Profilepic from "../Image/profilepic.svg";
import Hamburgericon from "../Image/Ham.svg";
import filterimg1 from "../Image/fillimg1.png";
import filterimg2 from "../Image/fillimg2.jpg";
import filterimg3 from "../Image/fillimg3.jpg";
import filterimg4 from "../Image/fillimg4.png";
import Register from "./Register";
import SignIn from "./Signin";

const Home = ({ storyId }) => {
  const navigate = useNavigate();
  const backendUrl = `${process.env.REACT_APP_BACKEND_URL}stories/getallstories`;

  const [registerComponent, setregisterComponent] = useState(false);
  const [signinComponent, setsigninComponent] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState();
  const [stories, setStories] = useState([]);
  const [openAddStoriesModal, setOpenAddStoriesModal] = useState(false);
  const [openEditStoriesModal, setOpenEditStoriesModal] = useState(false);
  const [openIndividualStoryModal, setOpenIndividualStoryModal] = useState(false);

  useEffect(() => {
    const result = axios.get(backendUrl);

    result
      .then((res) => {
        const data = res.data;
        console.log(data.stories);
        setStories(data.stories);
      })
      .catch((error) => {
        console.log(error);
      });

    const tokenInLocalStorage = localStorage.getItem("token");
    if (tokenInLocalStorage) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleRegisterClick = () => {
    setregisterComponent(true);
  };

  const handleCloseRegister = () => {
    setregisterComponent(false);
  };

  const handleSigninClick = () => {
    setsigninComponent(true);
  };

  const handleCloseSignin = () => {
    setsigninComponent(false);
  };

  const handleChange = (event) => {
    event.preventDefault();
    navigate("/bookmark");
  };

  const openModalHandler = () => {
    setOpenAddStoriesModal(true);
  };

  return (
    <div className="header">
      <h3 className="app-name">SwipTory</h3>
      {openAddStoriesModal && (
        <AddStories
          setOpenAddStoriesModal={setOpenAddStoriesModal}
          userDetails={userDetails}
        />
      )}
      {/* <EditStories
        setOpenEditStoriesModal={setOpenEditStoriesModal}
        userDetails={userDetails}
        story={stories}
      /> */}

   {/* {openIndividualStoryModal && <IndividualStory setOpenIndividualStoryModal={setOpenIndividualStoryModal} setregisterComponent={setregisterComponent}  />} */}
      {isLoggedIn ? (
        <div>
          <button className={styles.bookmarkBtn}>
            <img
              className={styles.bookMarkIcon}
              src={Bookmarkicon}
              alt=""
              onClick={handleChange}
            />
          </button>
          <button onClick={openModalHandler} className={styles.addStoryBtn}>
            Add story
          </button>
          <img
            className={styles.bookmarkProfilePic}
            src={Profilepic}
            alt=""
            style={{ width: "40px", height: "40px" }}
          />
          <button className={styles.hamBtn}>
            <img
              src={Hamburgericon}
              alt=""
              style={{ width: "18px", height: "18px" }}
            />
          </button>
          <p className={styles.yrBookmark}>Your Bookmarks</p>
        </div>
      ) : (
        <div>
          <button className="register-btn" onClick={handleRegisterClick}>
            Register Now
          </button>
          {registerComponent && (
            <Register
              onClose={handleCloseRegister}
              setIsLoggedIn={setIsLoggedIn}
              setUserDetails={setUserDetails}
            />
          )}
          <button className="signin-btn" onClick={handleSigninClick}>
            Login
          </button>
          {signinComponent && (
            <SignIn
              onClose={handleCloseSignin}
              setIsLoggedIn={setIsLoggedIn}
              setUserDetails={setUserDetails}
            />
          )}
        </div>
      )}

      <div className="filter-container">
        <button className="fillter-button-container">
          <img src={filterimg1} alt="" className="filter-images" />
          <h3 className="filter-names">All</h3>
        </button>

        <button className="fillter-button-container">
          <img src={filterimg2} alt="" className="filter-images" />
          <h3 className="filter-names">Medical</h3>
        </button>

        <button className="fillter-button-container">
          <img src={filterimg3} alt="" className="filter-images" />
          <h3 className="filter-names">Fruits</h3>
        </button>

        <button className="fillter-button-container">
          <img src={filterimg4} alt="" className="filter-images" />
          <h3 className="filter-names">World</h3>
        </button>

        <button className="fillter-button-container">
          <img src={filterimg1} alt="" className="filter-images" />
          <h3 className="filter-names">India</h3>
        </button>
      </div>
    </div>
  );
};

export default Home;