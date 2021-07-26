import { useState, useEffect } from 'react';

const useInitialState = (URL) => {
  const [videos, setVideo] = useState([]);
  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => setVideo(data))
      .catch((error) => console.error(error));
  }, []);
  return videos;
};

export default useInitialState;
