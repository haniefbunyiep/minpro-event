'use client';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';

export const CarouselPage = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <div>
      <Slider {...settings}>
        <div className="slider-container">
          <Image
            src={'/b1.jpg'}
            alt="Heptatix"
            className="mobile:h-[150px] w-[100vw] rounded-lg sm:h-[300px] lg:h-[500px]"
            width={10000}
            height={10000}
            quality={100}
            priority={true}
          />
        </div>
        <div>
          <Image
            src={'/b2.jpg'}
            alt="Heptatix"
            className="mobile:h-[150px] w-[100vw] rounded-lg sm:h-[300px] lg:h-[500px]"
            width={10000}
            height={10000}
            quality={100}
            priority={true}
          />
        </div>
        <div>
          <Image
            src={'/b3.jpg'}
            alt="Heptatix"
            className="mobile:h-[150px] w-[100vw] rounded-lg sm:h-[300px] lg:h-[500px]"
            width={10000}
            height={10000}
            quality={100}
            priority={true}
          />
        </div>
        <div>
          <Image
            src={'/b4.jpg'}
            alt="Heptatix"
            className="mobile:h-[150px] w-[100vw] rounded-lg sm:h-[300px] lg:h-[500px]"
            width={10000}
            height={10000}
            quality={100}
            priority={true}
          />
        </div>
        <div>
          <Image
            src={'/b5.jpg'}
            alt="Heptatix"
            className="mobile:h-[150px] w-[100vw] rounded-lg sm:h-[300px] lg:h-[500px]"
            width={10000}
            height={10000}
            quality={100}
            priority={true}
          />
        </div>
      </Slider>
    </div>
  );
};
