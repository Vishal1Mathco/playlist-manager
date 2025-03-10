import { Link, useNavigate } from "react-router-dom";
import { DisLikeOffIcon, LikeOffIcon } from "../assests/Icons";
import useSongContext from "../hooks/useSongContext";
import SongCard from "./SongCard";
import "./style.css";
import ShareButton from "./ShareButton";

const Playlist = () => {
  const { songs, summary } = useSongContext();

  const navigate = useNavigate();
  const handleSongDetails = (song) => {
    navigate("/song-details", { state: song });
  };

  const songsA =
    songs &&
    songs.map((song, id) => (
      <SongCard song={song} key={id} onClick={() => handleSongDetails(song)} /> 
    ));

  return (
    <div className="playlist">
      <div className="playlist-top">
        <div className="choice-summary">
          {" "}
          <div className="sum-icon">
            <span>{summary.totalLikes}</span>
            <LikeOffIcon />
          </div>
          <div className="sum-icon">
            <span>{summary.totalDislikes}</span>
            <DisLikeOffIcon />{" "}
          </div>
        </div>
        <ShareButton url="http://localhost:3001/" title="Amazing Song!" />
        <Link to="/add-new-song" className="add-new-btn">
          Add New
        </Link>
      </div>

      <div className="songs">{songsA}</div>
    </div>
  );
};

export default Playlist;
