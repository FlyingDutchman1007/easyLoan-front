$(function() {
    var url = decodeURI(window.location.href);
    var argsIndex = url .split("?");
    var money = argsIndex[1].split("&&")[0].split("=")[1];
    var pay_type = argsIndex[1].split("&&")[1].split("=")[1];
    var rate = argsIndex[1].split("&&")[2].split("=")[1];
    var limit_months = argsIndex[1].split("&&")[3].split("=")[1];
    $.ajax({
        type: "POST",
        url: "http://192.168.0.195:8080/lendMatch",
        xhrFields:{
            withCredentials:true
        },
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
            "expectRate": rate,
            "intendMoney": money,
            "payType": pay_type,
            "limitMonths": limit_months
        }),
        dataType: "json",
        success: function (list) {
            for (var $i = 0; $i < list.length; $i++) {
                var temp = "";
                temp +=
                    '<li>' + "借款金额:" + '<strong>' + list[$i].intend_money + '</strong>' + "元" + '</li>' +
                    '<li>' + "起始日期:" + '<strong>' + list[$i].start_date + '</strong>'  + '</li>' +
                    '<li>' + "利率&nbsp&nbsp:" + '<strong>' + list[$i].pay_rate + '</strong>' + "%" + '</li>' +
                    '<li>' + "还款方式:" + '<strong>' + list[$i].pay_type + '</strong>'  + '</li>' +
                    '<li>' + "期限&nbsp&nbsp:" + '<strong>' + list[$i].limit_momths + '</strong>' + "月" + '</li>' +
                    '<li>' + "已筹集金额:" + '<strong>' + list[$i].raised_money + '</strong>' + "元" + '</li>';
                $("#list_info" + ($i+1)).html(temp);
                $("#surplus" + ($i+1)).text(parseInt(list[$i].intend_money) - parseInt(list[$i].raised_money));
                console.log(temp);
            }
        }
    })
});
