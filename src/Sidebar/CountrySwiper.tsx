import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import './CountrySwiper.scss';

const CountrySwiper = ({comments}:{comments?: string[][]}) => {
    return (
        <>
            <Swiper 
                direction={'vertical'}
                navigation={true}
                autoplay = {true}
                modules={[ Autoplay]}
                className={'CountrySwiper'}
                mousewheel={true}
                loop={true}
            >
                {
                    comments?.map(([comment, grade, num]) => 
                        <SwiperSlide key={comment}>
                            {comment}
                            <span className={ 
                                (num === '1' || num === '2') ? 'blue' 
                                : num === '3' ? 'darkgoldenrod' : 'red'
                                }>{grade}</span>
                        </SwiperSlide>
                    )
                }
            </Swiper>
            <div className={'Box'}></div>
        </>
    )
}

export default CountrySwiper;