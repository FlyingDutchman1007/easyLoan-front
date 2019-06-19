$(document).ready(
    function() {
    $.ajax({
        type: "get",
        dataType: "json",
        url: "http://127.0.0.1:8080/lenderFund",
        xhrFields:{
            withCredentials:true
        },
        success: function (res) {
            $("#user_name").text(res.userName);
            $("#bank_account").text(res.bankAccount);
            $("#account_balance").text(res.accountBalance);
            $("#current_income").text(res.totalBenefit);
            $("#expected_income").text(res.futureBenefit);
	    $("#lend_money").text(res.lendMoney);
            $("#available_money").text(res.availableMoney);
        },
        error: function() {}

    })
}
);
