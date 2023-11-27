import { useState, useEffect } from "react";
import SignIn from "../auth/Signin";
import styles from "./individualStory.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useNavigate } from "react-router-dom";

//! need state form home.js   storyId, isLoggedIn, setLoginComponent,setOpenIndividualStoryModal,
const IndividualStory = ({ handleSigninClick }) => {
  const [story, setStory] = useState();
  const [currentslide, setCurrentSlide] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginComponent, setLoginComponent] = useState(false);

  const { id } = useParams();
  const storyId = id;
  console.log(id);

  const navigate = useNavigate();

  const backendUrl = `https://swip-troy-backend.vercel.app/api/v1/stories/${storyId}`;
  const backendUrlEdit = `https://swip-troy-backend.vercel.app/api/v1/stories/editstory/${storyId}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(backendUrl);
        if (result.data.success) {
          setStory(result.data.story);
          console.log(story);
        } else {
          toast.error(result.data.message);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();

    const userId = localStorage.getItem("userId");
    if (userId) setIsLoggedIn(true);
  }, []);

  const previousSlide = () => {
    setCurrentSlide((currentslide) => {
      if (currentslide > 0) {
        return currentslide - 1;
      }
      console.log(currentslide);
      return currentslide;
    });
  };

  const nextSlide = () => {
    setCurrentSlide((currentslide) => {
      if (story && story.slides && currentslide < story.slides.length - 1) {
        return currentslide + 1;
      }
      console.log(currentslide);
      return currentslide;
    });
  };

  const handleBookmark = async () => {
    if (!isLoggedIn) {
      setLoginComponent(true);
      toast.error("Login Plese !!");
    } else {
      setStory(async (previousStory) => {
        const updatedStory = {
          ...previousStory,
          bookmark: story.bookmark ? false : true,
        };

        try {
          const result = await axios.put(backendUrlEdit, updatedStory);
          if (result.data.success) {
            console.log(updatedStory);
          }
        } catch (error) {
          toast.error("error");
        }

        return updatedStory;
      });
    }
  };

  const closeModal = () => {
    navigate("/");
  };

  const handleLike = async () => {
    if (!isLoggedIn) {
      toast.error("Login Plese !!");
    } else {
      setStory(async (previousStory) => {
        const updatedSlides = previousStory.slides.map((slide, index) => {
          if (index === currentslide) {
            return { ...slide, like: slide.like + 1 };
          } else {
            return slide;
          }
        });

        const updatedStory = { ...previousStory, slides: updatedSlides };
        try {
          const result = await axios.put(backendUrlEdit, updatedStory);
          if (result.data.success) {
            console.log(updatedStory);
          }
        } catch (error) {
          toast.error("error");
        }

        return updatedStory;
      });
    }
  };

  return (
    <div className={styles.background}>
      {story && story.slides && story.slides[currentslide] && (
        <div
          className={`${styles.container} ${styles.backgroundImage}`}
          style={{
            backgroundImage: `url(${story.slides[currentslide].image.url})`,
          }}
        >
          <div className={styles.slideContainer}>
            {story.slides.map((slide, index) =>
              index < currentslide ? (
                <span
                  key={index}
                  className={`${styles.slide} ${styles.dark}`}
                ></span>
              ) : (
                <span key={index} className={styles.slide}></span>
              )
            )}
          </div>

          <div className={styles.ButtonContainer}>
            <button className={styles.slideCloseBtn} onClick={closeModal}>
              <i class="fa-solid fa-x"></i>
            </button>

            <button
              className={styles.slideCloseBtn}
              onClick={() => {
                toast.success("🦄 Link Copied !", {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              }}
            >
              <i class="fa-regular fa-paper-plane"></i>
            </button>
          </div>

          <div>
            <button className={styles.leftSlide} onClick={previousSlide}>
              <i class="fa-solid fa-chevron-left"></i>
            </button>
            <button className={styles.rightSlide} onClick={nextSlide}>
              <i class="fa-solid fa-chevron-right"></i>
            </button>
          </div>

          {/* Heading and description */}
          <div className={styles.detailsContainer}>
            <h1 className={styles.align}>
              {story.slides[currentslide].heading}
            </h1>
            <p className={styles.descriptionAlign}>
              {story.slides[currentslide].description}
            </p>

            {/* Bookmark and heart button */}
            <div className={styles.ButtonContainerBookmark}>
              {story.bookmark ? (
                <button
                  className={`${styles.slideBookmarkBtn} ${styles.bookmarkedBtn}`}
                  onClick={handleBookmark}
                >
                  <i class="fa-solid fa-bookmark"></i>
                </button>
              ) : (
                <button
                  className={styles.slideBookmarkBtn}
                  onClick={handleBookmark}
                >
                  <i class="fa-solid fa-bookmark"></i>
                </button>
              )}

              <button className={styles.slideBookmarkBtn} onClick={handleLike}>
                <i class="fa-solid fa-heart"></i>
                <span className={styles.likeNumber}>
                  {story.slides[currentslide].like}
                </span>
              </button>
            </div>
          </div>
          {loginComponent && (
            <SignIn
              setLoginComponent={setLoginComponent}
              parent="individualStory"
            />
          )}
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default IndividualStory;
