$("#start_cal").click(function () {
    var lendMoney = $("#lendMoney").val();
    var payRate = $("#payRate").val();
    var limitMonths = $("#limitMonths").val();
    var payType = $("#payType").val();
    if(lendMoney != "" && limitMonths != "") {
        $.ajax({
            type: "post",
            url: "http://192.168.0.195:8080/rateCalculator",
            xhrFields: {
                withCredentials: true
            },
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                "lendMoney": lendMoney,
                "payRate": payRate,
                "limitMonths": limitMonths,
                "payType": payType
            }),
            dataType: "json",
            success: function (list) {
                temp = "";
                for (var i = 0; i < list.length; i++) {
                    temp +=
                        "      <tr>\n" +
                        "                        <th>" + list[i].period + "</th>\n" +
                        "                        <th>" + list[i].repayMoney + "</th>\n" +
                        "                        <th>" + list[i].repayPrincipal + "</th>\n" +
                        "                        <th>" + list[i].repayInterest + "</th>\n" +
                        "                        <th>" + list[i].balance + "</th>\n" +
                        "                    </tr>";
                }
                $("#cal_result").append(temp);
            },
            error: function () {
                alert("提交失败，请稍后再试~")
            }
        })
    }else {
        alert("存在未填信息");
    }
});
