$(document).ready(
    function() {
    $.ajax({
        type: "get",
        dataType: "json",
        url: "/trade/lender/account",
        success: function (res) {
            $("#user_name").text(res.user_name);
            $("#bank_account").text(res.bank_account);
            $("#account_balance").text(res.user_balance);
        },
        error: function() {}

    })
}
);