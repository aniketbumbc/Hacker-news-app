import { useEffect, useState } from 'react';
import { getStoryIds } from '../../services/service';
import Loader from '../../shared/Loader/loader';
import Story from '../Story/story';
import { useInfiniteScroller } from '../../hooks/useInfiniteScroller';

const Stories = () => {
  const [storyIds, setStoryIds] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);
  const { count } = useInfiniteScroller();

  useEffect(() => {
    getStoryIds()
      .then(({ data }) => {
        if (data) {
          setStoryIds(data);
          setLoader(false);
        }
      })
      .catch((error) => {
        setError(true);
        setLoader(false);
        console.log(error);
      });
  }, []);

  return (
    <>
      {error && !loader && (
        <h1> Something went wrong please try again later!!!!!!</h1>
      )}
      {loader && <Loader />}

      {!loader &&
        !error &&
        storyIds &&
        storyIds.slice(0, count).map((id) => <Story key={id} storyId={id} />)}
    </>
  );
};

export default Stories;
