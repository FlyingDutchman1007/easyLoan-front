$(document).ready(
    function() {
    $.ajax({
        type: "get",
        dataType: "json",
        url: "/trade/lender/account",
        success: function (res) {
            $("#user_name").text(res.user_name);
            $("#bank_account").text(res.bank_account);
            $("#account_balance").text(res.account_balance);
            $("#current_income").text(res.current_income);
            $("#expected_income").text(res.expected_income);
	    $("#lend_money").text(res.lent_money);
            $("#available_money").text(res.available_money);
        },
        error: function() {}

    })
}
);
