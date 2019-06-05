$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "/information/borrower/information",
        dataType: "json",
        success: function(res) {
            var address = "\t " + "未填写";
            var special_identity = "\t " + "未认证";
            if(res.address != null || res.address !=""){
                address = "\t " + res.address;       
            }
            if(res.special_identity == 1){
                special_identity = "\t " + "已认证";       
            }
            if(res.special_identity )
            $("#special_certification").val(special_identity);
            $("#user_name").val("\t " + res.user_name);
            $("#phone_number").val("\t\t" + res.phone_number);
            $("#sex").val("\t " + res.sex);
            $("#profession").val("\t " + res.profession);
            $("#educational_level").val("\t\t " + res.educational_level);
            $("#marriage").val("\t\t " + res.marriage);
            $("#address").val(address);
            //$("#avatar").src(res.avatar);
        },

        error: function() {
            alert("error");
        }

    })
});

$("#save_button").click(function(){
    $.ajax({
        type: "PUT",
        url: "/information/borrower/information",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
            "address": $("#address").val().trim(),
            //"avatar": $("#avatar").src(), 单独接口
            "educational_level": $("#educational_level").val().trim(),
            "marriage": $("#marriage").val().trim(),
            "phone_number": $("#phone_number").val().trim(),
            "profession": $("#profession").val().trim(),
            "sex": $("#sex").val().trim(),
            //"user_name": $("#user_name").val().trim(),
            "special_certification": $("#special_certification").val().trim()
        }),
        dataType: "json",
        success: function (message) {
            if(message.state == "successful") {
                alert("保存成功");
            } else {
                alert("保存失败");
            }
        },
        error: function() {
            alert("error");
        }
    })

});
