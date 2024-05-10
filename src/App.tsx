import { useCallback, useEffect, useState } from 'react';
import './App.scss';
import logo from './Assets/logo.svg';
import Score from 'Sidebar/Score';
import { Graph } from 'Sidebar/Graph';

const App = () => {
    
    useEffect(() => {
      const script = document.createElement('script');
      //script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.CLIENT_ID}`;
      script.async = true;
  
      script.onload = () => {
        const mapOptions = {
          center: new naver.maps.LatLng(37.3595704, 127.105399),
          zoom: 10
        };
  
        new naver.maps.Map('map', mapOptions);
      };
  
      document.body.appendChild(script);
  
      return () => {
        document.body.removeChild(script);
      };

    }, []);
  
    return (
        <div className="App">
            <div className={'Sidebar'}>
                <Score></Score>
                <Graph/>
            </div>
            <div id="map" className={'NaverMap'}></div>
        </div>
    );
}

export default App;