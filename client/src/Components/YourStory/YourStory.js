import React, { useEffect, useState } from "react";
import filters from "../Filters/filters.module.css";
import EditStories from "../storiesmodal/EditStoriesModal" 
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const YourStroy = ({
  userId,
  setOpenEditStoriesModal,
  openEditStoriesModal,
}) => {
  const initialVisibleIndiaImages = 4;
  const [stories, setStories] = useState();
  const [visibleIndiaImages, setVisibleIndiaImages] = useState(
    initialVisibleIndiaImages
  );

  const backendUrl = `${process.env.REACT_APP_BACKEND_URL}stories/userstories/${userId}`;

//   const storyId = "655eda01351ed957ff2d3404";

  useEffect(() => {
    const result = axios.get(backendUrl);

    result
      .then((res) => {
        const data = res.data;
        setStories(data.userStories);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSeeMoreIndiaClick = () => {
    setVisibleIndiaImages(visibleIndiaImages + 4);
  };

  const HandleEditModal  = () => {
    setOpenEditStoriesModal(true)
  }

  return (
    <>
      <h1 className={filters.yourStoryHeading}>Your stories </h1>
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
                      {story.slides && story.slides[0].heading}
                    </h3>
                    <p className={filters.decsription}>
                      {story.slides && story.slides[0].description}
                    </p>
                  </div>

                  <button className={filters.editBtn} onClick={HandleEditModal}>
                    Edit <i class="fa-solid fa-pen"></i>
                    <EditStories setOpenEditStoriesModal={setOpenEditStoriesModal} storyId={story._id} openEditStoriesModal={openEditStoriesModal} />
                  </button>
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
  );
};

export default YourStroy;
