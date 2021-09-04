import React from 'react';
import styled from 'styled-components';

const Titles = (): JSX.Element => (
  <Wrapper>
    <Title>Weather Finder</Title>
    <Subtitle>Find out temperature, conditions and more</Subtitle>
  </Wrapper>
);

export default React.memo(Titles);

const Wrapper = styled.div`
  padding: 0 5px;
`;

const Title = styled.h1`
  font-size: 2.5em;
  letter-spacing: 2px;
  line-height: 1.3;
  font-family: 'Roboto Slab', serif;

  @media only screen and (max-width: 600px) {
    font-size: 1.5em;
  }

  @media only screen and (min-width: 600px) {
    font-size: 2em;
  }

  @media only screen and (min-width: 992px) {
    font-size: 2.5em;
  }

  @media only screen and (min-width: 1200px) {
    font-size: 3rem;
  }
`;

const Subtitle = styled.h3`
  font-style: italic;
  font-weight: 100;
  letter-spacing: 1.5;
  font-family: 'Merriweather', serif;

  @media only screen and (max-width: 600px) {
    font-size: 0.85em;
  }

  @media only screen and (min-width: 600px) {
    font-size: 1em;
  }

  @media only screen and (min-width: 992px) {
    font-size: 1.17em;
  }

  @media only screen and (min-width: 1200px) {
    font-size: 1.5em;
  }
`;
