import React from 'react'
const Shop = () => {
    const handleShowChilds = (e) => {
        const thchild = e.target.parentNode.childNodes[2]
        if (!e.target.classList.contains("t-rotate-90")) {
            e.target.classList.add("t-rotate-90")
        } else {
            e.target.classList.remove("t-rotate-90")
        }
        if (thchild.style.display == "flex") {
            thchild.style.display = "none"
        }
        else {
            thchild.style.display = "flex"
        }
    }
    return (
        <div className='t-flex t-mt-20 t-items-start'>
            <aside class="sidebar_widget t-static lg:t-flex t-hidden t-ml-14 t-mt-14">
                <div class="widget_inner">
                    <div class="widget_list widget_categories t-w-72">
                        <h2>Product categories</h2>
                        <ul>
                            <div className='t-flex t-w-full t-border-b py-2 t-flex-wrap t-items-center'>
                                <div className='t-cursor-pointer hover:t-text-blue-500 hover:t-scale-105 hover:t-text-blue' >Video Games</div>
                                <p onClick={handleShowChilds} className='t-cursor-pointer t-duration-150 t-select-none t-ml-auto t-text-xl'>{">"}</p>
                                <div className='t-hidden t-flex-col t-ml-10 t-mt-1 t-space-y-2 t-flex-none t-w-full'>
                                    <div className='t-flex hover:t-text-blue-500 t-cursor-pointer t-w-full t-items-center'>
                                        <div className='hover:t-scale-105'>Video Games</div>
                                    </div>
                                    <div className='t-flex hover:t-text-blue-500 t-cursor-pointer t-w-full t-items-center'>
                                        <div className='hover:t-scale-105'>Video Games</div>
                                    </div>
                                    <div className='t-flex hover:t-text-blue-500 t-cursor-pointer t-w-full t-items-center'>
                                        <div className='hover:t-scale-105'>Video Games</div>
                                    </div>
                                </div>
                            </div>

                        </ul>
                    </div>
                </div >
            </aside >
            <div className='t-z-0 t-relative t-top-14 t-mx-auto t-w-11/12 lg:t-w-7/12'>
                <div style={{ zIndex: 0 }} class="shop_toolbar_wrapper">
                    <div class="shop_toolbar_btn">


                    </div>
                    <div class=" niceselect_option">
                        <form class="t-border t-p-2 t-rounded-md" action="#">
                            <select name="orderby" id="short">
                                <option selected value="1">Sort by average rating</option>
                                <option value="2">Sort by popularity</option>
                                <option value="3">Sort by newness</option>
                                <option value="4">Sort by price: low to high</option>
                                <option value="5">Sort by price: high to low</option>
                                <option value="6">Product Name: Z</option>
                            </select>
                        </form>
                    </div>
                    <div class="page_amount">
                        <p>Showing 1–9 of 21 results</p>
                    </div>
                </div>


                <div className='t-flex t-flex-wrap t-mb-16'>
                    <article class="single_product t-w-4/12">
                        <figure>
                            <div class="product_thumb">
                                <a class="primary_img" href="product-details.html"><img
                                    src="/temp/assets/img/product/product13.jpg" alt="" /></a>
                                <a class="secondary_img" href="product-details.html"><img
                                    src="/temp/assets/img/product/product14.jpg" alt="" /></a>
                                <div class="add_to_cart">
                                    <a href="cart.html" title="add to cart">Add to cart</a>
                                </div>
                            </div>
                            <div class="product_content grid_content">
                                <div class="price_box t-mb-10">
                                    <span class="old_price">$86.00</span>
                                    <span class="current_price">$79.00</span>
                                </div>
                                <h3 class="product_name grid_name"><a href="product-details.html">Donec tempus
                                    pretium arcu et faucibus commodo</a></h3>
                            </div>
                            <div class="product_content list_content">
                                <div class="left_caption">
                                    <div class="price_box">
                                        <span class="old_price">$86.00</span>
                                        <span class="current_price">$79.00</span>
                                    </div>
                                    <h3 class="product_name"><a href="product-details.html">Donec tempus pretium
                                        arcu et faucibus commodo</a></h3>
                                    <div class="product_ratings">
                                        <ul>
                                            <li><a href="#"><i class="ion-android-star-outline"></i></a></li>
                                            <li><a href="#"><i class="ion-android-star-outline"></i></a></li>
                                            <li><a href="#"><i class="ion-android-star-outline"></i></a></li>
                                            <li><a href="#"><i class="ion-android-star-outline"></i></a></li>
                                            <li><a href="#"><i class="ion-android-star-outline"></i></a></li>
                                        </ul>
                                    </div>
                                    <div class="product_desc">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                                            ad minim veniam, quis nostrud exercitation ullamco,Proin lectus
                                            ipsum, gravida et mattis vulputate, tristique ut lectus</p>
                                    </div>
                                </div>
                                <div class="right_caption">
                                    <div class="add_to_cart">
                                        <a href="cart.html" title="add to cart">Add to cart</a>
                                    </div>
                                    <div class="action_links">
                                        <ul>
                                            <li class="wishlist"><a href="wishlist.html"
                                                title="Add to Wishlist"><i class="fa fa-heart-o"
                                                    aria-hidden="true"></i> Add to Wishlist</a></li>
                                            <li class="compare"><a href="#" title="compare"><span
                                                class="ion-levels"></span> Compare</a></li>
                                            <li class="quick_button"><a href="#" data-bs-toggle="modal"
                                                data-bs-target="#modal_box" title="quick view"> <span
                                                    class="ion-ios-search-strong"></span> Quick View</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </figure>
                    </article><article class="single_product t-w-4/12">
                        <figure>
                            <div class="product_thumb">
                                <a class="primary_img" href="product-details.html"><img
                                    src="/temp/assets/img/product/product13.jpg" alt="" /></a>
                                <a class="secondary_img" href="product-details.html"><img
                                    src="/temp/assets/img/product/product14.jpg" alt="" /></a>
                                <div class="add_to_cart">
                                    <a href="cart.html" title="add to cart">Add to cart</a>
                                </div>
                            </div>
                            <div class="product_content grid_content">
                                <div class="price_box t-mb-10">
                                    <span class="old_price">$86.00</span>
                                    <span class="current_price">$79.00</span>
                                </div>
                                <h3 class="product_name grid_name"><a href="product-details.html">Donec tempus
                                    pretium arcu et faucibus commodo</a></h3>
                            </div>
                            <div class="product_content list_content">
                                <div class="left_caption">
                                    <div class="price_box">
                                        <span class="old_price">$86.00</span>
                                        <span class="current_price">$79.00</span>
                                    </div>
                                    <h3 class="product_name"><a href="product-details.html">Donec tempus pretium
                                        arcu et faucibus commodo</a></h3>
                                    <div class="product_ratings">
                                        <ul>
                                            <li><a href="#"><i class="ion-android-star-outline"></i></a></li>
                                            <li><a href="#"><i class="ion-android-star-outline"></i></a></li>
                                            <li><a href="#"><i class="ion-android-star-outline"></i></a></li>
                                            <li><a href="#"><i class="ion-android-star-outline"></i></a></li>
                                            <li><a href="#"><i class="ion-android-star-outline"></i></a></li>
                                        </ul>
                                    </div>
                                    <div class="product_desc">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                                            ad minim veniam, quis nostrud exercitation ullamco,Proin lectus
                                            ipsum, gravida et mattis vulputate, tristique ut lectus</p>
                                    </div>
                                </div>
                                <div class="right_caption">
                                    <div class="add_to_cart">
                                        <a href="cart.html" title="add to cart">Add to cart</a>
                                    </div>
                                    <div class="action_links">
                                        <ul>
                                            <li class="wishlist"><a href="wishlist.html"
                                                title="Add to Wishlist"><i class="fa fa-heart-o"
                                                    aria-hidden="true"></i> Add to Wishlist</a></li>
                                            <li class="compare"><a href="#" title="compare"><span
                                                class="ion-levels"></span> Compare</a></li>
                                            <li class="quick_button"><a href="#" data-bs-toggle="modal"
                                                data-bs-target="#modal_box" title="quick view"> <span
                                                    class="ion-ios-search-strong"></span> Quick View</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </figure>
                    </article><article class="single_product t-w-4/12">
                        <figure>
                            <div class="product_thumb">
                                <a class="primary_img" href="product-details.html"><img
                                    src="/temp/assets/img/product/product13.jpg" alt="" /></a>
                                <a class="secondary_img" href="product-details.html"><img
                                    src="/temp/assets/img/product/product14.jpg" alt="" /></a>
                                <div class="add_to_cart">
                                    <a href="cart.html" title="add to cart">Add to cart</a>
                                </div>
                            </div>
                            <div class="product_content grid_content">
                                <div class="price_box t-mb-10">
                                    <span class="old_price">$86.00</span>
                                    <span class="current_price">$79.00</span>
                                </div>
                                <h3 class="product_name grid_name"><a href="product-details.html">Donec tempus
                                    pretium arcu et faucibus commodo</a></h3>
                            </div>
                            <div class="product_content list_content">
                                <div class="left_caption">
                                    <div class="price_box">
                                        <span class="old_price">$86.00</span>
                                        <span class="current_price">$79.00</span>
                                    </div>
                                    <h3 class="product_name"><a href="product-details.html">Donec tempus pretium
                                        arcu et faucibus commodo</a></h3>
                                    <div class="product_ratings">
                                        <ul>
                                            <li><a href="#"><i class="ion-android-star-outline"></i></a></li>
                                            <li><a href="#"><i class="ion-android-star-outline"></i></a></li>
                                            <li><a href="#"><i class="ion-android-star-outline"></i></a></li>
                                            <li><a href="#"><i class="ion-android-star-outline"></i></a></li>
                                            <li><a href="#"><i class="ion-android-star-outline"></i></a></li>
                                        </ul>
                                    </div>
                                    <div class="product_desc">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                                            ad minim veniam, quis nostrud exercitation ullamco,Proin lectus
                                            ipsum, gravida et mattis vulputate, tristique ut lectus</p>
                                    </div>
                                </div>
                                <div class="right_caption">
                                    <div class="add_to_cart">
                                        <a href="cart.html" title="add to cart">Add to cart</a>
                                    </div>
                                    <div class="action_links">
                                        <ul>
                                            <li class="wishlist"><a href="wishlist.html"
                                                title="Add to Wishlist"><i class="fa fa-heart-o"
                                                    aria-hidden="true"></i> Add to Wishlist</a></li>
                                            <li class="compare"><a href="#" title="compare"><span
                                                class="ion-levels"></span> Compare</a></li>
                                            <li class="quick_button"><a href="#" data-bs-toggle="modal"
                                                data-bs-target="#modal_box" title="quick view"> <span
                                                    class="ion-ios-search-strong"></span> Quick View</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </figure>
                    </article><article class="single_product t-w-4/12">
                        <figure>
                            <div class="product_thumb">
                                <a class="primary_img" href="product-details.html"><img
                                    src="/temp/assets/img/product/product13.jpg" alt="" /></a>
                                <a class="secondary_img" href="product-details.html"><img
                                    src="/temp/assets/img/product/product14.jpg" alt="" /></a>
                                <div class="add_to_cart">
                                    <a href="cart.html" title="add to cart">Add to cart</a>
                                </div>
                            </div>
                            <div class="product_content grid_content">
                                <div class="price_box t-mb-10">
                                    <span class="old_price">$86.00</span>
                                    <span class="current_price">$79.00</span>
                                </div>
                                <h3 class="product_name grid_name"><a href="product-details.html">Donec tempus
                                    pretium arcu et faucibus commodo</a></h3>
                            </div>
                            <div class="product_content list_content">
                                <div class="left_caption">
                                    <div class="price_box">
                                        <span class="old_price">$86.00</span>
                                        <span class="current_price">$79.00</span>
                                    </div>
                                    <h3 class="product_name"><a href="product-details.html">Donec tempus pretium
                                        arcu et faucibus commodo</a></h3>
                                    <div class="product_ratings">
                                        <ul>
                                            <li><a href="#"><i class="ion-android-star-outline"></i></a></li>
                                            <li><a href="#"><i class="ion-android-star-outline"></i></a></li>
                                            <li><a href="#"><i class="ion-android-star-outline"></i></a></li>
                                            <li><a href="#"><i class="ion-android-star-outline"></i></a></li>
                                            <li><a href="#"><i class="ion-android-star-outline"></i></a></li>
                                        </ul>
                                    </div>
                                    <div class="product_desc">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                                            ad minim veniam, quis nostrud exercitation ullamco,Proin lectus
                                            ipsum, gravida et mattis vulputate, tristique ut lectus</p>
                                    </div>
                                </div>
                                <div class="right_caption">
                                    <div class="add_to_cart">
                                        <a href="cart.html" title="add to cart">Add to cart</a>
                                    </div>
                                    <div class="action_links">
                                        <ul>
                                            <li class="wishlist"><a href="wishlist.html"
                                                title="Add to Wishlist"><i class="fa fa-heart-o"
                                                    aria-hidden="true"></i> Add to Wishlist</a></li>
                                            <li class="compare"><a href="#" title="compare"><span
                                                class="ion-levels"></span> Compare</a></li>
                                            <li class="quick_button"><a href="#" data-bs-toggle="modal"
                                                data-bs-target="#modal_box" title="quick view"> <span
                                                    class="ion-ios-search-strong"></span> Quick View</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </figure>
                    </article><article class="single_product t-w-4/12">
                        <figure>
                            <div class="product_thumb">
                                <a class="primary_img" href="product-details.html"><img
                                    src="/temp/assets/img/product/product13.jpg" alt="" /></a>
                                <a class="secondary_img" href="product-details.html"><img
                                    src="/temp/assets/img/product/product14.jpg" alt="" /></a>
                                <div class="add_to_cart">
                                    <a href="cart.html" title="add to cart">Add to cart</a>
                                </div>
                            </div>
                            <div class="product_content grid_content">
                                <div class="price_box t-mb-10">
                                    <span class="old_price">$86.00</span>
                                    <span class="current_price">$79.00</span>
                                </div>
                                <h3 class="product_name grid_name"><a href="product-details.html">Donec tempus
                                    pretium arcu et faucibus commodo</a></h3>
                            </div>
                            <div class="product_content list_content">
                                <div class="left_caption">
                                    <div class="price_box">
                                        <span class="old_price">$86.00</span>
                                        <span class="current_price">$79.00</span>
                                    </div>
                                    <h3 class="product_name"><a href="product-details.html">Donec tempus pretium
                                        arcu et faucibus commodo</a></h3>
                                    <div class="product_ratings">
                                        <ul>
                                            <li><a href="#"><i class="ion-android-star-outline"></i></a></li>
                                            <li><a href="#"><i class="ion-android-star-outline"></i></a></li>
                                            <li><a href="#"><i class="ion-android-star-outline"></i></a></li>
                                            <li><a href="#"><i class="ion-android-star-outline"></i></a></li>
                                            <li><a href="#"><i class="ion-android-star-outline"></i></a></li>
                                        </ul>
                                    </div>
                                    <div class="product_desc">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                                            ad minim veniam, quis nostrud exercitation ullamco,Proin lectus
                                            ipsum, gravida et mattis vulputate, tristique ut lectus</p>
                                    </div>
                                </div>
                                <div class="right_caption">
                                    <div class="add_to_cart">
                                        <a href="cart.html" title="add to cart">Add to cart</a>
                                    </div>
                                    <div class="action_links">
                                        <ul>
                                            <li class="wishlist"><a href="wishlist.html"
                                                title="Add to Wishlist"><i class="fa fa-heart-o"
                                                    aria-hidden="true"></i> Add to Wishlist</a></li>
                                            <li class="compare"><a href="#" title="compare"><span
                                                class="ion-levels"></span> Compare</a></li>
                                            <li class="quick_button"><a href="#" data-bs-toggle="modal"
                                                data-bs-target="#modal_box" title="quick view"> <span
                                                    class="ion-ios-search-strong"></span> Quick View</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </figure>
                    </article>
                </div>
            </div>
        </div>

    )
}

export default Shop