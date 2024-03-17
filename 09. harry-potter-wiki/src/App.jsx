import { useEffect, useState } from "react";
import CharacterList from "./components/CharacterList";

function App() {
  const [allData, setAllData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [loading, setLoading] = useState(false);
  const options = {
    method: "GET",
  };
  useEffect(() => {
    // const FetchResults= async()=>{}
    async function FetchData() {
      try {
        setLoading(true);
        let response = await fetch(
          "https://cors-bypass.slggourav.workers.dev/?q=https://hp-api.onrender.com/api/characters",
          options
        );

        if (!response.ok) {
          throw new Error("something snapped");
        } else {
          let data = await response.json();
          setAllData(data);
          setFilteredData(data);
          setLoading(false);
          console.log("response", data[0]);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }

    FetchData();
  }, []);

  function handleSearch(e) {
    let val = e.target.value.toLowerCase();
    if (val == "" || val == null) {
      setFilteredData(allData);
    } else {
      let filtered = allData.filter(
        (char) =>
          char.name.toLowerCase().includes(val) ||
          char.house.toLowerCase().includes(val) ||
          char.ancestry.toLowerCase().includes(val) ||
          char.actor.toLowerCase().includes(val)
      );
      setFilteredData(filtered);
    }
  }
  return (
    <>
      {loading ? (
        <>Loading data...</>
      ) : (
        <main>
          <input
            type='search'
            name='searchChar'
            id='searchChar'
            placeholder='Search characters'
            onChange={handleSearch}
          />
          <CharacterList list={filteredData} />
        </main>
      )}
    </>
  );
}

export default App;
