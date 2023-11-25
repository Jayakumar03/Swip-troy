import React, { useEffect, useState } from "react";
import filters from "./filters.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Filter = ({ category }) => {
  const initialVisibleIndiaImages = 4;
  const [stories, setStories] = useState();
  const [visibleIndiaImages, setVisibleIndiaImages] = useState(
    initialVisibleIndiaImages
  );

  const backendUrl = `${process.env.REACT_APP_BACKEND_URL}stories/filteredStories`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.post(backendUrl, {
          category: `${category}`,
        });
        if (result.data.success) {
          setStories(result.data.filteredStories);
        } else {
          toast.error("error in filters");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleSeeMoreIndiaClick = () => {
    setVisibleIndiaImages(visibleIndiaImages + 4);
  };

  return (
    // <div className={filters.container}>
    <>
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
                      {story.slide && story.slide.heading}Hello
                    </h3>
                    <p className={filters.decsription}>
                      {story.slide && story.slide.decsription}
                      decdcdcscdcfacasdcdcdcdscdscdscdscdscsdc
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

export default Filter;
