$(function(){
    $.ajax({
        type: "get",
        url: "http://192.168.0.195:8080/toPayRecord",
        dataType: "json",
        success: function (res) {
            var list = res;
            for($i = 0;$i<list.length;$i++) {
                var temp = "";
                var type = "月";
                if(list[$i].pay_type === "3"){
                    var type = "季";
                }
                temp +=
                    '<tr>'+
                    '<td>' + list[$i].billId + '</td>' +
                    '<td>' + list[$i].startDate + '</td>' +
                    '<td>' + list[$i].startMoney + "元" + '</td>' +
                    '<td>' + list[$i].unpayMoney + "元" + '</td>' +
                    '<td>' + list[$i].nextTimeShouldPay + "元" + '</td>' +
                    '<td>' + list[$i].liquidatedMoney + "元" + '</td>' +
                    '<td>' + list[$i].payRate + "%" + '</td>' +
                    '<td>' + list[$i].payType + '</td>' +
                    '<td>' + list[$i].deadline  + '</td>' +
                    '<td>' + '<button type="button" class="btn btn-success" id="repay">还款</button>' + '</td>' +
                    '</tr>';
                $("#tbody").append(temp);
            }
        }
    });
});


$(document).ready(function () {
    $("#repay").click(function () {
        $.ajax({
            type: "POST",
            dataType: "http://192.168.0.195:8080/subRepayment",
            url: "",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                "billId": $("table tr:eq(0) td:eq(0)").text(),
                "money": $("table tr:eq(0) td:eq(4)").text(),
                "exactDate": $(Date().toLocaleTimeString()),
            }),
            success: function (message) {
                if (message.state === "successful" ) {
                    alert("还款成功！");
                }
            },
            error: function () {
                alert("还款失败，请重新还款！");
            }
        })
    })
});
