$(document).ready(function () {
    $("#btnView").click(function () {
        var type = $("#type").val();
        var myTitle = "";
        var mySubTitle = "";
         if (type == 4) {
            myTitle = "Best Buy";
            mySubTitle = "5 Best Products";
        } else {
            myTitle = "Worst buy";
            mySubTitle = "5 Worst Products";
        }
        $.ajax({
            url: 'http://localhost:3000/api/thong-ke?type=' + type,
            type: 'get',
            dataType: 'json',
            success: function (result) {
                console.log(result);
                var chart = Highcharts.chart('view', {
                        title: {
                            text: myTitle
                        },
                    
                        subtitle: {
                            text: mySubTitle
                        },
                    
                        xAxis: {
                            categories: result.name
                        },
                    
                        series: [{
                            type: 'column',
                            colorByPoint: true,
                            data: result.quantity,
                            showInLegend: true
                        }]
                    
                    });
            }
        });
    });
});