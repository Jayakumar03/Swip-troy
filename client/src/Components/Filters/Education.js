import Filter from "./Filter";
import filters from "./filters.module.css";

const Education = ({setOpenIndividualStoryModal,openIndividualStoryModal}) => {
  return <Filter category={"education"} setOpenIndividualStoryModal={setOpenIndividualStoryModal} openIndividualStoryModal={openIndividualStoryModal} />;
};

export default Education;