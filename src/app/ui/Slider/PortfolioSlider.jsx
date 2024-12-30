import React from 'react';
import Portfolio from '../Portfolio';
import Div from '../Div';
import Slider from 'react-slick';

export default function PortfolioSlider({ data }) {


  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "red" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green",width:"500px",height:"500px" }}
        onClick={onClick}
      />
    );
  }


  /** Slider Settings **/
  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '0',
    slidesToShow: 3,
    speed: 500,
    dots: false,
    arrows: true,
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings} className="cs-slider cs-style3 cs-gap-24">
      {data?.map((item, index) => (
        <Div key={index}>
          <Portfolio
            title={item.name}
            subtitle={item.subtitle || ''}
            href={`/portfolio/${item?._id}`}
            src={item?.files[0]?.url || '/images/portfolio_4.jpeg'}
          />
        </Div>
      ))}
    </Slider>
  );
}
