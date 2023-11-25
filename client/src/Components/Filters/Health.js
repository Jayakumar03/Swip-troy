import Filter from "./Filter";
import filters from "./filters.module.css";

const Health = ({setOpenIndividualStoryModal}) => {
  return <Filter category={"health"} setOpenIndividualStoryModal={setOpenIndividualStoryModal} />;
};

export default Health;