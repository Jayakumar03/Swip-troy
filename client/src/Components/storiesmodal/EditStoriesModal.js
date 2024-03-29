import { useEffect, useState } from "react";
import addStoriesStyle from "./addStoriesModal.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const EditStories = ({
  setOpenEditStoriesModal,
  storyId,
  openEditStoriesModal,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [numberOfSlides, setNumberOfSlides] = useState([]);
  const [updateSlide, setUpdateSlides] = useState();

  const backendUrlIndividualStory = `https://swip-troy-backend.vercel.app/api/v1/stories/${storyId}`;

  const backendUrlEdit = `https://swip-troy-backend.vercel.app/api/v1/stories/editstory/${storyId}`;

  useEffect(() => {
    const fetch = async () => {
      const result = await axios
        .get(backendUrlIndividualStory)
        .then((res) => {
          const data = res.data;
          console.log(data);
          setUpdateSlides(data.story.slides);
          setNumberOfSlides(data.story.slides);
          console.log(updateSlide);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetch();
  }, []);

  const handleSlideChange = (index, field, value) => {
    const newSlides = [...updateSlide];
    if (field === "image") {
      newSlides[index][field].url = value;
    } else {
      newSlides[index][field] = value;
    }
    setUpdateSlides(newSlides);
    console.log(newSlides);
  };

  // Add axios post request with bookmark and userDetails._id
  const AddSlide = ({ setOpenAddStoriesModal }) => {
    console.log(numberOfSlides.length);
    if (numberOfSlides.length < 6) {
      setNumberOfSlides((prevSlides) => [...prevSlides, prevSlides.length + 1]);
      setUpdateSlides((prevSlides) => [
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
    } else {
      toast.error("Maximium six updateSlide are allowed");
    }
  };

  const deleteSlide = () => {
    console.log(numberOfSlides.length);
    if (numberOfSlides.length > 3) {
      setNumberOfSlides((prevSlides) => prevSlides.slice(0, -1));
      setUpdateSlides((prevSlides) => prevSlides.slice(0, -1));
    } else {
      toast.error("Minimum three updateSlide are required");
    }
  };

  const closeModal = () => {
    setOpenEditStoriesModal(false);
  };

  const handleUpdateStories = () => {
    if (numberOfSlides.length < 3) {
      toast.error("Minimum three updateSlide are required");
    } else {
      const result = axios.put(backendUrlEdit, {
        slides: updateSlide,
      });

      result
        .then((res) => {
          const data = res.data;
          if (data.success) {
            toast("Successfully created stories");
            closeModal();
          }
        })
        .catch((error) => {
          console.log(error.message);
          toast.error("Not Success registered");
        });
    }
  };

  const previousSlide = () => {
    if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
  };

  const nextSlide = () => {
    console.log(numberOfSlides.length);
    if (
      !updateSlide[currentSlide].heading ||
      !updateSlide[currentSlide].description ||
      !updateSlide[currentSlide].image["url"] ||
      !updateSlide[currentSlide].category
    ) {
      toast.error("All input are required");
    } else {
      if (currentSlide < numberOfSlides.length - 1) {
        setCurrentSlide(currentSlide + 1);
      }
    }
  };

  return (
    <div className={addStoriesStyle.background}>
      <div className={addStoriesStyle.addStoriesContainer}>
        <button className={addStoriesStyle.closeBtn} onClick={closeModal}>
          <i class="fa-solid fa-x"></i>
        </button>
        <span className={addStoriesStyle.info}>Add upto 6 updateSlide</span>
        <div className={addStoriesStyle.slideContainer}>
          {numberOfSlides.map((slide, index) => {
            return (
              <div className={addStoriesStyle.slide}>
                <button
                  key={index}
                  className={`${addStoriesStyle.slideBtn} ${
                    index === currentSlide ? addStoriesStyle.btnBorder : ""
                  }`}
                >
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
              value={
                updateSlide &&
                updateSlide[currentSlide] &&
                updateSlide[currentSlide].heading
              }
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
              value={
                updateSlide &&
                updateSlide[currentSlide] &&
                updateSlide[currentSlide].description
              }
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
              className={`${addStoriesStyle.input} ${addStoriesStyle.alignImage}`}
              value={
                updateSlide &&
                updateSlide[currentSlide] &&
                updateSlide[currentSlide].image &&
                updateSlide[currentSlide].image.url
              }
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
              value={
                updateSlide &&
                updateSlide[currentSlide] &&
                updateSlide[currentSlide].category
              }
              onChange={(e) =>
                handleSlideChange(currentSlide, "category", e.target.value)
              }
              onBlur={(e) => {
                if (e.target.value) {
                  handleSlideChange(currentSlide, "category", e.target.value);
                }
              }}
              required
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
            onClick={handleUpdateStories}
            className={addStoriesStyle.postBtn}
          >
            Update
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

export default EditStories;
