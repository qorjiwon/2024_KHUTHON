import React, { useEffect } from 'react';

declare global {
    interface Window {
        naver: any; // 또는 Naver Map API에서 제공하는 타입으로 대체
    }
}

const getDynamicMap = () => {

    const map = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(37.3595704, 127.105399),
        zoom: 10
    });
    return 1;
};

export default getDynamicMap;