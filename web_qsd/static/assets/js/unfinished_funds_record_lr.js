$(function(){
    $.ajax({
        type: "get",
        url: "http://127.0.0.1:8080/lenderToTrade",
        xhrFields:{
            withCredentials:true
        },
        dataType: "json",
        success: function (res) {
            var list = res;
            var temp = "";
            var money = 0;
            for (ls in list) {
                //temp存放表单信息
                temp += '<td>' + list[ls].billId + '</td>';
                temp += '<td>' + list[ls].intendMoney +"元"+ '</td>';
                temp += '<td>' + list[ls].raisedMoney +"元"+ '</td>';
                temp += '<td>' + list[ls].payRate + '</td>';
                if (list[ls].payType == 1){
                    temp += '<td>' + '按月还' + '</td>';
                } else{
                    temp += '<td>' + '按季还' + '</td>';
                }
                temp += '<td>' + list[ls].limitMonths +"个月"+ '</td>';
                temp += '<td>' + list[ls].startDate + '</td>';
                temp += '<td>' + list[ls].lendMoney +"元"+ '</td>';
                temp += '<td>' + list[ls].exactDate + '</td>';
                money = list[ls].intendMoney - list[ls].raisedMoney;
            }
            $("#unfinished").html(temp);
            $("#money").text(money + "元");
        }
    });
});
