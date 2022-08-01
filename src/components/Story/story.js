import { useState, useEffect, memo } from 'react';
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
              <strong style={{ color: 'rgb(212, 141, 25)' }}>By: </strong>
              <i style={{ color: 'coral' }}>{story.by}</i>
            </span>{' '}
            |{' '}
            <span>
              {' '}
              <strong style={{ color: 'rgb(212, 141, 25)' }}>
                Posted:
              </strong>{' '}
              <i style={{ color: 'coral' }}>{convertDateTime(story.time)}</i>{' '}
            </span>
          </p>
        </div>
      </div>
    </>
  ) : null;
};

export default memo(Story);
