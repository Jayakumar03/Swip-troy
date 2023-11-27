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
import Register from "./auth/Register";
import SignIn from "./auth/Signin";
import Logout from "./auth/Logout";
import Travel from "./Filters/Travel";
import Food from "./Filters/Food";
import Health from "./Filters/Health";
import Movies from "./Filters/Movies";
import Education from "./Filters/Education";
import TopTrendingStories from "./TopTrending/TopTrendingStories";

import YourStroy from "./YourStory/YourStory";

const Home = () => {
  const navigate = useNavigate();
  const backendUrl = `${process.env.REACT_APP_BACKEND_URL}stories/getallstories`;
  const [registerComponent, setregisterComponent] = useState(false);
  const [signinComponent, setsigninComponent] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState();
  const [userId, setUserId] = useState();
  const [stories, setStories] = useState([]);
  const [openAddStoriesModal, setOpenAddStoriesModal] = useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const [showFilter, setShowFilter] = useState({
    travel: false,
    food: false,
    health: false,
    movies: false,
    education: false,
  });

  useEffect(() => {
    const result = axios.get(
      "https://swip-troy-backend.vercel.app/stories/getallstories"
    );

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
    const userIdInLocalStorage = localStorage.getItem("userId");
    if (tokenInLocalStorage) {
      setIsLoggedIn(true);
    }
    if (userIdInLocalStorage) {
      setUserId(userIdInLocalStorage);
    }
  }, []);

  const handleFoodButtonClick = () => {
    setShowFilter((prevState) => ({
      ...prevState,
      food: prevState.food ? false : true,
    }));
  };

  const handleTravelButtonClick = () => {
    setShowFilter((prevState) => ({
      ...prevState,
      travel: prevState.travel ? false : true,
    }));
  };

  const handleHealthButtonClick = () => {
    setShowFilter((prevState) => ({
      ...prevState,
      health: prevState.health ? false : true,
    }));
  };

  const handleMoviesButtonClick = () => {
    setShowFilter((prevState) => ({
      ...prevState,
      movies: prevState.movies ? false : true,
    }));
  };

  const handleEducationButtonClick = () => {
    setShowFilter((prevState) => ({
      ...prevState,
      education: prevState.education ? false : true,
    }));
  };

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
    navigate(`/bookmark/${userId}`);
  };

  const openModalHandler = () => {
    setOpenAddStoriesModal(true);
  };

  const handleHamButtonClick = () => {
    setOpenLogoutModal(true);
  };

  return (
    <div className="header">
      <h3 className="app-name">SwipTory</h3>
      {openAddStoriesModal && (
        <AddStories
          setOpenAddStoriesModal={setOpenAddStoriesModal}
          userId={userId}
        />
      )}

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
          <button className={styles.hamBtn} onClick={handleHamButtonClick}>
            <img
              src={Hamburgericon}
              alt=""
              style={{ width: "18px", height: "18px" }}
            />
          </button>
          {openLogoutModal ? <Logout /> : null}
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
              parent="home"
            />
          )}
        </div>
      )}

      <div className="filter-container">
        <button
          className="fillter-button-container"
          onClick={handleFoodButtonClick}
        >
          <img src={filterimg1} alt="" className="filter-images" />
          <h3 className="filter-names">All</h3>
        </button>

        <button
          className="fillter-button-container"
          onClick={handleFoodButtonClick}
        >
          <img src={filterimg1} alt="" className="filter-images" />
          <h3 className="filter-names">Food</h3>
        </button>

        <button
          className="fillter-button-container"
          onClick={handleTravelButtonClick}
        >
          <img src={filterimg2} alt="" className="filter-images" />
          <h3 className="filter-names">Travel</h3>
        </button>

        <button
          className="fillter-button-container"
          onClick={handleHealthButtonClick}
        >
          <img src={filterimg3} alt="" className="filter-images" />
          <h3 className="filter-names">Health</h3>
        </button>

        <button
          className="fillter-button-container"
          onClick={handleMoviesButtonClick}
        >
          <img src={filterimg4} alt="" className="filter-images" />
          <h3 className="filter-names">Movies</h3>
        </button>

        <button
          className="fillter-button-container"
          onClick={handleEducationButtonClick}
        >
          <img src={filterimg1} alt="" className="filter-images" />
          <h3 className="filter-names">Education</h3>
        </button>
      </div>

      {/*  Comeback to resolve  */}

      {isLoggedIn ? (
        <YourStroy userId={userId} isLoggedIn={isLoggedIn} />
      ) : null}

      {/* filters */}
      {showFilter.travel && (
        <p className="filter-heading">Top Stories About travel</p>
      )}
      {showFilter.travel && <Travel />}

      {showFilter.food && (
        <p className="filter-heading">Top Stories About food</p>
      )}
      {showFilter.food && <Food />}

      {showFilter.health && (
        <p className="filter-heading">Top Stories About health</p>
      )}
      {showFilter.health && <Health />}

      {showFilter.movies && (
        <p className="filter-heading">Top Stories About movies</p>
      )}
      {showFilter.movies && <Movies />}

      {showFilter.education && (
        <p className="filter-heading">Top Stories About education</p>
      )}
      {showFilter.education && <Education />}

      <TopTrendingStories />
      <TopTrendingStories />
    </div>
  );
};

export default Home;
