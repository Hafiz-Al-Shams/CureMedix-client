import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

// import img1 from '../../../assets/home/01.png'
// import img2 from '../../../assets/home/02.png'
// import img3 from '../../../assets/home/03.png'
// import img4 from '../../../assets/home/04.png'
// import img5 from '../../../assets/home/05.png'


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
                <img src="https://i.ibb.co.com/2kHCxZ5/01.png" alt="" />
            </div>
            <div>
                <img src="https://i.ibb.co.com/16TbRKP/02.png" />
            </div>
            <div>
                <img src="https://i.ibb.co.com/20rbCZ2/03.png" />
            </div>
            <div>
                <img src="https://i.ibb.co.com/4MVyHhj/04.png" />
            </div>
            <div>
                <img src="https://i.ibb.co.com/tmx4vZ1/05.png" />
            </div>
            <div>
                <img src="https://i.ibb.co.com/20rbCZ2/03.png" />
            </div>
        </Carousel>
    );
};

export default Banner;