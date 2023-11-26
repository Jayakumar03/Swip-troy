import styles from "./bookmarkpage.module.css";
import Bookmarkicon from "../Image/bookmark-icon.png";
import Profilepic from "../Image/profilepic.svg";
import Hamburgericon from "../Image/Ham.svg";

import React, { useEffect, useState } from "react";
import filters from "./Filters/filters.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useNavigate } from "react-router-dom";
const Bookmarkpage = () => {
  const navigate = useNavigate();
  const initialVisibleIndiaImages = 4;
  const [stories, setStories] = useState();
  const [visibleIndiaImages, setVisibleIndiaImages] = useState(
    initialVisibleIndiaImages
  );

  const { id } = useParams();
  const userId = id;
  console.log(id);

  const backendUrl = `${process.env.REACT_APP_BACKEND_URL}stories/bookmarkedStories/${userId}`;
  console.log(backendUrl);

  useEffect(() => {
    const result = axios.get(backendUrl);

    result
      .then((res) => {
        const data = res.data;
        console.log(data);
        setStories(data.bookmarkedStories);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSeeMoreIndiaClick = () => {
    setVisibleIndiaImages(visibleIndiaImages + 4);
  };

  return (
    <div className={styles.bookmarkHeader}>
      <h3 className={styles.bookmarkSwip}>SwipTory</h3>
      <button className={styles.bookmarkBtn}>
        <img className={styles.bookMarkIcon} src={Bookmarkicon} alt="" />{" "}
        Bookmark
      </button>
      <button className={styles.addStoryBtn}>Add story</button>
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

      <>
        <h1 className={filters.yourStoryHeading}>Your Bookmarks</h1>
        {stories && stories.length === 0 ? (
          <h1>No stories are available</h1>
        ) : (
          <>
            {stories &&
              stories.length > 0 &&
              stories.slice(0, visibleIndiaImages).map((story) => {
                return (
                  <div
                    className={`${filters.storycontainer} ${filters.background} ${filters.container}`}
                    style={{
                      backgroundImage: `url(${
                        story.slides &&
                        story.slides[0] &&
                        story.slides[0].image &&
                        story.slides[0].image.url
                      })`,
                    }}
                  >
                    <div className={filters.wrappered}>
                      <h3 className={filters.heading}>
                        {story.slides &&
                          story.slides[0] &&
                          story.slides[0].heading}
                      </h3>
                      <p className={filters.decsription}>
                        {story.slides &&
                          story.slides[0] &&
                          story.slides[0].description}
                      </p>
                    </div>
                  </div>
                );
              })}

            {stories && stories.length > visibleIndiaImages && (
              <button
                className={filters.seeMoreBtn}
                onClick={handleSeeMoreIndiaClick}
              >
                See more
              </button>
            )}
          </>
        )}
      </>
    </div>
  );
};

export default Bookmarkpage;
