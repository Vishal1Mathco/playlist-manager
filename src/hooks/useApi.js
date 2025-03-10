import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useApi = () => {
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState({ totalLikes: 0, totalDislike: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const URL = "http://localhost:3000/songs";
  const SUMMARY_URL = "http://localhost:3000/summary";

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [songsRes, summaryRes] = await Promise.all([
        axios.get(URL),
        axios.get(SUMMARY_URL),
      ]);

      if (songsRes.status === 200 && summaryRes.status === 200) {
        setData(songsRes.data);
        setSummary(summaryRes.data);
      } else {
        throw new Error("Something went wrong with API");
      }
    } catch (error) {
      setError("Error fetching data");
    }
    setLoading(false);
  }, []);

  const createSong = async (newSong) => {
    try {
      const response = await axios.post(URL, newSong);
      setData([...data, response.data]);
    } catch (err) {
      setError("Error adding user");
    }
  };

  const updateSong = async (id, updatedSong) => {
    try {
      await axios.put(`${URL}/${id}`, updatedSong);
      setData(data.map((user) => (user.id === id ? updatedSong : user)));
    } catch (err) {
      setError("Error updating user");
    }
  };

  const deleteSong = async (id) => {
    try {
      await axios.delete(`${URL}/${id}`);
      setData(data.filter((user) => user.id !== id));
    } catch (err) {
      setError("Error deleting user");
    }
  };

  const updateSummary = async (newSummary) => {
    const updatedSummary = { ...summary, ...newSummary };
    try {
      await axios.put(SUMMARY_URL, updatedSummary);
      setSummary(updatedSummary);
    } catch (err) {
      setError("Error updating summary");
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    summary,
    error,
    createSong,
    updateSong,
    deleteSong,
    updateSummary,
  };
};

export default useApi;
