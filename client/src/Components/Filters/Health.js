import Filter from "./Filter";
import filters from "./filters.module.css";

const Health = ({setOpenIndividualStoryModal,openIndividualStoryModal}) => {
  return <Filter category={"health"} setOpenIndividualStoryModal={setOpenIndividualStoryModal} openIndividualStoryModal={openIndividualStoryModal} />;
};

export default Health;