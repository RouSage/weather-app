import React, { useState } from 'react';
import styled from 'styled-components';

import { WeatherResponse } from './api/api';
import WeatherForm from './components/Form';
import Titles from './components/Titles';
import Weather, { WeatherModel } from './components/Weather';
import GlobalStyles from './theme/globalstyles';

const initialValues: WeatherModel = {
  city: '',
  country: '',
  description: '',
  humidity: undefined,
  temperature: undefined,
};

const App = (): JSX.Element => {
  const [weather, setWeather] = useState<WeatherModel>(initialValues);
  const [error, setError] = useState<string>('');

  const getWeather = (data: WeatherResponse | null, responseError = '') => {
    if (!responseError && data) {
      setWeather({
        city: data.name,
        country: data.sys.country,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        temperature: data.main.temp,
      });
      setError('');
    } else {
      setWeather(initialValues);
      setError(responseError);
    }
  };

  return (
    <>
      <GlobalStyles />
      <Wrapper>
        <Main>
          <Container>
            <Hero>
              <Titles />
            </Hero>
            <FormContainer>
              <WeatherForm getWeather={getWeather} />
              <Weather
                city={weather.city}
                country={weather.country}
                temperature={weather.temperature}
                humidity={weather.humidity}
                description={weather.description}
                error={error}
              />
            </FormContainer>
          </Container>
        </Main>
      </Wrapper>
    </>
  );
};

export default App;

const Wrapper = styled.div`
  background: linear-gradient(to right, #3a8100, #7fca40);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Main = styled.main`
  height: 90vh;
  box-shadow: 0 13px 40px -13px rgba(0, 0, 0, 0.75);
  background: #fff;
  width: 80%;
  margin: 0 auto;

  @media only screen and (max-width: 600px) {
    width: 90%;
  }

  @media only screen and (min-width: 600px) {
    width: 90%;
  }

  @media only screen and (min-width: 1200px) {
    width: 80%;
  }
`;

const Container = styled.main`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;

  @media only screen and (max-width: 600px) {
    height: 100%;
    flex-flow: column nowrap;
  }
`;

const Hero = styled.section`
  height: 90vh;
  flex: 1 1 45%;
  background: url(${(props) => props.theme.bgImage.bg320}) center center
    no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #000;

  @media only screen and (max-width: 600px) {
    flex: 1 0 150px;
  }

  @media screen and (min-width: 601px) {
    flex: 1 0 30%;
    background: url(${(props) => props.theme.bgImage.bg768}) center center
      no-repeat;
  }

  @media screen and (min-width: 769px) {
    background: url(${(props) => props.theme.bgImage.bg992}) center center
      no-repeat;
  }

  @media screen and (min-width: 993px) {
    flex: 1 0 40%;
    background: url(${(props) => props.theme.bgImage.bg1199}) center center
      no-repeat;
  }

  @media screen and (min-width: 1200px) {
    flex: 1 1 50%;
    background: url(${(props) => props.theme.bgImage.bg}) center center
      no-repeat;
  }
`;

const FormContainer = styled.section`
  -webkit-box-flex: 1;
  flex: 1 1 auto;
  background-color: #202020;
  padding-top: 100px;
  padding-left: 50px;

  @media only screen and (max-width: 600px) {
    flex: 1;
    padding: 25px 10px 10px 10px;
  }

  @media only screen and (min-width: 600px) {
    flex: 1 1 50%;
    padding-left: 25px;
  }

  @media only screen and (min-width: 992px) {
    flex: 1 1 50%;
  }

  @media only screen and (min-width: 1200px) {
    flex: 1 1 auto;
    padding-left: 50px;
  }
`;
