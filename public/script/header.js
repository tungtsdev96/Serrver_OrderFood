var socket = io("http://localhost:3000");

$(document).ready(function(){
    $("#notice-order").hide();
    socket.on("ORDER", function(data){
        $("#notice-order").show();
        $("#count-order").hide();
    });

    $("#ORDER-NOTIFI").click(function(){
        $("#notice-order").hide();
        $("#count-order").show();
    });

    $.ajax({
        url : 'http://localhost:3000/api/restaurent/current-restaurent',
        type : 'get',
        dataType : 'json',
        success : function (result){
            console.log(result.restaurent_id);
            $("#lblRestaurentName").text(result.restaurent_name);
        }
    });

    $.ajax({
        url : 'http://localhost:3000/api/order-table-cancel',
        type : 'get',
        dataType : 'json',
        success : function (result){
            console.log(result.state);
        }
    });

    $.ajax({
        url : 'http://localhost:3000/api/order/coming',
        type : 'get',
        dataType : 'json',
        success : function (result){
            var count = result.length;
            if(count != null && count > 0){
                $("#count-order").html(count);
                $("#count-order").show();
            }
            
        }
    });
});