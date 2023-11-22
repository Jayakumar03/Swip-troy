import styles from "./bookmarkpage.module.css";
import Bookmarkicon from "../Image/bookmark-icon.png";
import Profilepic from "../Image/profilepic.svg";
import Hamburgericon from "../Image/Ham.svg";


const Bookmarkpage = () => {
  

  return (
    <div className={styles.bookmarkHeader}>
      <h3 className={styles.bookmarkSwip}>SwipTory</h3>
      <button className={styles.bookmarkBtn} >
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
      <p className={styles.yrBookmark}>Your Bookmarks</p>
    </div>
  );
};

export default Bookmarkpage;
