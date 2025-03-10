import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Playlist from "./components/Playlist";
import SongDetail from "./components/SongDetail";
import SongForm from "./components/SongForm";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Playlist />} />
          <Route path="/song-details" element={<SongDetail />} />
          <Route path="/edit-song" element={<SongForm />} />
          <Route path="/add-new-song" element={<SongForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;