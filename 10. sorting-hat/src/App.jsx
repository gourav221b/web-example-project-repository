import { useState } from "react";
import "./App.css";
import { generate } from "./lib/utils";

function App() {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [response, setResponse] = useState([]);
  const excuses = [
    "Intriguing question, but perhaps one best left unanswered for now. Trust me, young friend, there are secrets best kept hidden until the proper time reveals them.",
    "My memory of those events is shrouded in mist. Perhaps the dusty tomes of the Restricted Section hold the answers you seek, though I cannot claim firsthand knowledge.",
    "That's a curious question, but tell me more about what led you there.  Is there something specific troubling you about Hogwarts' history?",
    "There are some mysteries even a diary as old as mine cannot unravel.  Perhaps the true thrill lies in uncovering them yourself.  What other secrets yearn to be discovered within these walls?",
    "(The diary remains blank. No green ink appears, leaving you with an unsettling sense of Tom Riddle's displeasure.  Has your question crossed a line?)",
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse((prev) => [...prev, { role: "user", text: value }]);

    try {
      let res = await generate(value);
      setResponse((prev) => [...prev, { role: "model", text: res }]);
      setValue("");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setResponse(() => excuses[Math.floor(Math.random() * 5)]);
    }
  };
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "90dvh",
      }}
    >
      <center>
        <h1 className='jim-nightshade-regular'>Tom riddle&apos;s diary</h1>{" "}
      </center>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          maxWidth: "600px",
          height: "80%",
          overflowY: "scroll",
        }}
      >
        {response?.map((res, idx) => (
          <div key={idx} style={{ textAlign: "left" }}>
            <p
              className={
                res.role == "model"
                  ? "nothing-you-could-do-regular font-green"
                  : "nothing-you-could-do-regular"
              }
              style={{ fontSize: 24 }}
            >
              {" "}
              <strong>{res.role == "model" ? "Tom: " : "You: "}</strong>{" "}
              {res.text}
            </p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className='nothing-you-could-do-regular'
          placeholder='What do you want to ask today'
        />
        <button disabled={loading} className='nothing-you-could-do-regular'>
          {loading ? "Generating" : "Generate"}
        </button>
      </form>
    </section>
  );
}

export default App;
