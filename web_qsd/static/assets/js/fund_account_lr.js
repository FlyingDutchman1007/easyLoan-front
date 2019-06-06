$(document).ready(
    function() {
    $.ajax({
        type: "get",
        dataType: "json",
        url: "/trade/lender/account",
        success: function (res) {
            $("#user_name").val(res.user_name);
            $("#bank_account").val(res.bank_account);
            $("#account_balance").val(res.user_balance);
            $("#current_income").val(res.current_income);
            $("#expected_income").val(res.expected_income);
	    $("#lent_money").val(res.lend_money);
            $("#available_money").val(res.available_money);
        },
        error: function() {}

    })
}
);
