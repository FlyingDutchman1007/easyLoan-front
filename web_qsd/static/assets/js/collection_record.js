$(document).ready(function () {
    $.ajax({
        type : "get",
        dataType : "json",
        url : "http://127.0.0.1:8080/lenderToReceive",
        xhrFields:{
            withCredentials:true
        },
        success : function (list) {
            for($i = 0;$i<list.length;$i++){
                var temp = "";
                var type = "按月付";
                if(list[$i].payType == "3"){
                    type = "按季付";
                }
                temp +=
                    '<tr>'+
                    '<td>' + list[$i].billId + '</td>' +
                    '<td>' + list[$i].money + "元" + '</td>' +
                    '<td>' + list[$i].collectedMoney + "元" + '</td>' +
                    '<td>' + list[$i].interest + "元" + '</td>' +
                    '<td>' + list[$i].collectedInterest + "元" + '</td>' +
                    '<td>' + list[$i].liquidatedMoney + "元" + '</td>' +
                    '<td>' + list[$i].collectedLiquidatedMoney + "元" + '</td>' +
                    '<td>' + list[$i].totalMoney + "元" + '</td>' +
                    '<td>' + list[$i].collectedTotalMoney + "元" + '</td>' +
                    '<td>' + list[$i].payRate + "%" + '</td>' +
                    '<td>' + type + '</td>' +
                    '<td>' + list[$i].startDate + '</td>' +
                    '<td>' + list[$i].deadline + '</td>' +
                    '</tr>';
                $("#data").append(temp);
            }
        }
    });
});
