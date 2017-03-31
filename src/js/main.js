$( document ).ready(function() {
    if ($.cookie('order')) {
        var readOrder = JSON.parse($.cookie('order'));
        $('.cartitem').html(readOrder.length);
    }

    $( '.add_to_cart' ).on('click', function() {
        var productColor    = $('.product_box .color li.selected span').text(),
            productSize     = $('.product_box .size li.selected span').text(),
            productQty      = $('.product_box .qty li.selected span').text(),
            id              = $('.product_box #id').text();
        var order = [];
        order[0] = {
            "Color"     : productColor,
            "Size"      : productSize,
            "Qty"       : productQty,
            "id"        : id
        };

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
            $.cookie('order', JSON.stringify(order), { path: '/' });
        }
        
        var readOrder = JSON.parse($.cookie('order'));
        $('.cartitem').html(readOrder.length);
    });

    $( '.remove-order' ).on('click', function() {
        var remove = confirm('sure you want to remove this?');
        if (remove) {
            var orderId = $(this).attr("data-remove");
            function deleteItem(data) {
                var order = JSON.parse($.cookie('order'));
                var length = order.length;
                for(i=0; i<length;i++) {
                    if(order[i].id == orderId) {
                        order.splice(i);
                        $.cookie('order', JSON.stringify(order), { path: '/' }); 
                    }
                }
                location.reload();
            }
            deleteItem(orderId);
        }

    });
});