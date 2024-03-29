	    $("#login_btn").click(function () {
            var phone_number = $("#phone_number").val();
            var password = $("#password").val();
            var res = false;
   	    if(phone_number.length ==11 &&
               /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(phone_number) &&
               /^(?=.*[0-9])(?=.*[a-zA-Z])(.{6,20})$/.test(password)) {
               $.ajax({
                   type: "POST",
                   url: "http://127.0.0.1:8080/user/register/checkPhoneNumber",
		   xhrFields:{
                	withCredentials:true
           	 },
                   contentType: "application/json; charset=utf-8",
                   async: false,
                   data: JSON.stringify({
                       "phoneNumber": phone_number
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
               });
               if (res == true) {
                   $.ajax({
                       type: "POST",
                       url: "http://127.0.0.1:8080/user/login",
			xhrFields:{
                		withCredentials:true
           		 },
			contentType: "application/json; charset=utf-8",
                      	 data: JSON.stringify({
                           "phoneNumber": $("#phone_number").val(),
                           "password": $("#password").val()
                       }),
                       dataType: "json",
                       success: function (message) {
                           if (message.state != -1) {
                               if (message.state == 0) {
                                   location.href = "../resources/borrower/index_borrower.html";
                               } else {
                                   location.href = "../resources/lender/index_lender.html";
                               }
                           }
                           else {
                               alert("登录失败，请重新登录~");
                               location.href = "login.html";
                           }
                       },
                       error: function () {
                           alert("登录失败，请重新登录~");
                           location.href = "login.html";
                       }
                   })
               }
           }
    });
