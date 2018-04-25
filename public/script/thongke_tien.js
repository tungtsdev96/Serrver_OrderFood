$(document).ready(function () {
    $("#btnView").click(function () {
            var type = $("#type").val();
            var myTitle = "";
            var mySubTitle = "";
            if(type == 1){
                myTitle = "Daily Total Money this week";
                mySubTitle = "Group 16 by Pham Hai Linh";
            }else if(type == 2){
                myTitle = "Weekly Total Money this month";
                mySubTitle = "Group 16 by Pham Hai Linh";
            }else{
                myTitle = "Monthly Total Money this year";
                mySubTitle = "Group 16 by Pham Hai Linh";
            }
            $.ajax({
                url: 'http://localhost:3000/api/thong-ke?type=' + type,
                type: 'get',
                dataType: 'json',
                success: function (result) {
                    console.log(result);
                    Highcharts.chart('view', {
                        chart: {
                            type: 'line'
                        },
                        title: {
                            text: myTitle
                        },
                        subtitle: {
                            text: mySubTitle
                        },
                        xAxis: {
                            categories: result.time
                        },
                        yAxis: {
                            title: {
                                text: 'VND'
                            }
                        },
                        plotOptions: {
                            line: {
                                dataLabels: {
                                    enabled: true
                                },
                                enableMouseTracking: false
                            }
                        },
                        series: [{
                            name: 'Total revanue',
                            data: result.money
                        }]
                    });

                }
            });
    });
});