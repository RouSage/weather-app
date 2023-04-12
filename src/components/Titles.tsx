import React, { memo } from "react";

const Titles = () => (
  <header className="px-1 text-center text-black">
    <h1 className="font-roboto text-2xl md:text-4xl">Weather Finder</h1>
    <h3 className="font-merriweather text-xs font-light italic md:text-base">
      Find out temperature, conditions and more
    </h3>
  </header>
);

export default memo(Titles);
