import React from 'react'
import { Link } from 'react-router-dom'
const ProductDetails = () => {
    return (
        <div className="product_details mt-60 mb-60" >
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-6">
                        <div className="product-details-tab">
                            <div id="img-1" className="zoomWrapper single-zoom">
                                <Link to="#">
                                    <img id="zoom1" src="/temp/assets/img/product/productbig5.jpg"
                                        data-zoom-image="/temp/assets/img/product/productbig5.jpg" alt="big-1" />
                                </Link>
                            </div>
                            <div className="single-zoom-thumb">
                                <ul className="s-tab-zoom owl-carousel single-product-active" id="gallery_01">
                                    <li>
                                        <Link to="#" className="elevatezoom-gallery active" data-update=""
                                            data-image="/temp/assets/img/product/productbig.jpg"
                                            data-zoom-image="/temp/assets/img/product/productbig.jpg">
                                            <img src="/temp/assets/img/product/productbig.jpg" alt="zo-th-1" />
                                        </Link>

                                    </li>
                                    <li>
                                        <Link to="#" class="elevatezoom-gallery active" data-update=""
                                            data-image="/temp/assets/img/product/productbig1.jpg"
                                            data-zoom-image="/temp/assets/img/product/productbig1.jpg">
                                            <img src="/temp/assets/img/product/productbig1.jpg" alt="zo-th-1" />
                                        </Link>

                                    </li>
                                    <li>
                                        <Link to="#" className="elevatezoom-gallery active" data-update=""
                                            data-image="/temp/assets/img/product/productbig2.jpg"
                                            data-zoom-image="/temp/assets/img/product/productbig2.jpg">
                                            <img src="/temp/assets/img/product/productbig2.jpg" alt="zo-th-1" />
                                        </Link>

                                    </li>
                                    <li>
                                        <Link to="#" className="elevatezoom-gallery active" data-update=""
                                            data-image="/temp/assets/img/product/productbig3.jpg"
                                            data-zoom-image="/temp/assets/img/product/productbig3.jpg">
                                            <img src="/temp/assets/img/product/productbig3.jpg" alt="zo-th-1" />
                                        </Link>

                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="product_d_right">
                            <form action="#">
                                <h1>Nonstick Dishwasher PFOA</h1>
                                <div className=" product_ratting">
                                    <ul>
                                        <li><Link to="#"><i className="fa fa-star"></i></Link></li>
                                        <li><Link to="#"><i className="fa fa-star"></i></Link></li>
                                        <li><Link to="#"><i className="fa fa-star"></i></Link></li>
                                        <li><Link to="#"><i className="fa fa-star"></i></Link></li>
                                        <li><Link to="#"><i className="fa fa-star"></i></Link></li>
                                        <li className="review"><a href="#"> (customer review ) </a></li>
                                    </ul>

                                </div>
                                <div className="price_box">
                                    <span className="current_price">$70.00</span>
                                    <span className="old_price">$80.00</span>

                                </div>
                                <div className="product_desc">
                                    <p>eget velit. Donec ac tempus ante. Fusce ultricies massa massa. Fusce aliquam, purus
                                        eget sagittis vulputate, sapien libero hendrerit est, sed commodo augue nisi non
                                        neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor, lorem et
                                        placerat vestibulum, metus nisi posuere nisl, in </p>
                                </div>
                                <div className="product_variant color">
                                    <h3>Available Options</h3>
                                    <label>color</label>
                                    <ul>
                                        <li className="color1"><Link to="#"></Link></li>
                                        <li className="color2"><Link to="#"></Link></li>
                                        <li className="color3"><Link to="#"></Link></li>
                                        <li className="color4"><Link to="#"></Link></li>
                                    </ul>
                                </div>
                                <div className="product_variant quantity">
                                    <label>quantity</label>
                                    <input min="1" max="100" value="1" type="number" />
                                    <button className="button" type="submit">add to cart</button>
                                </div>
                                <div className=" product_d_action">
                                    <ul>
                                        <li><Link to="#" title="Add to wishlist">+ Add to Wishlist</Link></li>
                                        <li><Link to="#" title="Add to wishlist">+ Compare</Link></li>
                                    </ul>
                                </div>
                                <div className="product_meta">
                                    <span>Category: <Link to="#">Clothing</Link></span>
                                </div>
                            </form>
                            <div className="priduct_social">
                                <ul>
                                    <li><Link className="facebook" to="#" title="facebook"><i className="fa fa-facebook"></i>
                                        Like</Link></li>
                                    <li><Link className="twitter" to="#" title="twitter"><i className="fa fa-twitter"></i> tweet</Link>
                                    </li>
                                    <li><Link className="pinterest" to="#" title="pinterest"><i className="fa fa-pinterest"></i>
                                        save</Link></li>
                                    <li><Link className="google-plus" to="#" title="google +"><i className="fa fa-google-plus"></i>
                                        share</Link></li>
                                    <li><Link className="linkedin" to="#" title="linkedin"><i className="fa fa-linkedin"></i>
                                        linked</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}


export default ProductDetails
