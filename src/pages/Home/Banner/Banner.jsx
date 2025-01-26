import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import img1 from '../../../assets/home/01.jpg'
import img2 from '../../../assets/home/02.jpg'


const Banner = () => {
    return (
        <Carousel
            autoPlay={true}
            interval={2000}
            infiniteLoop={true}
            showThumbs={false}
            transitionTime={500}
        >
            <div>
                <img src={img1} alt="" />
            </div>
            <div>
                <img src={img2} />
            </div>
            <div>
                <img src={img1} />
            </div>
            <div>
                <img src={img2} />
            </div>
            <div>
                <img src={img1} />
            </div>
            <div>
                <img src={img2} />
            </div>
        </Carousel>
    );
};

export default Banner;