import React from 'react';
import styled from 'styled-components';

export interface WeatherModel {
  city: string;
  country: string;
  description: string;
  temperature?: number;
  humidity?: number;
}

interface WeatherProps extends WeatherModel {
  error?: string;
}

const Weather = ({
  city,
  country,
  temperature,
  humidity,
  description,
  error,
}: WeatherProps): JSX.Element => (
  <Wrapper>
    {city && country && (
      <WeatherKey>
        Location: <WeatherValue>{`${city}, ${country}`}</WeatherValue>
      </WeatherKey>
    )}
    {temperature && (
      <WeatherKey>
        Temperature: <WeatherValue>{temperature}&deg; C</WeatherValue>
      </WeatherKey>
    )}
    {humidity && (
      <WeatherKey>
        Humidity: <WeatherValue>{`${humidity}%`}</WeatherValue>
      </WeatherKey>
    )}
    {description && (
      <WeatherKey>
        {'Conditions: '}
        <WeatherValue>
          {description.replace(/^\w/, (c) => c.toUpperCase())}
        </WeatherValue>
      </WeatherKey>
    )}
    {error && <WeatherError>{error}</WeatherError>}
  </Wrapper>
);

export default React.memo(Weather);

const Wrapper = styled.article`
  width: 60%;
  font-size: 1.2rem;
  font-weight: 200;
  letter-spacing: 2px;

  @media only screen and (max-width: 600px) {
    width: 100%;
    font-size: 0.9rem;
  }

  @media only screen and (min-width: 600px) {
    width: 90%;
  }

  @media only screen and (min-width: 992px) {
    width: 80%;
  }

  @media only screen and (min-width: 1200px) {
    width: 63%;
    font-size: 1.5rem;
  }
`;

const WeatherKey = styled.p`
  color: ${(props) => props.theme.colors.main};
  border-bottom: solid 2px rgba(255, 255, 255, 0.06);
  padding: 20px 0;
  font-weight: 400;

  &:last-child {
    border: 0;
  }

  @media only screen and (max-width: 600px) {
    padding: 10px 0;
  }
`;

const WeatherValue = styled.span`
  color: #fff;
  font-weight: 200;
`;

const WeatherError = styled.p`
  color: ${(props) => props.theme.colors.error};
  font-size: 1.2rem;
  letter-spacing: 1px;
  font-weight: 200;
`;
