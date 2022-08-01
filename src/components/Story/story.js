import { useState, useEffect } from 'react';
import { getStory } from '../../services/service';
import { convertDateTime } from '../../utils';
import './story.css';

const Story = ({ storyId }) => {
  const [story, setStory] = useState({});

  useEffect(() => {
    getStory(storyId).then((data) => {
      if (data && data.url) {
        setStory(data);
      }
    });
  }, [storyId]);

  return story && story.url ? (
    <>
      <div className='container'>
        <div className='blog-container'>
          <a target='_blank' href={story.url} rel='noreferrer noopener'>
            <p>{story.title}</p>
          </a>
          <p>
            <span>
              <strong>By: </strong>
              <i>{story.by}</i>
            </span>{' '}
            |{' '}
            <span>
              {' '}
              <strong>Posted:</strong> <i>{convertDateTime(story.time)}</i>{' '}
            </span>
          </p>
        </div>
      </div>
    </>
  ) : null;
};

export default Story;
