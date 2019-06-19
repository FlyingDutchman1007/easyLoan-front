//加载数据
$(document).ready(function () {
    $.ajax({
        type: "get",
        url: "http://127.0.0.1:8080/toPayRecord",
        xhrFields:{
            withCredentials:true
        },
        dataType: "json",
        success: function (list) {
            for($i = 0;$i<list.length;$i++) {
                $("#billId").text(list[$i].billId);
                $("#startDate").text(list[$i].startDate);
                $("#startMoney").text(list[$i].startMoney + "元");
                $("#unpayMoney").text(list[$i].unpayMoney + "元");
                $("#nextTimeShouldPay").text(list[$i].nextTimeShouldPay + "元");
                $("#liquidatedMoney").text(list[$i].liquidatedMoney + "元");
                $("#payRate").text(list[$i].payRate + "%");
                $("#payType").text(list[$i].payType + "%");
                if(list[$i].payType == "1"){
                    $("#payType").text("按月还");
                    }else{
                    $("#payType").text("按季还");
                }
                $("#deadline").text(list[$i].deadline);

                $("#unpayMoney_2").text(list[$i].unpayMoney);
                }
            $("#repay").css("visibility","visible");

        }
    });
});

//获取当前时间
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    return currentdate;
}
//发起还款
$("#borrower_repay").click(function () {
    var repay = $("#b_repay_money").val();
    var unpay =  $("#unpayMoney").text().replace("元","").trim();
    alert(repay);
    alert(unpay);
    if(repay >= 10 && repay <= unpay) {
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "http://127.0.0.1:8080/subRepayment",
            xhrFields: {
                withCredentials: true
            },
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                "billId": $("#billId").text(),
                "money": $("#b_repay_money").val(),
                "exactDate": getNowFormatDate()
            }),
            success: function (message) {
                if (message.state == "successful") {
                    alert("还款成功！");
                } else {
                    alert("还款失败，请稍后再试~");
                }
            },
            error: function () {
                alert("提交失败，请稍后再试~");
            }
        });
    }else{
        $("#b_repay_money").val("");
    }
});
