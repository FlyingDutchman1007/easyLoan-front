//手机号
$.validator.addMethod("isPhoneNumber",function (value,element) {
    var length = value.length;
	var res = (length ===  11 && /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(value));
	if(res == false){
		$("#btnSendCode").attr("disabled", "disabled");            
	}
    return this.optional(element) || res;
});

//密码
$.validator.addMethod("checkPassword",function (value,element) {
    return this.optional(element) ||/^(?=.*[0-9])(?=.*[a-zA-Z])(.{6,20})$/.test(value);
});

//身份证
$.validator.addMethod("isIdCardNo",function (value,element) {
    return this.optional(element) || /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value);
});

//姓名格式
$.validator.addMethod("isChinese", function (value, element) {
    return this.optional(element) || /^[\u4e00-\u9fa5]+$/.test(value);
});

// 银行卡号码验证
$.validator.addMethod("isBankCardNo", function (value, element) {
	var res = isBankCardNo(value);
	if (isBankCardNo(value)== false){
		$("#bank_SendCode").attr("disabled","disabled");
	}
	else{
		$("#bank_SendCode").attr("disabled",false);
	}
    return this.optional(element) || res;
});

// 注册时手机号是否已注册验证
$.validator.addMethod("isRegisted", function (value, element) {
    var phone_number = $("#phone_num").val();
    var res = false;
    if(phone_number.length ==11 && /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(phone_number)) {
        $.ajax({
            type: "POST",
            url: "/information/all/checkPhoneNumber",
            contentType: "application/json; charset=utf-8",
			async: false,
            data: JSON.stringify({
                "phone_number": $("#phone_num").val()
            }),
            dataType: "json",
            success: function (message) {
                if (message.state == "unregister") {				
                    $("#btnSendCode").attr("disabled", false);
                    res = true;
                } else {
                    $("#btnSendCode").attr("disabled", "disabled");
                    res = false;
                }
            },
            error: function () {
                $("#btnSendCode").attr("disabled", "disabled");
                res = false;
            }
        })
    }
    return this.optional(element) || res;
});

// 登录时手机号是否已注册验证
$.validator.addMethod("isunRegisted", function (value, element) {
    var phone_number = $("#phone_number").val();
    var res = false;
    if(phone_number.length ==11 && /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(phone_number)) {
		$.ajax({
            type: "POST",
            url: "/information/all/checkPhoneNumber",
            contentType: "application/json; charset=utf-8",
			async: false,
            data: JSON.stringify({
                "phone_number": phone_number
            }),
            dataType: "json",
            success: function (message) {
                if (message.state == "unregister") {
                    res = false;
                } else {
                    res = true;
                }
            },
            error: function () {
                res = false;
            }
        })
    }
    return this.optional(element) || res;
});

// 验证码验证
$.validator.addMethod("isCodeRight", function (value, element) {
		var res = false;
		if(value.length == 6){
	     $.ajax({
        type: "POST",
        url: "/information/all/checkCheckCode",
        contentType: "application/json; charset=utf-8",
		async:false,
        data: JSON.stringify({
			"check_code": value
        }),
        dataType: "json",
        success: function (message) {
            if (message.state == "successful" ) {
				res = true;
            }else{
				res = false;
			}
        },
        error: function () {
				res = false;
        }
		})
	}
    return this.optional(element) || res;
});

// 验证图片大小(前)
$.validator.addMethod("istoolarge_1", function (value, element){
		var res = true;
		var file = $("#idcard_front").get(0).files[0];
        var fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100);        
		if (fileSize > 5) {
			res = false;
		}
        return this.optional(element) || res;
	});
// 验证图片大小（后）
$.validator.addMethod("istoolarge_2", function (value, element){
		var res = true;
		var file = $("#idcard_back").get(0).files[0];
        var fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100);        
		if (fileSize > 5) {
			res = false;
		}
        return this.optional(element) || res;
	});

function isBankCardNo(bk_num){
    if (bk_num.length < 15 && bk_num.length > 20) {
       return false;
    }
    var num = /^\d*$/; //全数字
    if (!num.test(bk_num)) {
        return false;
    }
    //开头6位
    var strBin = "10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
    if (strBin.indexOf(bk_num.substring(0, 2)) === -1) {
        return false;
    }
    return luhmCheck(bk_num);
}



//验证码60s
$(document).ready(function () {
    $("#btnSendCode").click(function (e) {
		var phone_number = $("#phone_num").val();
		var time = 60;
		function settime(obj){
            if (time===0) {
		$("#phone_num").attr('disabled',false);
                $(obj).attr('disabled', false);
                $(obj).html("重新获取");
                time = 60;
                return;
            } else{
		$("#phone_num").attr('disabled','disabled');
                $(obj).attr('disabled', 'disabled');
                $(obj).html(time+"秒重新发送");
                time--;                
				}
            setTimeout(function() {
                settime(obj)
            },1000)
        }
		if(phone_number.length ==11 && /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(phone_number)){
				$.ajax({
				type: "POST",
				url: "/information/all/sendCheckCode",
				contentType: "application/json; charset=utf-8",
				async:false,
				data: JSON.stringify({
				"phone_number": $("#phone_num").val()
				}),
				dataType: "json",
					success: function (message) {
					if (message.state == "successful" ) {
						settime($("#btnSendCode"));
					}					
				},
				error: function () {
						$("#btnSendCode").html("发送失败，点击重新获取");
				}
			})
		}
    })
});

$(document).ready(function () {
    $("#bank_SendCode").click(function () {
		var bank_account = $("#bank_number").val();
        var time = 60;
        function settime(obj){
              if (time===0) {
		$("#bank_number").attr('disabled',false);
                $(obj).attr('disabled', false);
                $(obj).html("重新获取");
                time = 60;
                return;
            } else{
		$("#bank_number").attr('disabled',true);
                $(obj).attr('disabled', true);
                $(obj).html(time+"秒重新发送");
                time--;                
				}
            setTimeout(function() {
                settime(obj)
            },1000)
        }
		
			if(isBankCardNo(bank_account)){
				$.ajax({
				type: "POST",
				async:false,
				url: "/information/all/sendCheckCode2",
				contentType: "application/json; charset=utf-8",
				data: JSON.stringify({
				"bank_account": bank_account
				}),
				dataType: "json",
					success: function (message) {
					if (message.state == "successful" ) {
						settime($("#bank_SendCode"));
					}	
				},
				error: function () {
                    $("#bank_SendCode").html("发送失败，点击重新获取");
				}
			})
		}
		
    })
});

$(document).ready(function () {
    $("#btn_register").click(function () {
    if($("#bank_number").val() != "" && isBankCardNo($("#bank_number").val()) && $("#bk_yzm").val().length == 6 && $('#agree_sf').is(':checked')) {
	$.ajax({
        type: "POST",
        url: "/information/all/register",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
            "phone_number": $("#phone_num").val(),
            "password": $("#password_1").val(),
            "user_type": $('#borrower_btn').val(),
            "user_name": $("#user_name").val(),
            "id_card": $("#id_card").val(),
            "bank_account": $("#bank_number").val(),
	    "verify_code": $("#bk_yzm").val()
        }),
        dataType: "json",
        success: function (message) {
            if (message.state == "successful" ) {
                alert("注册成功！");
		location.href = "login.html";
            }
        },
        error: function () {
            alert("注册失败，请重新注册！");
        }
		})
	    }
    })
});




