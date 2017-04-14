$( document ).ready(function() {
    // totle product in cart
    if ($.cookie('order')) {
        var readOrder = JSON.parse($.cookie('order'));
        $('.cartitem').html(readOrder.length);
    }

    // Add product in cart
    $( '.add_to_cart' ).on('click', function() {
        var productColor    = $('.product_box .color li.selected span').text(),
            productSize     = $('.product_box .size li.selected span').text(),
            productQty      = $('.product_box .qty li.selected span').text(),
            id              = $('.product_box #id').text();
        var order = [];

        if (!!$.cookie('order')) {
            var order = JSON.parse($.cookie('order'));
            var length = order.length;
            order[length] = {
                "Color"     : productColor,
                "Size"      : productSize,
                "Qty"       : productQty,
                "id"        : id
            };
            $.cookie('order', JSON.stringify(order), { path: '/' }); 

        } else {
            order[0] = {
                "Color"     : productColor,
                "Size"      : productSize,
                "Qty"       : productQty,
                "id"        : id
            };
            $.cookie('order', JSON.stringify(order), { path: '/' });
        }
        
        var readOrder = JSON.parse($.cookie('order'));
        $('.cartitem').html(readOrder.length);
    });

    // cart totle
    function cartTotle() {
        var totlePrice = 0;
        $('.pro_price').each( function(){
            var price = parseInt($(this).text());
            totlePrice = totlePrice + price;
            $(this).text(price.toFixed(2));
        });
        var i = (totlePrice).toFixed(2)
        $('.totle').html(i);
    }

    cartTotle();

    // Remove product from cart
    $( '.remove-order, .remove_btn' ).on('click', function() {
        var remove = confirm('sure you want to remove this?');
        function deleteItem(data) {
            var order = JSON.parse($.cookie('order'));
            var length = order.length;
            var deleted = 1;
            for(i=0; i<length;i++) {
                if(deleted && order[i].id == data) {
                    deleted = 0;
                    order.splice(i, 1);
                    $.cookie('order', JSON.stringify(order), { path: '/' }); 
                }
            }
        }
        if (remove) {
            var orderId = $(this).attr("data-remove");
            deleteItem(orderId);
            $(this).closest('tr').remove();
        }
    });

    // Edit product from cart
    function getAndRenderData (pro_id, proColor, proSize, proQty ) {
        $.ajax({
            url: "/productlist",
            type: "GET",
            dataType: "json",
            success: function (responseJson) {
                $.each(responseJson, function (i, Product) {
                    if (Product.id == pro_id) {
                        var proName = Product.name,
                            imageUrl = Product.image_groups[0].images[0].link,
                            popUphtml = '',
                            colorSelect = '',
                            sizeSelect = '',
                            qtySelect = '';

                        $('.remove_btn').attr( "data-remove", Product.id )
                        $('.update_btn').attr( "data-update", Product.id )
                            
                        if (proColor) {
                            $.each(Product.variation_attributes, function (i, color) {
                                if (color.id == "color") {
                                    colorSelect = '<div class="col s12 m4 color"><select>';
                                    $.each(color.values, function(i, optioncolor) { 
                                        var itemSelected = '';
                                        if (optioncolor.name == proColor) {
                                            itemSelected += 'selected';
                                        }
                                        colorSelect += '<option value="' + optioncolor.value + '"' + itemSelected + '>' + optioncolor.name + '</option>';
                                    });
                                    colorSelect += "</select></div>";
                                }
                            });
                        }

                        if (proSize) {
                            $.each(Product.variation_attributes, function (i, size) {
                                if (size.name == "Size") {
                                    sizeSelect = '<div class="col s12 m4 size"><select>';
                                    $.each(size.values, function(i, optionsize) { 
                                        var itemSelected = '';
                                        if (optionsize.name == proSize) {
                                            itemSelected += 'selected';
                                        }
                                        sizeSelect += '<option value="' + optionsize.value + '"' + itemSelected + '>' + optionsize.name + '</option>';
                                    });
                                    sizeSelect += "</select></div>";
                                }
                            });
                        }

                        qtySelect = '<div class="col s12 m4 qty"><select>';
                        for (i = 0; i < 6; i++) { 
                            var itemSelected = '';
                            if (i == proQty) {
                                itemSelected += 'selected';
                            }
                            qtySelect += '<option value="' + i + '"' + itemSelected + '>' + i + '</option>';
                        }
                        qtySelect += "</select></div>";

                        popUphtml +='<div class="edit-data"> \
                                        <div class="row">\
                                            <div class="product-img col s12 m6 center"><img src="/images/' + imageUrl + '" alt="" /></div> \
                                            <div class="product-data col s12 m6"> \
                                                <h5>'+ proName +'</h5>' 
                                                + colorSelect + sizeSelect + qtySelect +
                                             '</div> \
                                        </div>\
                                    </div>';
                        $('.modal-content').html(popUphtml);
                        $('select').material_select();
                    }
                });
            },
            error: function (xhr, status) {
                console.log("Sorry, there was a problem!");
            },
            complete: function (xhr, status) {
                console.log("The request is complete!");
            }
        })
    }

    $('.edit').on('click', function (){
        var pro_id = $(this).attr("data-edit"),
            proColor =  $(this).attr("data-color"),
            proSize =  $(this).attr("data-size"),
            proQty =  $(this).attr("data-qty");
        getAndRenderData(pro_id, proColor, proSize, proQty);
        $('.modal-content').html('Loading');
    });

    $('.update_btn').on('click', function (){

        var pro_id = $(this).attr("data-edit"),
            proColor =  $(this).attr("data-color"),
            proSize =  $(this).attr("data-size"),
            proQty =  $(this).attr("data-qty");
        getAndRenderData(pro_id, proColor, proSize, proQty);
        $('.modal-content').html('Loading');
    });
});