import React from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

const ShareButton = ({ url, title }) => {
  const shareContent = () => {
    if (navigator.share) {
      navigator
        .share({
          title,
          url,
        })
        .catch((error) => console.error("Error sharing", error));
    } else {
      alert("Sharing is not supported on this browser.");
    }
  };

  return (
    <div className="share-buttons">
      <button onClick={shareContent} className="native-share">
        📤 Share
      </button>

      <FacebookShareButton url={url} quote={title}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      <TwitterShareButton url={url} title={title}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>

      <WhatsappShareButton url={url} title={title} separator=":: ">
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
    </div>
  );
};

export default ShareButton;
