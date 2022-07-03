const getId = () => {
    var params = window.location.search.split("?")[1]
    return params.split("=")[1]
}
fetch("http://127.0.0.1/jewel-git/drop-Shipping-myjewerly/temp_filtered/admin/products.php?id_order="+getId())
.then( (res) => {
    res.json().then( (data) =>{
        data.forEach(element => {
            document.getElementById("cont").innerHTML+=`<tr class="odd" role="row">
                                                            <td class="sorting_1">${element.sku}</td>
                                                            <td>${element.name}</td>
                                                            <td>${element.price}</td>
                                                            <td>${element.quantity}</td>
                                                            <td>${element.size}</td>
                                                            <td>${element.color}/11/28</td>
                                                            <td>${element.len}</td>
                                                            <td>${element.ring_size}</td>
                                                            <td><button class="del_button" onclick="deleteProduct(this);">Delete</button></td>
                                                        </tr>`
        });
    })
})



const deleteProduct = (element) => {
    element.parentNode.parentNode.style.display = "none"
}
