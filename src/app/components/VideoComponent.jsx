import { useState } from 'react';

function VideoComponent({ videoUrl }) {
  const [showVideo, setShowVideo] = useState(false);

  const openVideo = () => {
    setShowVideo(true);
  };

  return (
    <div>
      {showVideo ? (
        <div>
          <iframe
            src={videoUrl || 'https://fast.wistia.net/embed/iframe/fo7dvqzmxu?autoPlay=true'}
            width="320"
            height="185"
            allowtransparency="true"
            frameBorder="0"
            allowFullScreen
            title="Embedded Video"
          />
        </div>
      ) : (
        <button onClick={openVideo}>
          <img
            className="w-css-reset"
            src="https://embed-ssl.wistia.com/deliveries/8dad09e9908219fa4e652dd01ca44c9e.webp?image_crop_resized=640x360"
            alt="Video Thumbnail"
            style={{ height: '185px', width: '320px', borderRadius: '10px' }}
          />
        </button>
      )}
    </div>
  );
}

export default VideoComponent;
