import Filter from "./Filter";
import filters from "./filters.module.css";

const Food = ({setOpenIndividualStoryModal}) => {
  
  return <Filter category={"food"} setOpenIndividualStoryModal={setOpenIndividualStoryModal} />;
};

export default Food;
