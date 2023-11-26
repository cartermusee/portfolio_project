$(function(){
    let cart = [1,2]
    // Assuming you have a div with the id "myDiv"
    $('.addToCart').click(function () {
        console.log('clcicked') 
        if (cart.length !== 0){
            $('#items').html('<h1>mop</h1>')
        }else{
            console.log('empty')
        }
    });

})