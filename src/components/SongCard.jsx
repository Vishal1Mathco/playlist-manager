import {
  DeletIcon,
  DislikeIcon,
  DisLikeOffIcon,
  EditIcon,
  LikeIcon,
  LikeOffIcon,
} from "../assests/Icons";
import "./style.css";
import useSongContext from "../hooks/useSongContext";
import { Link } from "react-router-dom";
import { useState } from "react";

const SongCard = ({ song, onClick }) => {
  const { onDelete, onLike, onDisLike, } = useSongContext();
  const [isLiked, setIsLiked] = useState(song.isLiked || false);
  const [isDisLiked, setIsDisLiked] = useState(song.isDisLiked || false);

  const trimSentence = (sentence, maxLength) => {
    if (!sentence) return "";
    if (sentence.length <= maxLength) return sentence;
  
    const trimmed = sentence.substring(0, maxLength).trim();
    return trimmed + "...";
  };

  return (
    <div className="song-card" >
      <div className="left" onClick={onClick}>
        <img src={song.img} alt="Audio/Video img" />
      </div>
      <div className="right">
        <div className="song-title" onClick={onClick}>{song.title}</div>
        <p className="song-desc" onClick={onClick}>{trimSentence(song.desc,60)}</p>
        <div className="song-bottom">
          <span className="genre">{song.popStyle}</span>
          <div className="icons" onClick={() => onLike(song, isLiked, isDisLiked, setIsLiked, setIsDisLiked)}>
            {isLiked ? <LikeIcon /> : <LikeOffIcon />}
          </div>

          <div className="icons" onClick={() => onDisLike(song, isLiked, isDisLiked, setIsLiked, setIsDisLiked)}>
            {isDisLiked ? <DislikeIcon /> : <DisLikeOffIcon />}
          </div>

          <Link to="/edit-song" className="icons" state={song}>
            <EditIcon />
          </Link>
          <div className="icons" onClick={() => onDelete(song.id)}>
            <DeletIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongCard;
