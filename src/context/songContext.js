import { createContext } from "react";
import useApi from "../hooks/useApi";
import axios from "axios";

export const SongContext = createContext();

const Provider = ({ children }) => {
  const {
    error,
    data,
    summary,
    updateSummary,
    createSong,
    updateSong,
    deleteSong,
  } = useApi();

  const handleLike = async (
    song,
    isLiked,
    isDisLiked,
    setIsLiked,
    setIsDisLiked
  ) => {
    try {
      const updatedLiked = !isLiked;
      const updatedDisLiked = false;

      setIsLiked(updatedLiked);
      setIsDisLiked(updatedDisLiked);

      await axios.patch(`http://localhost:3000/songs/${song.id}`, {
        isLiked: updatedLiked,
        isDisLiked: updatedDisLiked,
      });

      updateSummary({
        totalLikes: updatedLiked
          ? summary.totalLikes + 1
          : summary.totalLikes - 1,
        totalDislikes: summary.totalDislikes - (isDisLiked ? 1 : 0),
      });
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  const handleDisLike = async (
    song,
    isLiked,
    isDisLiked,
    setIsLiked,
    setIsDisLiked
  ) => {
    try {
      const updatedDisLiked = !isDisLiked;
      const updatedLiked = false;

      setIsDisLiked(updatedDisLiked);
      setIsLiked(updatedLiked);

      await axios.patch(`http://localhost:3000/songs/${song.id}`, {
        isLiked: updatedLiked,
        isDisLiked: updatedDisLiked,
      });

      updateSummary({
        totalLikes: summary.totalLikes - (isLiked ? 1 : 0),
        totalDislikes: updatedDisLiked
          ? summary.totalDislikes + 1
          : summary.totalDislikes - 1,
      });
    } catch (error) {
      console.error("Error updating dislike:", error);
    }
  };

  const handleDelete = async (songId) => {
    try {
      const songToDelete = data.find((song) => song.id === songId);
      if (!songToDelete) return;

      const updatedLikes = songToDelete.isLiked
        ? summary.totalLikes - 1
        : summary.totalLikes;
      const updatedDislikes = songToDelete.isDisLiked
        ? summary.totalDislikes - 1
        : summary.totalDislikes;

      updateSummary({
        totalLikes: updatedLikes,
        totalDislikes: updatedDislikes,
      });

      deleteSong(songId);
    } catch (error) {
      console.error("Error deleting song:", error);
    }
  };

  return (
    <SongContext.Provider
      value={{
        error,
        songs: data,
        onCreate: createSong,
        onUpdate: updateSong,
        onDelete: handleDelete,
        summary,
        updateSummary,
        onLike: handleLike,
        onDisLike: handleDisLike,
      }}
    >
      {children}
    </SongContext.Provider>
  );
};

export { Provider };
