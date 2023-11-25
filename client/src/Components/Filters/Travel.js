import Filter from "./Filter";

const Travel = ({ setOpenIndividualStoryModal }) => {
  return (
    <Filter
      category={"travel"}
      setOpenIndividualStoryModal={setOpenIndividualStoryModal}
    />
  );
};

export default Travel;
