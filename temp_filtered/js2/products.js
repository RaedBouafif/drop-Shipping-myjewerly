
const getId = () => {
    var params = window.location.search.split("?")[1]
    return params.split("=")[1]
}
console.log(getId())