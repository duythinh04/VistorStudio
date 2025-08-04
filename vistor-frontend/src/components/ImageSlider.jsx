import React from "react";
import Slider from "react-slick";

const images= [
    "/image/sliders/slider1.jpg",
    "/image/sliders/slider2.jpg",
    "/image/sliders/slider3.jpg",
    "/image/sliders/slider4.jpg",
    "/image/sliders/slider5.jpg",
    "/image/sliders/slider6.jpg",
    "/image/sliders/slider7.jpg",
    "/image/sliders/slider8.jpg",
    "/image/sliders/slider9.jpg",
    "/image/sliders/slider10.jpg",
    "/image/sliders/slider11.png",
    "/image/sliders/slider12.jpg",
    "/image/sliders/slider13.png",
    "/image/sliders/slider14.jpg",
    "/image/sliders/slider115.jpg",
]
function ImageSlider(){
    const settings = {
        dots:true,
        infinite:true,
        autoplay: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };
    return (
        <div className="w-100">
      <Slider {...settings}>
        {images.map((src, idx) => (
          <div key={idx}>
            <img src={src} alt={`Slide ${idx + 1}`} className="img-fluid mx-auto d-block" style={{ maxHeight: '700px', objectFit: 'cover', width: '60%' }} />
          </div>
        ))}
      </Slider>
    </div>
    )
}
export default ImageSlider;