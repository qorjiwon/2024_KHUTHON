import './Map.scss';
import { useEffect } from 'react';

const Map = ({onClick}:{onClick: (event: React.DragEvent<HTMLDivElement>)=> void}) => {

    useEffect(() => {
        const script = document.createElement('script');
        //script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.CLIENT_ID}`;
        script.async = true;

        script.onload = () => {
            const position = new naver.maps.LatLng(37.3595704, 127.105399);

            var map = new naver.maps.Map('map', {
                center: position,
                zoom: 15
            });
        };

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className={'Map'} onClick={onClick}>
            <div id="map" className={'NaverMap'}></div>
        </div>
    );
}

export default Map;