import './Map.scss';
import { useEffect, useState } from 'react';
import $ from 'jquery';

const Map = () => {

    useEffect(() => {
        const script = document.createElement('script');
        const script2 = document.createElement('script');
        const script3 = document.createElement('script');
        script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=d5p66d1329`;
        script.async = true;

        console.log(script)
        script.onload = () => {
            const position = new naver.maps.LatLng(37.3595704, 127.105399);
            console.log(position)

            var map = new naver.maps.Map('map', {
                center: position,
                zoom: 15
            });

            var marker = new naver.maps.Marker({
                position: position,
                map: map
            });

            naver.maps.Event.addListener(map, 'click', function (e) {
                marker.setPosition(e.coord);
            });

            var infoWindow = new naver.maps.InfoWindow({
                content: 'Info Window Content',
                zIndex: 1
            });

            script2.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=d5p66d1329&submodules=geocoder`;

            script2.onload = () => {

                function searchAddressToCoordinate(address: any) {
                    naver.maps.Service.geocode({
                        query: address
                    }, function (status, response) {
                        if (status === naver.maps.Service.Status.ERROR) {
                            return alert('Something Wrong!');
                        }

                        if (response.v2.meta.totalCount === 0) {
                            return alert('totalCount' + response.v2.meta.totalCount);
                        }

                        const htmlAddresses: string[] = [];
                        const item = response.v2.addresses[0];
                        const point = new naver.maps.Point(parseFloat(item.x), parseFloat(item.y));

                        if (item.roadAddress) {
                            htmlAddresses.push('[도로명 주소] ' + item.roadAddress);
                        }

                        if (item.jibunAddress) {
                            htmlAddresses.push('[지번 주소] ' + item.jibunAddress);
                        }

                        if (item.englishAddress) {
                            htmlAddresses.push('[영문명 주소] ' + item.englishAddress);
                        }

                        infoWindow.setContent([
                            '<div style="padding:10px;min-width:200px;line-height:150%;">',
                            '<h4 style="margin-top:5px;">검색 주소 : ' + address + '</h4><br />',
                            htmlAddresses.join('<br />'),
                            '</div>'
                        ].join('\n'));

                        map.setCenter(point);
                        infoWindow.open(map, point);
                    });
                }

                function makeAddress(item: any) {
                    if (!item) {
                        return;
                    }

                    var name = item.name,
                        region = item.region,
                        land = item.land,
                        isRoadAddress = name === 'roadaddr';

                    var sido = '', sigugun = '', dongmyun = '', ri = '', rest = '';

                    if (hasArea(region.area1)) {
                        sido = region.area1.name;
                    }

                    if (hasArea(region.area2)) {
                        sigugun = region.area2.name;
                    }

                    if (hasArea(region.area3)) {
                        dongmyun = region.area3.name;
                    }

                    if (hasArea(region.area4)) {
                        ri = region.area4.name;
                    }

                    if (land) {
                        if (hasData(land.number1)) {
                            if (hasData(land.type) && land.type === '2') {
                                rest += '산';
                            }

                            rest += land.number1;

                            if (hasData(land.number2)) {
                                rest += ('-' + land.number2);
                            }
                        }

                        if (isRoadAddress === true) {
                            if (checkLastString(dongmyun, '면')) {
                                ri = land.name;
                            } else {
                                dongmyun = land.name;
                                ri = '';
                            }

                            if (hasAddition(land.addition0)) {
                                rest += ' ' + land.addition0.value;
                            }
                        }
                    }

                    return [sido, sigugun, dongmyun, ri, rest].join(' ');
                }

                function hasArea(area: any) {
                    return !!(area && area.name && area.name !== '');
                }

                function hasData(data: any) {
                    return !!(data && data !== '');
                }

                function checkLastString(word: any, lastString: any) {
                    return new RegExp(lastString + '$').test(word);
                }

                function hasAddition(addition: any) {
                    return !!(addition && addition.value);
                }
                //script3.src = `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords={입력_좌표}&sourcecrs={좌표계}&orders={변환_작업_이름}&output={출력_형식}`;
                script3.src = `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=${position.lng()},${position.lat()}&sourcecrs=epsg:4326&orders=roadaddr&output=json`;

                script3.onload = () => {
                    function searchCoordinateToAddress(latlng: any) {

                        infoWindow.close();
    
                        naver.maps.Service.reverseGeocode({
                            coords: new naver.maps.LatLng(37.3595316, 127.1052133)
                        }, function (status, response) {
                            if (status === naver.maps.Service.Status.ERROR) {
                                return alert('Something Wrong!');
                            }
    
                            var items = response.v2.results,
                                address = '',
                                htmlAddresses = [];
    
                            for (var i = 0, ii = items.length, item, addrType; i < ii; i++) {
                                item = items[i];
                                address = makeAddress(item) || '';
                                addrType = item.name === 'roadaddr' ? '[도로명 주소]' : '[지번 주소]';
    
                                htmlAddresses.push((i + 1) + '. ' + addrType + ' ' + address);
                            }
    
                            infoWindow.setContent([
                                '<div style="padding:10px;min-width:200px;line-height:150%;">',
                                '<h4 style="margin-top:5px;">검색 좌표</h4><br />',
                                htmlAddresses.join('<br />'),
                                '</div>'
                            ].join('\n'));
    
                            infoWindow.open(map, latlng);
                        })
                    }
                    

                    function initGeocoder() {
                        map.addListener('click', function (e) {
                            searchCoordinateToAddress(e.coord);
                        });

                        $('#address').on('keydown', function (e: any) {
                            var keyCode = e.which;

                            if (keyCode === 13) { // Enter Key
                                searchAddressToCoordinate($('#address').val());
                            }
                        });

                        $('#submit').on('click', function (e: any) {
                            e.preventDefault();

                            searchAddressToCoordinate($('#address').val());
                        });

                        searchAddressToCoordinate('정자동 178-1');
                    }
                    naver.maps.onJSContentLoaded = initGeocoder;
                }
            };


            document.body.appendChild(script);

            return () => {
                document.body.removeChild(script);
            };
        }
    }, []);

    return (
        <div className={'Map'}>
            <div id="map" className={'NaverMap'}></div>
        </div>
    );
}


export default Map;