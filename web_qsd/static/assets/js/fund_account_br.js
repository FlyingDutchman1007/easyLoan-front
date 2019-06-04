$(document).ready(function() {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "/trade/borrower/account",
        success: function (res) {
            $("#user_name").text(res.user_name);
            $("#credit_score").text(res.credit_score);
            $("#bank_account").text(res.bank_account);
            $("#account_balance").text(res.account_balance);
            $("#total_limit").text(res.total_limit);
            $("#available_limit").text(res.available_limit);
        },
        error: function() {}
    })
});
