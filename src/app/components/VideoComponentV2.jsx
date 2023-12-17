import { useState } from 'react';

function VideoComponentV2() {
  const [showVideo, setShowVideo] = useState(false);

  const openVideo = () => {
    setShowVideo(true);
  };

  return (
    <div>
      {showVideo ? (
        <div>
          <iframe
            src="https://fast.wistia.net/embed/iframe/09d0j7zwor"
            width="360"
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
            style={{ height: '185px', width: '330px', borderRadius: '10px' }}
          />
        </button>
      )}
    </div>
  );
}

export default VideoComponentV2;
