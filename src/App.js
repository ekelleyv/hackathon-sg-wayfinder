import React from 'react';
import styled from 'styled-components';
import MapboxMap from './MapboxMap.js';
import './App.css';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Gilroy, "Helvetica Neue", Arial, Helvetica, sans-serif;
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: left;
  font-weight: bold;
  font-color: #444;
  padding: 20px;
`;

const Header = styled.div`
  border-bottom: 2px solid #aaa;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const MainContainer = styled.div`
  height: 100%;
`;

const RightContainer = styled.div`
  padding: 10px;
  text-align: right;
  line-height: 20px;
`;

const Address1 = styled.div`
  font-weight: bold;
`;

const Address2 = styled.div`
`;

const Logo = styled.img.attrs({
    src: 'image url here'
  })`
  width: 40px;
  height: 40px;
  padding: 20px;
  `;

function App() {
  return (
    <AppContainer>
      <Header>
        <Logo src={'logo.svg'}/>
        <RightContainer>
          <Address1>
            SeatGeek HQ
          </Address1>
          <Address2>
            902 Broadway
          </Address2>
          <Address2>
            Floor 9
          </Address2>
        </RightContainer>
        </Header>
      <MainContainer>
      <MapboxMap/>
      </MainContainer>
    </AppContainer>
  );
}

export default App;
