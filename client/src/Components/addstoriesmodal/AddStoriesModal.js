import { useState } from "react";
import addStoriesStyle from "./addStoriesModal.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddStories = ({ setOpenAddStoriesModal, userDetails }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [numberOfSlides, setNumberOfSlides] = useState([]);
  const [slides, setSlides] = useState([
    {
      heading: "",
      description: "",
      image: {
        url: "",
      },
      category: "",
      like: 0,
    },
  ]);

  const handleSlideChange = (index, field, value) => {
    const newSlides = [...slides];
    if (field === "image") {
      newSlides[index][field].url = value;
    } else {
      newSlides[index][field] = value;
    }
    setSlides(newSlides);
    console.log(newSlides);
  };
  // Add axios post request with bookmark and userDetails._id

  const AddSlide = ({ setOpenAddStoriesModal }) => {
    console.log(numberOfSlides.length);
    if (numberOfSlides.length < 6) {
      setNumberOfSlides((prevSlides) => [...prevSlides, prevSlides.length + 1]);
    } else {
      toast.error("Maximium six slides are allowed");
    }
  };

  const deleteSlide = () => {
    console.log(numberOfSlides.length);
    if (numberOfSlides.length > 3) {
      setNumberOfSlides((prevSlides) => prevSlides.slice(0, -1));
    } else {
      toast.error("Minimum three slides are required");
    }
  };

  const closeModal = () => {
    console.log("closed");
    setOpenAddStoriesModal(false);
  };
  const handleCreateStories = () => {
    // make an api call create stories
  };

  const previousSlide = () => {
    if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
  };

  const nextSlide = () => {
    console.log("hi", numberOfSlides.length);
    if (currentSlide < numberOfSlides.length-1) {
      setCurrentSlide(currentSlide + 1);
      setSlides((prevSlides) => [
        ...prevSlides,
        {
          heading: "",
          description: "",
          image: {
            url: "",
          },
          like: 0,
        },
      ]);
    }
  };

  return (
    <div className={addStoriesStyle.background}>
      <div className={addStoriesStyle.addStoriesContainer}>
        <button className={addStoriesStyle.closeBtn} onClick={closeModal}>
          <i class="fa-solid fa-x"></i>
        </button>
        <span className={addStoriesStyle.info}>Add upto 6 slides</span>
        <div className={addStoriesStyle.slideContainer}>
          {numberOfSlides.map((slide, index) => {
            return (
              <div className={addStoriesStyle.slide}>
                <button key={index} className={addStoriesStyle.slideBtn}>
                  Slide{index + 1}
                  <button
                    className={addStoriesStyle.slideCloseBtn}
                    onClick={deleteSlide}
                  >
                    <i class="fa-solid fa-x"></i>
                  </button>
                </button>
              </div>
            );
          })}

          {numberOfSlides > 5 ? null : (
            <button onClick={AddSlide} className={addStoriesStyle.addBtn}>
              Add +
            </button>
          )}
        </div>

        <form className={addStoriesStyle.formContainer}>
          <div className={addStoriesStyle.filedContainer}>
            <h3>
              {" "}
              <label>Heading: </label>
            </h3>
            <input
              type="text"
              name="heading"
              placeholder="Your heading"
              className={`${addStoriesStyle.input} ${addStoriesStyle.align}`}
              value={slides[currentSlide].heading}
              onChange={(e) =>
                handleSlideChange(currentSlide, "heading", e.target.value)
              }
            ></input>
          </div>

          <div className={addStoriesStyle.filedContainer}>
            <h3>
              <label>Description: </label>
            </h3>
            <input
              type="text"
              name="description"
              placeholder="Your Description"
              className={`${addStoriesStyle.input} ${addStoriesStyle.alignDescription}`}
              value={slides[currentSlide].description}
              onChange={(e) =>
                handleSlideChange(currentSlide, "description", e.target.value)
              }
            ></input>
          </div>

          <div className={addStoriesStyle.filedContainer}>
            <h3>
              <label>Image: </label>
            </h3>
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              className={`${addStoriesStyle.input} ${addStoriesStyle.alignHeading}`}
              value={slides[currentSlide].image.url}
              onChange={(e) =>
                handleSlideChange(currentSlide, "image", e.target.value)
              }
            ></input>
          </div>

          <div className={addStoriesStyle.filedContainer}>
            <h3>
              <label>Category: </label>
            </h3>
            <select
              id="filters"
              className={`${addStoriesStyle.input} ${addStoriesStyle.alignCategory}`}
              value={slides[currentSlide].category}
              onChange={(e) =>
                handleSlideChange(currentSlide, "category", e.target.value)
              }
            >
              <option value="food ">food </option>
              <option value="health and fitness">health and fitness</option>
              <option value="travel">travel</option>
              <option value="movies">movies</option>
              <option value="education">education</option>
            </select>
          </div>
        </form>

        <div className={addStoriesStyle.btnContainer}>
          <button
            onClick={previousSlide}
            className={addStoriesStyle.previousBtn}
          >
            Previos
          </button>
          <button onClick={nextSlide} className={addStoriesStyle.nextBtn}>
            Next
          </button>
          <button
            onClick={handleCreateStories}
            className={addStoriesStyle.postBtn}
          >
            Post
          </button>
        </div>
      </div>

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
    </div>
  );
};

export default AddStories;
