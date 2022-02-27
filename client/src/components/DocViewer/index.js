import React from "react";

const DocIframe = ({ source }) => {
  if (!source) {
    return <div>Loading...</div>;
  }

  const src = source;
  return (
    <div>
      <iframe
        src={"https://docs.google.com/viewer?url=" + src + "&embedded=true"}
        title="file"
        width="100%"
        height="230"
      ></iframe>
    </div>
  );
};

export default DocIframe;
