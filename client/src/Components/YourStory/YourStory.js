import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import filters from "../Filters/filters.module.css";
import EditStories from "../storiesmodal/EditStoriesModal";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const YourStroy = ({ userId, isLoggedIn }) => {
  const navigate = useNavigate();
  const initialVisibleIndiaImages = 4;
  const [stories, setStories] = useState();
  const [visibleIndiaImages, setVisibleIndiaImages] = useState(
    initialVisibleIndiaImages
  );
  const [openEditStoriesModal, setOpenEditStoriesModal] = useState(false);
  const [storyId, setStoryId] = useState(null);

  const backendUrl = `${process.env.REACT_APP_BACKEND_URL}stories/userstories/${userId}`;
  useEffect(() => {
    const fetch = () => {
      const result = axios.get(backendUrl);

      result
        .then((res) => {
          const data = res.data;
          setStories(data.userStories);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    if (isLoggedIn) fetch();
  }, [isLoggedIn]);

  const handleSeeMoreIndiaClick = () => {
    setVisibleIndiaImages(visibleIndiaImages + 4);
  };

  const HandleEditModal = (e) => {
    e.stopPropagation();
    setOpenEditStoriesModal(true);
    setStoryId(e.target.getAttribute("id"));
  };

  const individualStoryPage = (e) => {
    const storyId = e.target.getAttribute("id");
    console.log(e.target.getAttribute("id"));
    navigate(`/individualstory/${storyId}`);
  };

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
                  id={story._id}
                  key={story._id}
                  onClick={individualStoryPage}
                >
                  <div
                    className={filters.wrappered}
                    id={story._id}
                    onClick={individualStoryPage}
                  >
                    <h3 className={filters.heading}>
                      {story.slides && story.slides[0].heading}
                    </h3>
                    <p className={filters.decsription}>
                      {story.slides && story.slides[0].description}
                    </p>
                  </div>

                  <button
                    className={filters.editBtn}
                    onClick={HandleEditModal}
                    id={story._id}
                  >
                    Edit <i class="fa-solid fa-pen"></i>
                  </button>
                </div>
              );
            })}
          {openEditStoriesModal ? (
            <EditStories
              setOpenEditStoriesModal={setOpenEditStoriesModal}
              storyId={storyId}
              openEditStoriesModal={openEditStoriesModal}
            />
          ) : null}
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
