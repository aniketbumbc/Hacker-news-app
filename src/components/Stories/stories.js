import { useEffect, useState, useMemo } from 'react';
import { getStoryIds } from '../../services/service';
import Loader from '../../shared/Loader/loader';
import Story from '../Story/story';
import { useInfiniteScroller } from '../../hooks/useInfiniteScroller';

const Stories = () => {
  const [storyIds, setStoryIds] = useState([]);
  const [loader, setloader] = useState(true);
  const { count } = useInfiniteScroller();

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
        storyIds.slice(0, count).map((id) => <Story key={id} storyId={id} />)}
    </>
  );
};

export default Stories;
