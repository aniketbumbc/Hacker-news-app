import { useEffect, useState } from 'react';
import { getStoryIds } from '../../services/service';
import Loader from '../../shared/Loader/loader';
import Story from '../Story/story';

const Stories = () => {
  const [storyIds, setStoryIds] = useState([]);
  const [loader, setloader] = useState(true);

  useEffect(() => {
    getStoryIds().then(({ data }) => {
      if (data) {
        setStoryIds(data);
        setloader(false);
      }
    });
  }, []);

  return (
    <>
      {loader && <Loader />}

      {!loader &&
        storyIds &&
        storyIds.map((id) => <Story key={id} storyId={id} />)}
    </>
  );
};

export default Stories;
