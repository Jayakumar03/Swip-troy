import styles from "./individualStory.module.css";

const IndividualStory = () => {
  const image =
    "https://media.gettyimages.com/id/157472912/photo/ice-cream-composition-on-a-bowl.jpg?s=612x612&w=gi&k=20&c=AniWX1OhaarUxCkgjUoKiA3bKVllK0upCylW6Z0PCMQ=";

  return (
    <div className={styles.background}>
      <div
        className={`${styles.container} ${styles.backgroundImage}`}
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className={styles.slideContainer}>
          <span className={styles.slide}></span>
          <span className={styles.slide}></span>
          <span className={styles.slide}></span>
          <span className={styles.slide}></span>
          <span className={styles.slide}></span>
          <span className={styles.slide}></span>
        </div>

        <div className={styles.ButtonContainer}>
          <button className={styles.slideCloseBtn}>
            <i class="fa-solid fa-x"></i>
          </button>

          <button className={styles.slideCloseBtn}>
            <i class="fa-regular fa-paper-plane"></i>
          </button>
        </div>

        <div>
          <button className={styles.leftSlide}>
            <i class="fa-solid fa-chevron-left"></i>
          </button>
          <button className={styles.rightSlide}>
            <i class="fa-solid fa-chevron-right"></i>
          </button>
        </div>

        <div className={styles.detailsContainer}>
          <h1 className={styles.align}>Heading</h1>
          <p className={styles.descriptionAlign}>
            Inspirational designs, illustrations, and graphic elements from the
            world’s best designers.
          </p>

          <div className={styles.ButtonContainerBookmark}>
            <button className={styles.slideBookmarkBtn}>
              <i class="fa-solid fa-bookmark"></i>
            </button>

            <button className={styles.slideBookmarkBtn}>
              <i class="fa-solid fa-heart"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualStory;
