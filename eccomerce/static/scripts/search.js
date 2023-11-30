$(document).ready(function() {

    function generate(trousers){
        let htmlContent = trousers.map((item) => {
            let{id,quantity,trousers_name,description,price,img} = item
            return `
            <div class="items">
                <div class="products">
                    <img src="${img}" alt="" />
                    <h3>${trousers_name}</h3>
                    <h3>${description}</h3>
                    <h5>${price}</h5>
                </div>
            </div>
            `;
            })
            .join("");
        $('.items').html(htmlContent);
    }

    function filterByName(searchTerm, trousers) {
        return trousers.filter(item => 
            item.trousers_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    function filterByPrice(maxPrice, trousers) {
        if (maxPrice === null || isNaN(maxPrice)) {
            return trousers; // No price filter applied
        }
        return trousers.filter(item => 
            item.price === maxPrice
        );
    }

    function search() {
        let searchTerm = $('#searchInput').val();
        let maxPrice = parseFloat($('#maxPriceInput').val());

        $.ajax({
            type: "GET",
            url: "http://127.0.0.1:5000/trousers",
            dataType: "json",
            success: function (data) {
                let trousers = data;
                
                let filteredByName = filterByName(searchTerm, trousers);
                let filteredByPrice = filterByPrice(maxPrice, trousers);

                // Combine the results or choose one based on your preference
                let finalFilteredResults = filteredByName.filter(item =>
                    filteredByPrice.includes(item)
                );

                generate(finalFilteredResults);
                console.log(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Error:", errorThrown);
            }
        });
    }

    $('#searchInput, #maxPriceInput').on('input', search);

    // Initial load
    search();

});
