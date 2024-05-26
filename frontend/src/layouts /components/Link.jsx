import React from "react";

const Link = ({ url }) => {
  return (
    <div className="header_text">
      <p>Ссылка для кандидата: http://localhost:3000{url}</p>
    </div>
  );
}

export default Link;
