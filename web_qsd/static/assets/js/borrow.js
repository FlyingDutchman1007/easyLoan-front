//加载页面时，获取信用额度
var limit = 0;
$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:8080/borrowerFund",
        xhrFields:{
            withCredentials:true
        },
        dataType: "json",
        success: function (message) {
            $("#limit").text(message.availableLimit+"元");
            limit = message.availableLimit;
        },
        error: function () {
            $("#limit").text("---元");
        }
    })
});
//计算预期金额
function calc_outputmoney(){
    var limit_months = $("#outputtime").text().replace("月","").trim();
    money = ($("#intend_money").val() *  (1 + ($("#rate").val() / 100.0) * limit_months) ).toFixed(2);
    if(!isNaN(money)){
        $("#outputmoney").text(money + "元") ;
    }else{
        $("#outputmoney").text("--元") ;
    }
}

//更新借入金额
$("#intend_money").focusout(function () {
    var intend_money = $("#intend_money").val();
    var limit_months = $("#outputtime").text().replace("月","").trim();
    if(intend_money <= 0 || intend_money >=limit || intend_money % 100 != 0 ){
        $("#intend_money").val("");
        calc_outputmoney();
    }else{
        calc_outputmoney();
    }
});

//更新预期收款
$("#rate").change(function () {
    calc_outputmoney();
});

//更新还款方式
$("#pay_type").change(function () {
    $("#outputtime").text("--月");
    calc_outputmoney();
});

//执行一个laydate实例
laydate.render({
     elem: '#limit_months'//指定元素,
    ,btns: ['confirm']
    ,theme: '#1cd8c9'
    ,type: 'month'
    ,min: 0
    ,max: 1010
    ,done: function(value, date, endDate){
        //console.log(value); //得到日期生成的值，如：2017-08-18
        //console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
        //console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。

        //选择框里的时间
        var enddate = new Date(value);
        endmonth = enddate.getMonth() + 1;
        endyear = enddate.getFullYear() * 12;
        endtime = parseInt(endmonth) + parseInt(endyear) ;

        //获取当前时间
        var startdate = new Date() ;
        startmonth = startdate.getMonth() + 1;
        startyear = startdate.getFullYear()*12;
        starttime = parseInt(startmonth) + parseInt(startyear);

        //显示时间差
        subtime = endtime - starttime ;
        if($("#pay_type").val() == 1){
            $("#outputtime").text(subtime+"月");
            calc_outputmoney();
        }else{
            if(subtime % 3 == 0 || subtime == 0 ){
                $("#outputtime").text(subtime+"月");
                calc_outputmoney();
            } else {
                $("#limit_months").html("");
                $("#outputtime").text("--月");
                calc_outputmoney();
            }
        }
    }
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

//提交借入
$("#btn_submit").click(function(){
    if($("#outputmoney").text() != "--元" && $("#outputmoney").text() != "0.00元"){
        $.ajax({
            type: "POST",
            url: "http://127.0.0.1:8080/subBorrow",
             xhrFields:{
                withCredentials:true
            },
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                "intendMoney": $("#intend_money").val(),
                "rate": $("#rate").val(),
                "payType": $('#pay_type').val(),
                "limitMonths": $("#limit_months").val(),
                "startDate": getNowFormatDate()
            }),
            dataType: "json",
            success: function (message) {
                if (message.state == "successful" ) {
                    alert("提交成功");
                    location.href = "borrow.html";
                }else{
                    alert("借款额度不足");
                }
            },
            error: function () {
                alert("提交失败，请稍后再试~");
            }
        })
    }else {
        alert("填写信息有误，请检查后重新提交");
    }
});
