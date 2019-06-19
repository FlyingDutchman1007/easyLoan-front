$("#logout_btn").click(function () {
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:8080/logout",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
        }),
        dataType: "json",
        success: function (message) {
            if(message.state == "successful"){
                location.href = "../../index.html";
            }else {
                alert("未登录");
            }
            },
        error: function () {
            alert("发送失败，请稍后再试");
            location.href = "../../index.html";
        }
    })
});