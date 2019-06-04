/*
* 只能输入数字和小数点；
* 第一位不能是小数点；
* 第一位如果输入0，且第二位不是小数点，则去掉第一位的0;
* 小数点后保留2位
* */

function withdrawNumberCheck(num) {

    var str = num;
    var len1 = str.substr(0, 1);
    var len2 = str.substr(1, 1);

    //如果第一位是0，第二位不是点，就用数字把点替换掉
    if (str.length > 1 && len1 == 0 && len2 != ".") {
        str = str.substr(1, 1);
    }

    //第一位不能是.
    /*
    if (len1 == ".") {
       str = "";
    }
    */

    //限制只能输入一个小数点
    if (str.indexOf(".") != -1) {
        var str1 = str.substr(str.indexOf(".") + 1);
        //去掉第一个.后 判断是否还有.
        if (str1.indexOf(".") != -1) {
            //如果有
            str = str.substr(0, str.indexOf(".") + str1.indexOf(".") + 1);
        }
    }
    //正则替换，保留数字和小数点
    str = str.replace(/[^\d^\.]+/g, '');

    //str.value = str.value.replace(/[^\d.]/g, "");
    //如果需要保留小数点后两位
    //str = str.replace(/\.\d\d\d$/, '$1$2$3');
    str = str.replace(/^(\-)*(\d*)\.(\d\d).*$/, '$1$2.$3');
    // str = str.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
    ///\.{3,}/g, ""


    return str;
}