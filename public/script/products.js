
// $("#btnViewProducts").click(function(){
    // var categoryId = $("#listCategories").val();
    // $("#btnViewProducts").click(function(){
        // console.log(categoryId);
        // var urlAjax = "http://localhost:3000/ajax/product/categoryId=" + categoryId;
        // $.ajax({
        //     url : urlAjax,
        //     type : "GET",
        //     dataType : "json",
        //     success: function(result){
        //         var html = '';
        //         html += '<table class="table" >';
        //         html += '<tr>';
        //             html += '<th>';
        //                 html += 'Name';
        //             html += '</th>';
        //             html += '<th>';
        //                 html += 'Description';
        //             html += '</th>';
        //             html += '<th>';
        //                  html += 'Image';
        //             html += '</th>';
        //             html += '<th>';
        //                 html += 'Price';
        //             html    += '</th>';
        //         html += '<tr>';
                
        //         $.each (result, function (key, item){
        //             html +=  '<tr>';
        //                 html +=  '<td>';
        //                     html +=  item['product_name'];
        //                 html +=  '</td>';
        //                 html +=  '<td>';
        //                     html +=  item['product_description'];
        //                 html +=  '</td>';
        //                                         // <a href="">Update</a>
        //                 html +=  '<td> <img class="product-image" src= "';
        //                     html +=  item['product_image'];
        //                 html +=  ' "> </td>';
        //                 html +=  '<td>';
        //                     html +=  item['product_price'];
        //                 html +=  '</td>';

        //                 //update
        //                 html +=  '<td> <a class="btn-link" href="';
        //                 html = html + "http://localhost:3000/product/update/id=" + item['product_id'];
        //                 html += ">Update</a>";

        //                 //delete
        //                 html +=  '<td> <a class="btn-link" href="';
        //                 html = html + "http://localhost:3000/product/delete/id=" + item['product_id'];
        //                 html += ">Delete</a>"

        //                 html +=  '</td>';
        //             html +=  '<tr>';
        //         });
        //         html +=  '</table>';
        //         $('#tblProduct').html(html);
        //     }
        // });
$(document).ready(function(){

    // load cateegory
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
            $("#listCategories").html(html1);

            $("#btnViewProducts").click(function(){
                var categoryId = $("#listCategories").val();
                var urlAjax = "http://localhost:3000/api/product/get?categoryId=" + categoryId;
                $.ajax({
                    url : urlAjax,
                    type : "GET",
                    dataType : "json",
                    success: function(result){
                        var html = '';
                        html += '<table class="table" >';
                        html += '<tr>';
                            html += '<th>';
                                html += 'Name';
                            html += '</th>';
                            html += '<th>';
                                html += 'Description';
                            html += '</th>';
                            html += '<th>';
                                 html += 'Image';
                            html += '</th>';
                            html += '<th>';
                                html += 'Price';
                            html    += '</th>';
                        html += '</tr>';
                        
                        $.each (result, function (key, item){
                            html +=  '<tr>';
            
                            // name
                                html +=  '<td>';
                                    html +=  item['product_name'];
                                html +=  '</td>';
            
                                // description
                                html +=  '<td>';
                                    html +=  item['product_description'];
                                html +=  '</td>';
            
                                // image
                                html +=  '<td> <img class="product-image" src= "';
                                    html +=  item['product_image'];
                                html +=  ' "> </td>';
            
                                // image
                                html +=  '<td>';
                                    html +=  item['product_price'];
                                html +=  '</td>';
            
                                //update
                                html +=  '<td> <a class="btn-link" href="';
                                html = html + 'http://localhost:3000/product/update/id=' + item['product_id'];
                                html += '">Update</a> </td>';
            
                                //delete
                                html +=  '<td> <a class="btn-link" href="';
                                html = html + 'http://localhost:3000/delete-product=' + item['product_id'];
                                html += '">Delete</a>'
            
                                html +=  '</td>';
                            html +=  '</tr>';
                        });
                        html +=  '</table>';
                        $('#tblProduct').html(html);
                    }
                });
            })
        }
    });

});
