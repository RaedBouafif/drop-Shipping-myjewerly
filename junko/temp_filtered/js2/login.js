
var button = document.getElementById("btn");
button.addEventListener("click",handleSubmit);
function handleSubmit(){
    var username = encodeURIComponent(document.getElementById("usn").value);
    var password = encodeURIComponent(document.getElementById("pwd").value);
    var formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    fetch('http://127.0.0.1/jewel-git/drop-Shipping-myjewerly/junko/temp_filtered/admin/login.php',{
        method : 'POST',
        body :formData
    }).then((res) => {
        res.json().then((data) => {
            if (data.success){
                //window.location.pathname="/index.html";
            }else{
                alert("Invalid information : please check your Username or password")
            }

        })
    });
}


