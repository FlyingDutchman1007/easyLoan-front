$(function() {
/*    var url = decodeURI(window.location.href);
    var argsIndex = url .split("?");
    var money = argsIndex[1].split("&&")[0].split("=")[1];
    var pay_type = argsIndex[1].split("&&")[1].split("=")[1];
    var rate = argsIndex[1].split("&&")[2].split("=")[1];
    var limit_months = argsIndex[1].split("&&")[3].split("=")[1];
    $("#my_money").text(money+"元");
    $("#my_rate").text(rate+"%");
    $("#my_month").text(limit_months+"月");*/
    $.ajax({
        type: "get",
        url: "match.json",/*
        xhrFields:{
            withCredentials:true
        },*/
/*        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
            "expectRate": rate,
            "intendMoney": money,
            "payType": pay_type,
            "limitMonths": limit_months
        }),*/
        dataType: "json",
        success: function (list) {
            for (var $i = 0; $i <= list.length; $i++) {
                var temp = "";
                var type = "按月还";
                if(list[$i].payType == "3"){
                    type = "按季还";
                }
                var date = list[$i].startDate.split("T")[0];
                temp +=
                    "<div id=\"match_div\" class=\"priceing-table-main\">\n" +
                    "\t\t\t<!--first-->\n" +
                    "\t\t\t<div class=\"col-md-4 price-grid\" style=\"padding-bottom: 30px\">\n" +
                    "\t\t\t\t<div class=\"price-block agile\">\n" +
                    "\t\t\t\t\t<div class=\"price-gd-top pric-clr1\">\n" +
                    "\t\t\t\t\t\t<h4>还需筹集金额</h4>\n" +
                    "\t\t\t\t\t\t<h3 id=\"surplus1\"></h3>\n" +
                    "\t\t\t\t\t</div>\n" +
                    "\t\t\t\t\t<div class=\"price-gd-bottom\">\n" +
                    "\t\t\t\t\t\t<div class=\"price-list\">\n" +
                    "\t\t\t\t\t\t\t<ul id=\"list_info1\">" +
                    '<li>' + "借单号&nbsp;:" + '<strong >' + list[$i].billId + '</strong>' + '</li>' +
                    '<li>' + "借款金额:" + '<strong>' + list[$i].intendMoney + '</strong>' + "元" + '</li>' +
                    '<li>' + "起始日期:" + '<strong>' + date + '</strong>'  + '</li>' +
                    '<li>' + "利率&nbsp;&nbsp;:" + '<strong>' + list[$i].payRate + '</strong>' + "%" + '</li>' +
                    '<li>' + "还款方式:" + '<strong>' + type + '</strong>'  + '</li>' +
                    '<li>' + "期限&nbsp;&nbsp;:" + '<strong>' + list[$i].limitMonths + '</strong>' + "月" + '</li>' +
                    '<li>' + "已筹集金额:" + '<strong>' + list[$i].raisedMoney + '</strong>' + "元" + '</li>' +
                    "\t\t\t\t</ul>\n" +
                    "\t\t\t\t\t\t</div>\n" +
                    "\t\t\t\t\t\t<div class=\"price-selet pric-sclr1\">\n" +
                    "\t\t\t\t\t\t\t<a id=\"pick\" data-toggle=\"modal\" data-target=\"#lend_pick\" type=\""+ list[$i].billId +"\" onclick=\"get_bill_id(this.type);\">PICK</a>" +
                    "\t\t\t\t\t\t</div>\n" +
                    "\t\t\t\t\t</div>\n" +
                    "\t\t\t\t</div>\n" +
                    "\t\t\t</div>";
             /*   $("#list_info" + ($i+1)).html(temp);
                $("#surplus" + ($i+1)).text(parseInt(list[$i].intendMoney) - parseInt(list[$i].raisedMoney));*/
             $("#match_div").append(temp);
                console.log(temp);
            }
        },
        error: function () {
            alert("error");
        }
    })
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
//获取bill_id
function get_bill_id(arg){
    $("#bill_id").text(arg);
}

$("#lend").click(function () {
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:8080/subLend",     
        xhrFields:{
            withCredentials:true
        },
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
            "billId": $("#bill_id").text(),
            "lendMoney": $("#lend_money").val(),
            "intendLendDate": getNowFormatDate()
        }),
        dataType: "json",
        success: function (message) {
            if (message.state == "successful") {
                alert("借出成功");
            }else {
                alert("借出失败");
            }
        },
        error: function () {
            alert("借出失败，请稍后再试~");
        }
    })
});
