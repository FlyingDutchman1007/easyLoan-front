$(document).ready(function() {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "/trade/borrower/account",
        success: function (res) {
            $("#user_name").text(res.userName);
            $("#credit_score").text(res.creditScore);
            $("#bank_account").text(res.bankAccount);
            $("#account_balance").text(res.accountBalance);
            $("#total_limit").text(res.totalLimit);
            $("#available_limit").text(res.availableLimit);
        },
        error: function() {}
    })
});
