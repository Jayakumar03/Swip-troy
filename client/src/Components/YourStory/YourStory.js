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
  // const [statestories, setStateStories] = useState([]);

  const backendUrl = `https://swip-troy-backend.vercel.app/api/v1/stories/userstories/${userId}`;
  // const stateBackendUrl = `https://swip-troy-backend.vercel.app/api/v1/stories/getallstories`;

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await axios.get(backendUrl);
        const data = result.data;
        if (data.success) {
          setStories(data.userStories);
        } else {
          toast.error("No more stories are avaible");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetch();
  }, [isLoggedIn, userId, stories]);

  // useEffect(() => {
  //   const fetchData = () => {
  //     try {
  //       const res = axios.get(stateBackendUrl);

  //       const data = res.data;
  //       setStateStories(data.stories);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchData();
  // }, [statestories]);

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
        <h1 className={filters.NoMoreStories}>
          No more stories are available for this filter
        </h1>
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </>
  );
};

export default YourStroy;
