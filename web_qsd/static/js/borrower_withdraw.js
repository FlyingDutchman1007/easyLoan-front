$("#borrower_withdraw").click(function () {
    $.ajax({
        type: "POST",
        url: "http://192.168.0.195:8080/borrowerWithdraw",
         xhrFields:{
            withCredentials:true
        },
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
            "money": $("#b_withdraw_money").val()
        }),
        dataType: "json",
        success: function (message) {
            alert(message.state);
            if(message.state == "successful") {
                alert("提现成功");
                location.href = "fund_account.html";
            }
            else{
                alert("提现失败，请重新操作~");
                location.href = "fund_account.html";
            }
        },
        error: function () {
            alert("发送失败，请稍后再试~");
            location.href = "fund_account.html";
        }
    })
});
