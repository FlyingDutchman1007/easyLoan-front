$("#lender_withdraw").click(function () {
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:8080/lenderWithdraw",
        xhrFields:{
            withCredentials:true
        },
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
            "money": $("#l_withdraw_money").val()
        }),
        dataType: "json",
        success: function (message) {
            alert(message.state);
                if(message.state == "successful") {
                    alert("提现成功");
                    location.href = "fund_account.html";
                }
                else{
                    alert("提现失败，请稍后再试~");
                    location.href = "fund_account.html";
                }

        },
        error: function () {
            alert("提交失败，请稍后再试~");
            location.href = "fund_account.html";
        }
    })
});
