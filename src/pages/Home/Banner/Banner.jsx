import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import img1 from '../../../assets/home/01.jpg'
import img2 from '../../../assets/home/02.jpg'
import img3 from '../../../assets/home/03.png'
import img4 from '../../../assets/home/04.jpg'
import img5 from '../../../assets/home/05.png'
import img6 from '../../../assets/home/06.png'


const Banner = () => {
    return (
        <Carousel
            autoPlay={true}        // Enable autoplay
            interval={2300}        // Set the delay to 2 seconds (2000 milliseconds)
            infiniteLoop={true}    // Infinite loop so it keeps rotating
            showThumbs={false}     // Hide the thumbs (optional, you can remove this line if you want them)
            transitionTime={500}   // Time to transition between slides
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
                <img src={img6} />
            </div>
        </Carousel>
    );
};

export default Banner;