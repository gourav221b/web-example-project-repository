import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Reminder from "./components/Reminder";
import "./App.css";

function App() {
  return (
    <section className='mainWrapper'>
      <Navbar />
      <Reminder />
      <Footer />
    </section>
  );
}

export default App;
