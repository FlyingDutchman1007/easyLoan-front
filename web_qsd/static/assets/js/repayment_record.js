$(function(){
    $.ajax({
        type: "get",
        url: "/trade/borrower/loan",
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
                    '<td>' + list[$i].bill_id + '</td>' +
                    '<td>' + list[$i].start_date + '</td>' +
                    '<td>' + list[$i].start_money + "元" + '</td>' +
                    '<td>' + list[$i].unpay_money + "元" + '</td>' +
                    '<td>' + list[$i].next_time_should_pay + "元" + '</td>' +
                    '<td>' + list[$i].liquidated_money + "元" + '</td>' +
                    '<td>' + list[$i].pay_rate + "%" + '</td>' +
                    '<td>' + type + '</td>' +
                    '<td>' + list[$i].deadline  + '</td>' +
                    '<td>' + list[$i].start_interest + '</td>' +
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
            dataType: "json",
            url: "",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                "bill_id": $("table tr:eq(0) td:eq(0)").text(),
                "money": $("table tr:eq(0) td:eq(4)").text(),
                "exact_date": $(Date().toLocaleTimeString()),
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