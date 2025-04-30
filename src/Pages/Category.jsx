import React from 'react'
import '../PagesStyle/Category.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CategorySlider from 'react-slick';
import CetegoryOne from '/assets/img/one.jpg'
import CetegoryTwo from '/assets/img/one.jpg'
import CetegoryThree from '/assets/img/one.jpg'
import CetegoryFour from '/assets/img/one.jpg'
import { Link } from 'react-router-dom';

const imagesArr = [
    {
        CetegorySrc: CetegoryOne,
        toysName: "clock",
    },
    {
        CetegorySrc: CetegoryTwo,
        toysName: "earrings",
    },
    {
        CetegorySrc: CetegoryThree,
        toysName: "name plate",
    },
    {
        CetegorySrc: CetegoryFour,
        toysName: "Photo frame",
    }
];

const mainSliderSettings = {
    autoplay: true,
    autoplaySpeed: 3000,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 768,
            settings: {
                arrows: false,
                slidesToShow: 3,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 480,
            settings: {
                arrows: false,
                slidesToShow: 2,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 320,
            settings: {
                arrows: false,
                slidesToShow: 2,
                slidesToScroll: 1,
            }
        },
    ]

};
const Category = () => {
    return (
        <>
            <div className="py-5 container">
                <div>
                    <h2 className=' text-center category-section mb-4 text-font-famliy fw-bold'>Shop by Category</h2>
                    <CategorySlider {...mainSliderSettings} >
                        {imagesArr.map((ValueData, index) => (
                            <div key={index}>
                                <Link className='text-decoration-none'>
                                    <div className="d-flex justify-content-center align-items-center ">
                                        <div>
                                            <div className='categoryimg-border'>
                                                <img className=' img-cetgery-padding custom-width-img ' src={ValueData.CetegorySrc} alt="" />
                                            </div>
                                            <p className='text-center text-dark mt-4 text-font-famliy fs-3 text-capitalize'>{ValueData.toysName}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </CategorySlider>
                </div>
            </div>
        </>
    )
}

export default Category