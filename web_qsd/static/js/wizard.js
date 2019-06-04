searchVisible = 0;
transparent = true;

$(document).ready(function(){

    // Code for the Validator
    var $validator = $('.wizard-card form').validate({
        rules: {
            phone_num: {
                required: true,
                isPhoneNumber:true,
				isRegisted:true,
            },
            password_1: {
                required: true,
                minlength: 6,
                maxlength: 20,
                checkPassword:true,
            },
            password_2:{
                required:true,
                equalTo: "#password_1"
            },
            yzm:{
                required:true,
                minlength: 6,
                maxlength: 6,
				isCodeRight:true,
            },
            user_name:{
                required:true,
                isChinese:true,
				maxlength:20,
            },
            id_card:{
                required:true,
                isIdCardNo:true,
            },
            bk_user_name:{
                required:true,
                isChinese:true,
            },
            bank_number:{
                required:true,
                isBankCardNo: true,
            },
            bk_phone_number:{
                required:true,
                isPhoneNumber:true,
            },
            bk_yzm:{
                required:true,
                minlength: 6,
                maxlength: 6,
            },
            agree_sf:{
                required:true,
            },
			password: {
                required: true,
                minlength: 6,
                maxlength: 20,
                checkPassword:true,
            },
			user_type: {
				required: true,
			},
			phone_number: {
                required: true,
                isPhoneNumber:true,
				isunRegisted:true,
            },
			idcard_front: {
                required: true,
            },
			idcard_back: {
                required: true,
            },
        },
        messages: {
            phone_num: {
                required: "手机号不能为空",
                isPhoneNumber:"请输入正确格式手机号",
				isRegisted:"该手机号已注册"
            },
            password_1: {
                required: "密码不能为空",
                minlength: "密码长度不能少于6个字符",
                maxlength: "密码长度不能超过20个字符",
                checkPassword: "密码必须包含字母和数字，字母区分大小写"
            },
            password_2: {
                required: "确认密码不能为空",
                equalTo: "确认密码和密码不一致"
            },
            yzm:{
                required:"验证码不能为空",
                minlength:"请输入六位验证码",
                maxlength:"请输入六位验证码",
				isCodeRight:"验证码错误或失效"
            },
            user_name:{
                required:"姓名不能为空",
                isChinese:"姓名不符合格式",
				maxlength:"输入过长",
            },
            id_card:{
                required:"身份证号不能为空",
                isIdCardNo: "身份证不符合格式要求",
            },
            bk_user_name:{
                required:"持卡人姓名不能为空",
                isChinese:"姓名不符合格式"
            },
            bank_number: {
                required: "银行卡号不能为空",
                isBankCardNo:"银行卡不符合格式要求",
            },
            bk_phone_number:{
                required:"预留手机号码不能为空",
                isPhoneNumber:"手机号不符合格式要求",
            },
            bk_yzm:{
                required:"验证码不能为空",
                minlength:"请输入六验证码",
                maxlength:"请输入六位验证码",
            },
            password: {
                required: "密码不能为空",
                minlength: "密码长度不能少于6个字符",
                maxlength: "密码长度不能超过20个字符",
                checkPassword: "密码必须包含字母和数字，字母区分大小写"
            },
			user_type: {
                required: "密码不能为空",
            },
			phone_number: {
                required: "手机号不能为空",
                isPhoneNumber:"请输入正确格式手机号",
				isunRegisted:"该手机号未注册"
            },
			idcard_front: {
                required: "上传照片不能为空",
            },
			idcard_back: {
                required: "上传照片不能为空",
            },
        }
	});

    // Wizard Initialization
  	$('.wizard-card').bootstrapWizard({
        'tabClass': 'nav nav-pills',
        'nextSelector': '.btn-next',
        'previousSelector': '.btn-previous',
        'lastSelector':'.btn-finish',

        onNext: function(tab, navigation, index) {
        	var $valid = $('.wizard-card form').valid();
        	if(!$valid) {
        		$validator.focusInvalid();
        		return false;
        	}
        },

        onLast: function(tab, navigation, index) {
            var $valid = $('.wizard-card form').valid();
            if(!$valid) {
                $validator.focusInvalid();
                return false;
            }
        },

        onInit : function(tab, navigation, index){

          //check number of tabs and fill the entire row
          var $total = navigation.find('li').length;
          $width = 100/$total;
          var $wizard = navigation.closest('.wizard-card');

          $display_width = $(document).width();

          if($display_width < 600 && $total > 3){
              $width = 50;
          }

           navigation.find('li').css('width',$width + '%');
           $first_li = navigation.find('li:first-child a').html();
           $moving_div = $('<div class="moving-tab">' + $first_li + '</div>');
           $('.wizard-card .wizard-navigation').append($moving_div);
           refreshAnimation($wizard, index);
           $('.moving-tab').css('transition','transform 0s');
       },

        onTabClick : function(tab, navigation, index){

            var $valid = $('.wizard-card form').valid();

            if(!$valid){
                return false;
            } else {
                return true;
            }
        },

        onTabShow: function(tab, navigation, index) {
            var $total = navigation.find('li').length;
            var $current = index+1;

            var $wizard = navigation.closest('.wizard-card');

            // If it's the last tab then hide the last button and show the finish instead
            if($current >= $total) {
                $($wizard).find('.btn-next').hide();
                $($wizard).find('.btn-finish').show();
            } else {
                $($wizard).find('.btn-next').show();
                $($wizard).find('.btn-finish').hide();
            }

            button_text = navigation.find('li:nth-child(' + $current + ') a').html();

            setTimeout(function(){
                $('.moving-tab').text(button_text);
            }, 150);

            var checkbox = $('.footer-checkbox');

            if( !index == 0 ){
                $(checkbox).css({
                    'opacity':'0',
                    'visibility':'hidden',
                    'position':'absolute'
                });
            } else {
                $(checkbox).css({
                    'opacity':'1',
                    'visibility':'visible'
                });
            }

            refreshAnimation($wizard, index);
        }
  	});


    // Prepare the preview for profile picture
    $("#wizard-picture").change(function(){
        readURL(this);
    });

    $('[data-toggle="wizard-radio"]').click(function(){
        wizard = $(this).closest('.wizard-card');
        wizard.find('[data-toggle="wizard-radio"]').removeClass('active');
        $(this).addClass('active');
        $(wizard).find('[type="radio"]').removeAttr('checked');
        $(this).find('[type="radio"]').attr('checked','true');
    });

    $('[data-toggle="wizard-checkbox"]').click(function(){
        if( $(this).hasClass('active')){
            $(this).removeClass('active');
            $(this).find('[type="checkbox"]').removeAttr('checked');
        } else {
            $(this).addClass('active');
            $(this).find('[type="checkbox"]').attr('checked','true');
        }
    });

    $('.set-full-height').css('height', 'auto');

});



 //Function to show image before upload

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#wizardPicturePreview').attr('src', e.target.result).fadeIn('slow');
        }
        reader.readAsDataURL(input.files[0]);
    }
}

$(window).resize(function(){
    $('.wizard-card').each(function(){
        $wizard = $(this);
        index = $wizard.bootstrapWizard('currentIndex');
        refreshAnimation($wizard, index);

        $('.moving-tab').css({
            'transition': 'transform 0s'
        });
    });
});

function refreshAnimation($wizard, index){
    total_steps = $wizard.find('li').length;
    move_distance = $wizard.width() / total_steps;
    step_width = move_distance;
    move_distance *= index;

    $wizard.find('.moving-tab').css('width', step_width);
    $('.moving-tab').css({
        'transform':'translate3d(' + move_distance + 'px, 0, 0)',
        'transition': 'all 0.3s ease-out'

    });
}

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		clearTimeout(timeout);
		timeout = setTimeout(function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		}, wait);
		if (immediate && !timeout) func.apply(context, args);
	};
};
