$(document).ready(function(){
    $.ajax({
        url : 'http://localhost:3000/api/category/system',
        type : "GET",
        dataType : "json",
        success : function(result){
            var html = "";
            $.each(result, function(key, item){
                html = html + "<option value='" + item['id'] + "'>" + item['name'] + "</option>";
            });
            console.log(html);
            $("#system_category_id").html(html);
        }
    });
});