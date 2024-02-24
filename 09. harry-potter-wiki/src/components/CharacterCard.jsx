/* eslint-disable react/prop-types */

export default function CharacterCard({ character }) {
  return (
    <div className='characterCard'>
      <img
        src={
          character?.image ||
          `https://ui-avatars.com/api/?name=${character?.name.replaceAll(
            " ",
            "+"
          )}&background=random`
        }
        alt={character?.name}
      />
      <h2>{character?.name}</h2>
      <h3>{character?.house || "No house available"}</h3>
    </div>
  );
}
