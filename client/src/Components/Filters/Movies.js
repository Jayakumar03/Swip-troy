import Filter from "./Filter";
import filters from "./filters.module.css";

const Movies = ({setOpenIndividualStoryModal}) => {
  return <Filter category={"movies"} setOpenIndividualStoryModal={setOpenIndividualStoryModal} />;
};

export default Movies;