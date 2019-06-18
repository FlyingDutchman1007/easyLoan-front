//页面加载时读取数据
$(document).ready(function () {
    $.ajax({
        type: "GET",
        url:'http://192.168.0.195:8080/borrowerInfo',
        xhrFields:{
            withCredentials:true
        },
        dataType: "json",
        success: function(res) {
            if(res.specialIdentity == 0){
                $("#special_certification").val( "\t\t\t " + "是");
            }else {
                $("#special_certification").val( "\t\t\t " + "否");
            }
            $("#user_name").val("\t\t " + res.userName);
            $("#phone_number").val("\t\t" + res.phoneNumber);
            if(res.educationalLevel == "未填"){
                $("#educational_level").val("未填");
            }else{
                $("#educational_level").val(res.educationalLevel);
            }
            if(res.profession == "未填"){
                $("#profession").val("未填");
            }else {
                $("#profession").val(res.profession);
            }
            if(res.marriage == "未填"){
                $("#marriage").val("未填");
            }else {
                $("#marriage").val(res.marriage);
            }
            if(res.sex == 0){
                $("#sex").val("0");
            }else {
                $("#sex").val(res.sex);
            }
              if(res.address == "未填"){
                $("#address").val("");
            }else {
                $("#address").val("\t\t"+res.address);
            }
        },
        error: function() {
            alert("获取失败");
        }
    });

    $.ajax({
        type: "GET",
        url: "http://127.0.0.1/borrowerInfo",
        xhrFields:{
            withCredentials:true
        },
        dataType: "json",
        success: function(res) {
            $("#avatar").val(res.avatar);
        },
        error: function() {
            alert("头像获取失败");
        }
    });
});
//重填按钮
$("#rewrite_button").click(function(){
    location.href = "user_info.html";
});
//填写地址样式
$("#address").focusin(function () {
    var address = $("#address").val().trim();
    $("#address").val(address);
});
$("#address").focusout(function () {
    var address = $("#address").val();
    $("#address").val("\t\t"+address);
});
//提交数据
$("#save_button").click(function(){
    $.ajax({
        type: "POST",
        url: "http://192.168.0.195:8080/UserInfo",
        xhrFields:{
            withCredentials:true
        },
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
            "address": $("#address").val().trim(),
            "educationalLevel": $("#educational_level").val(),
            "marriage": $("#marriage").val(),
            "profession": $("#profession").val(),
            "sex": $("#sex").val(),
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
