import React from "react";

const Footer = () => {
  return (
    <div className="flex items-center justify-between gap-4 px-4 lg:px-44 py-3">
      <img width={150} src="/logo.svg" alt="" />
      <p className="flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden">
        Copyright @GreatStack.dev | All rights reserved.
      </p>
      <div className="flex items-center gap-1">
        <img width={40} src="/facebook_icon.svg" alt="" />
        <img width={40} src="/twitter_icon.svg" alt="" />
        <img width={40} src="/google_plus_icon.svg" alt="" />
      </div>
    </div>
  );
};

export default Footer;
