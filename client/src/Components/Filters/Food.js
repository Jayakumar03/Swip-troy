import Filter from "./Filter";
import filters from "./filters.module.css";

const Food = ({setOpenIndividualStoryModal,openIndividualStoryModal}) => {
  
  return <Filter category={"food"} setOpenIndividualStoryModal={setOpenIndividualStoryModal} openIndividualStoryModal={openIndividualStoryModal} />;
};

export default Food;
