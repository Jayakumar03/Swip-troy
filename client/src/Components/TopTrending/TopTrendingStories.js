import React, { useEffect, useState } from "react";
import filters from "../Filters/filters.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TopTrendingStories = ({setOpenIndividualStoryModal}) => {
  const initialVisibleIndiaImages = 4;
  const [stories, setStories] = useState();
  const [visibleIndiaImages, setVisibleIndiaImages] = useState(
    initialVisibleIndiaImages
  );

  const backendUrl = `${process.env.REACT_APP_BACKEND_URL}stories/getallstories`;

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
  }, []);

  const handleSeeMoreIndiaClick = () => {
    setVisibleIndiaImages(visibleIndiaImages + 4);
  };

  const handleIndividualStories = () => {
    console.log("hi form stories container");
  };

  return (
    <>
      <h1 className={filters.yourStoryHeading}>
        Top trending stories of the day
      </h1>
      {stories && stories.length === 0 ? (
        <h1>No stories are available</h1>
      ) : (
        <>
          {stories &&
            stories.length > 0 &&
            stories.slice(0, visibleIndiaImages).map((story) => {
              return (
                <div
                  onClick={handleIndividualStories}
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
  );
};

export default TopTrendingStories;