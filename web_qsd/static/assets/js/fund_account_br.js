$(document).ready(function() {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "http://192.168.0.195:8080/BorrowerFund",
        success: function (res) {
            $("#user_name").text(res.userName);
            $("#credit_score").text(res.creditScore);
            $("#bank_account").text(res.bankAccount);
            $("#account_balance").text(res.accountBalance);
            $("#total_limit").text(res.totalLimit);
            $("#available_limit").text(res.availableLimit);
        },
        error: function() {
             alert("未获取到数据");
        }
    })
});
