import Filter from "./Filter";
import filters from "./filters.module.css";

const Education = ({setOpenIndividualStoryModal}) => {
  return <Filter category={"education"} setOpenIndividualStoryModal={setOpenIndividualStoryModal} />;
};

export default Education;