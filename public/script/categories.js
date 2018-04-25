$(document).ready(function(){
    $.ajax({
        url : "http://localhost:3000/api/category/current-restaurent",
        type : "GET",
        dataType : "json",
        success : function(result){
            var html = "";
            html += '<table class="table" >';
            html += '<tr>';
                html += '<th>';
                    html += 'Name';
                html += '</th>';
                html += '<th>';
                    html += 'Description';
                html += '</th>';
            html += '</tr>';
            $.each(result, function(key, item){
                html +=  '<tr>';
                
                                // name
                                    html +=  '<td>';
                                        html +=  item['category_name'];
                                    html +=  '</td>';
                
                                    // description
                                    html +=  '<td>';
                                        html +=  item['category_description'];
                                    html +=  '</td>';
                
                
                                    //update
                                    html +=  '<td> <a class="btn btn-primary" href="';
                                    html = html + 'http://localhost:3000/category/update/id=' + item['category_id'];
                                    html += '">Update</a> </td>';
                
                                    //delete
                                    html +=  '<td> <a class="btn btn-danger" href="';
                                    html = html + 'http://localhost:3000/category/delete/id=' + item['category_id'];
                                    html += '">Delete</a>'
                                    html +=  '</td>';
                                html +=  '</tr>';
            });
            html +=  '</table>';
            $('#tblCategories').html(html);
        }
    });
});