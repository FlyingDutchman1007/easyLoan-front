$("#borrower_deposit").click(function () {
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:8080/borrowerRechange",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
            "money": $("#b_deposit_money").val()
        }),
        dataType: "json",
        success: function (message) {
            alert(message.state);
            if(message.state == "successful") {
                alert("充值成功");
                location.href = "fund_account.html";
            }
            else{
                alert("充值失败，请重新充值~");
                location.href = "fund_account.html";
            }
        },
        error: function () {
            alert("充值失败，请重新充值~");
            location.href = "fund_account.html";
        }
    })
});
