$(document).ready(function(){
    $.ajax({
        url : "http://localhost:3000/api/category/current-restaurent",
        type : "GET",
        dataType : "json",
        success : function(result){
            var html1 = "";
            console.log(result);
            $.each(result, function(key, item){
                html1 = html1 + "<option value ='" + item['category_id'] +"'>" + item['category_name'] +"</option>"
            });
            console.log(html1); 
            $("#product_category").html(html1);
        }
    });
})