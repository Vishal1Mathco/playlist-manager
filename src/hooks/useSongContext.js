import { useContext } from "react";
import { SongContext } from "../context/songContext";

const useSongContext = () => {
  const { error, songs, onCreate, onUpdate, onDelete,summary,onLike,onDisLike} =
    useContext(SongContext);
  if (songs === null) {
    return "Context is Empty";
  }

  return { error, songs, onCreate, onUpdate, onDelete ,summary,onLike,onDisLike};
};

export default useSongContext;
