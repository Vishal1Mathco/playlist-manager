import "./style.css";
import { useLocation, useNavigate } from "react-router-dom";
import useSongContext from "../hooks/useSongContext";
import { useReducer } from "react";

const SongForm = () => {
  const location = useLocation();
  const { error, onCreate, onUpdate } = useSongContext();
  const navigate = useNavigate();

  const initialState = {
    img: "",
    title: "",
    desc: "",
    songType: "",
    popStyle: "",
    duration: "",
    releaseDate: "",
    isLiked: false,
    isDisLiked: false,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "UPDATE_STATE":
        return {
          ...state,
          [action.field]: action.value,
        };
      case "RESET":
        return initialState;

      default:
        return initialState;
    }
  };

  const stateData =
    location.pathname === "/edit-song" ? location.state : initialState;

  const [state, dispatch] = useReducer(reducer, {
    ...stateData,
  });

  const handleChange = (e) => {
    dispatch({
      type: "UPDATE_STATE",
      field: e.target.name,
      value: e.target.value,
    });
  };

  const createBook = async () => {
    onCreate(state);
    if (!error) {
      dispatch({ type: "RESET" });
      navigate("/");
    }
  };

  const resetBook = () => {
    dispatch({ type: "RESET" });
  };

  const updateSong = () => {
    onUpdate(state?.id, state);
    if (!error) {
      dispatch({ type: "RESET" });
      navigate("/");
    }
  };

  return (
    <div className="song-form-wrapper">
      <div className="song-form">
        <div className="form-item">
          <label htmlFor="">Song Image Url</label>
          <input
            type="text"
            value={state.img}
            onChange={handleChange}
            name="img"
          />
        </div>

        <div className="form-item">
          <label htmlFor="">Song Title</label>
          <input
            type="text"
            value={state.title}
            onChange={handleChange}
            name="title"
          />
        </div>

        <div className="form-item">
          <label htmlFor="">Description</label>
          <textarea
            name="desc"
            rows={3}
            value={state.desc}
            onChange={handleChange}
          />
        </div>

        <div className="form-item">
          <label htmlFor="">Song Type</label>
          <select
            id="songType"
            value={state.songType}
            onChange={handleChange}
            name="songType"
          >
            <option value="">select song type</option>
            <option value="Audio">Audio</option>
            <option value="Video">Video</option>
          </select>
        </div>

        <div className="form-item">
          <label htmlFor="">Pop Style</label>
          <input
            type="text"
            value={state.popStyle}
            onChange={handleChange}
            name="popStyle"
          />
        </div>
        <div className="form-item">
          <label htmlFor="">Duration</label>
          <input
            type="number"
            min={0}
            value={state.duration}
            onChange={handleChange}
            name="duration"
          />
        </div>
        <div className="form-item">
          <label htmlFor="">Release Date</label>
          <input
            type="date"
            value={state.releaseDate}
            onChange={handleChange}
            name="releaseDate"
          />
        </div>

        {error && <p className="error">error</p>}

        <div className="form-btns">
          {location.pathname === "/edit-song" ? (
            <button onClick={updateSong}>Update</button>
          ) : (
            <button onClick={createBook}>Create</button>
          )}
          <button onClick={resetBook}>Reset</button>
        </div>
      </div>
    </div>
  );
};

export default SongForm;
