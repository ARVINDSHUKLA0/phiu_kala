import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../Components/Navbar';
import '../PagesStyle/FilterCategory.css';
import Footer from '../Components/Footer';
import Product from '../Api/Product';
import { Link, useParams } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import { AddtoCartWarpper } from '../Context/AddToCartContext';
import { WisListdata } from '../Context/WislistContext';

const FilterCategory = () => {
    const { addToCartFunc } = useContext(AddtoCartWarpper)
    const { WislistFunc } = useContext(WisListdata)
    const { categoryName } = useParams();
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 16;

    useEffect(() => {
        const filtered = Product.filter(
            (p) => p.categoryName && p.categoryName.toLowerCase() === categoryName.toLowerCase()
        );
        setFilteredProducts(filtered);
    }, [categoryName]);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const currentProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePagination = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    return (
        <>
            <Navbar />
            <section className="CatFilter text-center my-4"></section>

            <section className="my-5 container">
                <p className='fs-1 text-font-famliy'>{categoryName}</p>
                <div className="row">
                    {currentProducts.length > 0 ? (
                        currentProducts.map((prod, index) => (
                            <div
                                className="col-lg-3 col-md-4 col-sm-6 col-6 product-item position-relative text-center overflow-hidden cursor-pointer"
                                key={index}
                            >
                                <div className="bg-light mb-3 mx-2 rounded-5">
                                    <div className="position-relative overflow-hidden">
                                        <div className="cutom-limit-height px-2">
                                            <Link to={`/productbuy/${prod.id}`} className="text-decoration-none">
                                                <img className="img-fluid" src={prod.thumbnailImage} alt="Image" />
                                            </Link>
                                        </div>
                                        <div className="position-absolute product-wrapper d-flex align-items-center justify-content-center">
                                            <span className="d-flex align-items-center h-100">
                                                <h3 className="main-bg-color text-white mb-0 rounded-2 h-100 px-lg-3 px-2 pt-1 text-uppercase fs-small">Quick Look</h3>
                                                <Link onClick={() => WislistFunc(prod.id)}>
                                                    <i className="fa-regular fa-heart h-100 custom-padding-icon-heart bg-dark text-white fs-mediam-font-size rounded-2 "></i>
                                                </Link>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="item-product-menu">
                                        <p className="mb-2 text-uppercase text-dark mt-3 custom-font-size-and-weight px-2 fw-bold">basket with handles Lorem </p>
                                        <div className="product-btn-price w-100 position-relative overflow-x-hidden ">
                                            <div className="position-absolute top-0 w-100 text-center product-add-cart" onClick={() => addToCartFunc(prod.id)}>
                                                <button className="border-0 text-uppercase btn-content bg-white custom-font-size-and-weight">
                                                    add to cart
                                                </button>
                                            </div>
                                            <div className="w-100 text-center position-absolute top-0 product-price custom-font-size-and-weight text-dark">
                                                &#x20B9; {prod.price}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No products found in this category.</p>
                    )}
                </div>

                {/* Pagination */}
                <Pagination className="justify-content-center">
                    <Pagination.First onClick={() => handlePagination(1)} disabled={currentPage === 1} />
                    <Pagination.Prev
                        onClick={() => handlePagination(currentPage - 1)}
                        disabled={currentPage === 1}
                    />
                    <Pagination.Item>{currentPage}</Pagination.Item>
                    <Pagination.Next
                        onClick={() => handlePagination(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    />
                    <Pagination.Last onClick={() => handlePagination(totalPages)} disabled={currentPage === totalPages} />
                </Pagination>
            </section>

            <Footer />
        </>
    );
};

export default FilterCategory;
