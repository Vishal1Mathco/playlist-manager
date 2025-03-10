import { Link, useLocation, useNavigate } from "react-router-dom";
import "./style.css";
import useSongContext from "../hooks/useSongContext";
import { useState } from "react";
import {
  DeletIcon,
  DislikeIcon,
  DisLikeOffIcon,
  EditIcon,
  LikeIcon,
  LikeOffIcon,
} from "../assests/Icons";

const SongDetail = () => {
  const location = useLocation();
  const song = location.state;
  const { onDelete, onLike, onDisLike } = useSongContext();
  const [isLiked, setIsLiked] = useState(song.isLiked || false);
  const [isDisLiked, setIsDisLiked] = useState(song.isDisLiked || false);
  const navigate = useNavigate();

  const handleDelete = () => {
    onDelete(song.id);
    navigate("/");
  };

  return (
    <div className="song-details-wrapper">
      <div className="songDetails">
        <img src={song.img} alt="Song Cover" className="song-image" />
        <h2 className="song-title">{song.title}</h2>
        <p className="song-description">{song.desc}</p>

        <div className="song-details">
          <span className="genre">{song.popStyle}</span>
          <span className="duration">{song.duration} mins</span>
          <span className="date">{song.releaseDate}</span>
        </div>

        <div className="song-actions-wr">
          <div className="song-actions">
            <div
              className="icons"
              onClick={() =>
                onLike(song, isLiked, isDisLiked, setIsLiked, setIsDisLiked)
              }
            >
              {isLiked ? <LikeIcon /> : <LikeOffIcon />}
            </div>

            <div
              className="icons"
              onClick={() =>
                onDisLike(song, isLiked, isDisLiked, setIsLiked, setIsDisLiked)
              }
            >
              {isDisLiked ? <DislikeIcon /> : <DisLikeOffIcon />}
            </div>
          </div>

          <div className="song-edit-actions">
            <Link to="/edit-song" className="icons" state={song}>
              <EditIcon />
            </Link>
            <div className="icons" onClick={handleDelete}>
              <DeletIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongDetail;
