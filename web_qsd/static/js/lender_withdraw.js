$("#lender_withdraw").click(function () {
    $.ajax({
        type: "POST",
        url: "/trade/general/withdraw",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
            "money": $("#l_withdraw_money").val()
        }),
        dataType: "json",
        success: function (message) {
            alert(message.state);
                if(message.state == "successful") {
                    alert("提现成功");
                    location.href = "/resources/lender/fund_account";
                }
                else{
                    alert("提现失败，请重新提现~");
                    location.href = "/resources/lender/fund_account";
                }

        },
        error: function () {
            alert("发送失败，请稍后再试~");
            location.href = "/resources/lender/fund_account";
        }
    })
});
