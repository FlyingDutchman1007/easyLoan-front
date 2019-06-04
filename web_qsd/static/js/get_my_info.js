//获取用户刚刚提交的表单
$(function() {
    $.ajax({
        type: "get",
        url: "js/info.json",
        dataType: "json",
        success: function (res) {
            var list = res;
            console.log("233");

            $("#my_money").text(list.lend_money + "元");
            $("#my_rate").text(list.expect_rate + "%");
            $("#my_month").text(list.exact_date);

        }
    })
});
