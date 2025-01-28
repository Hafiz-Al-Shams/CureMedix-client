import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import img1 from '../../../assets/home/01.png'
import img2 from '../../../assets/home/02.png'
import img3 from '../../../assets/home/03.png'
import img4 from '../../../assets/home/04.png'
import img5 from '../../../assets/home/05.png'


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
                <img src={img3} />
            </div>
            <div>
                <img src={img4} />
            </div>
            <div>
                <img src={img5} />
            </div>
            <div>
                <img src={img3} />
            </div>
        </Carousel>
    );
};

export default Banner;