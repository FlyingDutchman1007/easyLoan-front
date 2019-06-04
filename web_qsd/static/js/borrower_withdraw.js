$("#borrower_withdraw").click(function () {
    $.ajax({
        type: "POST",
        url: "/trade/general/withdraw",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
            "money": $("#b_withdraw_money").val()
        }),
        dataType: "json",
        success: function (message) {
            alert(message.state);
            if(message.state == "successful") {
                alert("充值成功");
                location.href = "/resources/borrower/fund_account";
            }
            else{
                alert("充值失败，请重新充值~");
                location.href = "/resources/borrower/fund_account";
            }

        },
        error: function () {
            alert("充值失败，请重新充值~");
            location.href = "/resources/borrower/fund_account";
        }
    })
});
