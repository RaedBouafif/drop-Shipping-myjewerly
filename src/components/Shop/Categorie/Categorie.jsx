import React from 'react'

const Categorie = () => {


    return (
        <aside class="sidebar_widget t-w-3/12">
            <div class="widget_inner">
                <div class="widget_list widget_categories">
                    <h2>Product categories</h2>
                    <ul>
                        <li><a href="#">Cameras & Camcoders</a></li>
                        <li class="widget_sub_categories"><a href="javascript:void(0)">Computer &
                            Networking</a>
                            <ul class="widget_dropdown_categories">
                                <li><a href="#">Computer</a></li>
                                <li><a href="#">Networking</a></li>
                            </ul>
                        </li>
                        <li><a href="#">Games & Consoles</a></li>
                        <li><a href="#">Headphone & Speaker</a></li>
                        <li><a href="#">Movies & Video Games</a></li>
                        <li><a href="#">Smartphone</a> </li>
                        <li><a href="#">Uncategorized</a></li>
                    </ul>
                </div>
                <div class="widget_list widget_filter">
                    <h2>Filter by price</h2>
                    <form action="#">
                        <div id="slider-range"></div>
                        <button type="submit">Filter</button>
                        <input type="text" name="text" id="amount" />
                    </form>
                </div>

            </div>
        </aside>
    )
}

export default Categorie