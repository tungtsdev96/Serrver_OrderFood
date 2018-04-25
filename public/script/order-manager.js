function getOrderByState(state) {
    $.ajax({
        url: 'http://localhost:3000/api/order/getByState?state=' + state,
        type: 'get',
        dataType: 'json',
        success: function (result) {
            var html = '';
            html += '<table class="table table-striped" style="font-size: 12px">';
                 html += '<tr>';
                        html += '<td>';
                            html += 'ID';
                        html += '</td>';
                        html += '<td>';
                            html += 'Order time';
                        html += '</td>';
                        html += '<td>';
                            html += 'Deliver time';
                        html += '</td>';
                        html += '<td>';
                            html += 'Total Cost';
                        html += '</td>';
                        html += '<td>';
                            html += 'Address';
                        html += '</td>';
                        html += '<td>';
                            html += 'Phone number';
                        html += '</td>';
                        html += '<td>';
                            html += 'State';
                        html += '</td>';
                        html += '<td>';
                            html += 'Description';
                        html += '</td>';
                        html += '<td>';
                            html += 'Detail';
                        html += '</td>';
                html += '<tr>';
                $.each (result, function (key, item){
                    console.log(result);
                    html += '<tr>';
                        html += '<td>';
                            html += item['order_id'];
                        html += '</td>';
                        html += '<td>';
                        var orderTime = item['order_time'] + "";
                        var displayOrderTime = orderTime.substring(0, 19);
                        
                            // html += (item['order_time'] + "").substring(0, (item['order_time'] + "").length - 32);
                            html += displayOrderTime;
                        html += '</td>';
                        html += '<td>';
                        var deliveryTime = item['delivery_time'] + "";
                        var displayDeliveryTime = orderTime.substring(0, 19);
                            html += displayDeliveryTime;
                        html += '</td>';
                        html += '<td>';
                            html += item['order_cost'];
                        html += '</td>';
                        html += '<td>';
                            html += item['order_address'];
                        html += '</td>';
                        html += '<td>';
                            html += item['phone_number'];
                        html += '</td>';
                        html += '<td>';
                            html += item['order_status'];
                        html += '</td>';
                        html += '<td>';
                            html += item['order_description'];
                        html += '</td>';
                        html += '<td><a class="btn btn-success" href="http://localhost:3000/order-detail/detail?orderId=';
                            html += item['order_id'];
                            html += '">';
                            html += 'Detail';
                        html += '</a></td>';
                html += '<tr>';
            });
            html +=  '</table>';
            $('#tableOrder').html(html);
        }
    });
};
$(document).ready(function () {
    $("#btnViewOrders").click(function(){
        var state = $("#lstState").val();
        if((state +"") == "-1"){
            $("#nameState").html("Denied Orders");
        }
        if((state +"") == "1"){
            $("#nameState").html("Accecpted Orders");
        }
        if((state +"") == "2"){
            $("#nameState").html("Completed Orders");
        }
      
        getOrderByState(state);
    });
    



});