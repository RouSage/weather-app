import React from 'react';
import './Titles.css';

const Titles = () => (
  <div className='title-wrapper'>
    <h1 className='title'>Weather Finder</h1>
    <h3 className='subtitle'>Find out temperature, conditions and more</h3>
  </div>
);

export default React.memo(Titles);
