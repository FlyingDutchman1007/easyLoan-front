$(document).ready(function () {
    $.ajax({
        type : "get",
        dataType : "json",
        url : "127.0.0.1:8080/getStudentCard", //这里填url！！！！！！！！！！！！！！！！！！！！！
        xhrFields:{
            withCredentials:true
        },
        success : function (res) {
            $("#file_img").attr("src",res.avatar);
            if(res.state == "successful"){
                $("#submit_file").attr("disabled","disabled");
                $("#submit_btn").text("已认证");
            }
        }
    });
});


//选择图片
function showImg() {
    var upload_file = document.getElementById("upload_file");
    var file_img = document.getElementById("file_img");
    if (upload_file){
        var file = upload_file.files[0];
        var reader = new FileReader();
        var size = file.size/(1024 * 1024);
        if (size >= 5) {
            alert("No More than 5M");
        } else {
            reader.readAsDataURL(file);
            reader.onload = function () {
                file_img.setAttribute('src', reader.result);
            }
        }
    }
}
//提交图片
$("#submit_btn").click(function () {
    alert("in");
    var formData = new FormData();
    formData.append('avatar', $('#upload_file')[0].files[0]);
    $.ajax({
        type: "POST",
        url: "127.0.0.1:8080/uploadStudentCard", //这里填url！！！！！！！！！！！！！！！！！！！！！！
        xhrFields:{
            withCredentials:true
        },
        processData: false,
        contentType: false,
        data: formData,
        cache: false,
        dataType: "json",
        success: function (message) {
            if(message.state == "successful") {
                alert("认证成功");
                location.href = "special_certification.html";
            } else {
                alert("认证失败");
            }
        },
        error: function() {
            alert("提交失败，请稍后再试~");
        }
    })
});


$("#trick_1").click(function(){
    alert("其实并没有，气不气~");
})
$("#trick_2").click(function(){
    alert("还是算了，打扰了~");
})
