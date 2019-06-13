$(document).ready(function() {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "http://127.0.0.1:8080/borrowerFund",
        xhrFields:{
            withCredentials:true
        },
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
$("#borrow_now").click(function () {
    location.href = "borrow.html";
});
