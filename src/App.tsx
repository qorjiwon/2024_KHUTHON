import './App.scss';
import Score from 'Sidebar/Score';
import { Graph } from 'Sidebar/Graph';
import Map from 'Component/Map';
import { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import CountrySwiper from 'Sidebar/CountrySwiper';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const location = ['경기 성남시 분당구', '경기 성남시 분당구', 
                    '경기 수원시 영통구', '경기 수원시 영통구', 
                    '부산 해운대구', '부산 해운대구', '부산 해운대구']

const water = [18.2, 18.2, 15.6, 15.6, 35.7, 35.7, 35.7]
const ground = [60.7, 60.7, 57.5, 57.5, 31.9, 31.9, 31.9]
const air = [119.2, 119.2, 69.9, 69.9, 122.0, 122.0, 122.0]
const Texts = ['현재', 'N년 후']
const Comments = [[['마셔도 괜찮은 ', '1급수💦', '1'], ['흙탕물이에요 ', '3급수💨', '3']], [['마셔도 괜찮은 ', '1급수💦', '1'], ['마시면 위험해요 ', '3급수💨', '3']],
[['마셔도 괜찮은 ', '1급수💦', '1'], ['마시면 위험해요 ', '3급수💨', '3']], [['마셔도 괜찮은 ', '1급수💦', '1'], ['마시면 위험해요 ', '3급수💨', '3']],
[['물놀이가 가능한 ', '2급수💦', '2'], ['마시면 위험해요 ', '4급수🫢', '4']],[['물놀이가 가능한 ', '2급수💦', '2'], ['마시면 위험해요 ', '4급수🫢', '4']],[['물놀이가 가능한 ', '2급수💦', '2'], ['마시면 위험해요 ', '4급수🫢', '4']]]

const App = () => {
    const [Loc, setLoc] = useState(0);
    const [position, setPosition] = useState({ x: 805, y: 465 });

    const totalScore = Math.floor((water[Loc]+air[Loc]+ground[Loc])/3);
    const expectScore = Math.floor(totalScore*1.2);

    const handleWrapper = (event: React.DragEvent<HTMLDivElement>) => {
        setLoc((prev) => prev + 1);
        setPosition({
            x: event.clientX,
            y: event.clientY
        })
    }

    return (
        <div className="App">
            {location[Loc] &&
                <div className={'Marker'} style={{ top: position.y - 40, left: position.x - 20 }}>
                    <img src="https://map.pstatic.net/resource/api/v2/image/maps/selected-marker/default.png?version=8"></img>
                </div>
            }
            <div className={'Sidebar'}>
                <div className={'Header'}>
                    <div className={'Location'}>{ location[Loc] && <>{location[Loc]}<GpsFixedIcon/></>}</div>
                    <CloseIcon/>
                </div>
                <div className="TotalScore">
                    {'현재 오염도 총점'}
                    <span className={`ScoreValue ${totalScore < 35? 'blue' : totalScore < 65 ? 'chocolate' : 'red'}`}>{totalScore}</span>
                </div>
                <div className="TotalScore">
                    {'2025년 5월 예상 오염도'}
                    <span className="ScoreValue Expect"><span style={{color: 'red'}}>{expectScore}</span><span>{`(${expectScore-totalScore > 0 ? '+':''}${expectScore-totalScore})`}</span></span>
                </div>
                <Graph pollution={[air[Loc], water[Loc], ground[Loc]]}/>
                <Score pollution={[['대기', air[Loc]], ['수질', water[Loc]], ['토양', ground[Loc]]]}/>
                <div className={'Comment'}>
                    <div className={'Top'}>
                        <Swiper 
                            direction={'vertical'}
                            navigation={true}
                            autoplay = {true}
                            modules={[Autoplay]}
                            className={'TextSwiper'}
                            mousewheel={true}
                            loop={true}
                        >
                            {
                                Texts.map((text) => 
                                    <SwiperSlide key={text}>
                                        {text}
                                    </SwiperSlide>
                                )
                            }
                        </Swiper>
                        <span className={'Now'}>{'수질은'}</span>
                    </div>
                    <CountrySwiper comments={Comments[Loc]}/>
                </div>
                <button className={'Close'}><ArrowBackIosIcon/></button>
            </div>
            <Map onClick={handleWrapper} />
        </div>
    )
}

export default App;