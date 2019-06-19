$(document).ready(function () {
    $.ajax({
        type : "get",
        dataType : "json",
        url : "http://127.0.0.1:8080/getAvatar",
        xhrFields:{
            withCredentials:true
        },
        success : function (res) {
            $("#avatar").attr("src",res.avatar);
        }
    });
});


//提交图片
function showImg() {
    var upload_file = document.getElementById("upload_file");
    var file_img = document.getElementById("avatar");
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
            var formData = new FormData();
            formData.append('avatar', $('#upload_file')[0].files[0]);
            $.ajax({
                type: "POST",
                url: "http://127.0.0.1:8080/uploadAvatar",
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
                        alert("提交成功");
                    } else {
                        alert("提交失败");
                    }
                },
                error: function() {
                    alert("提交失败，请稍后再试~");
                }
            })
        }
    }
}
