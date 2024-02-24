import CharacterCard from "./CharacterCard";

/* eslint-disable react/prop-types */
export default function CharacterList({ list }) {
  return (
    <section className='charList'>
      {list?.length > 0 ? (
        list?.map((char) => (
          <div key={char?.id}>
            <CharacterCard character={char} />
          </div>
        ))
      ) : (
        <>No results found</>
      )}
    </section>
  );
}
