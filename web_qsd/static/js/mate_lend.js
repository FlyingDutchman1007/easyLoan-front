var url = decodeURI(window.location.href);
var argsIndex = url .split("?");
var money = argsIndex[1].split("&&")[0].split("=")[1];
var pay_type = argsIndex[1].split("&&")[1].split("=")[1];
var rate = argsIndex[1].split("&&")[2].split("=")[1];
var limit_months = argsIndex[1].split("&&")[3].split("=")[1];
$(function () {
    $("#my_money").text(money+"元");
    $("#my_rate").text(rate+"%");
    $("#my_month").text(limit_months+"月");
    $.ajax({
        type: "post",
        url: "192.168.0.195:8080/lendMatch",
        xhrFields: {
            withCredentials: true
        },
              contentType: "application/json; charset=utf-8",
              data: JSON.stringify({
                  "expectRate": rate,
                  "intendMoney": money,
                  "payType": pay_type,
                  "limitMonths": limit_months
              }),
        dataType: "json",
        success: function (list) {
            if (list.length == 0) {
                //未匹配到
                temp = " <img src=\"../../static/images/not_match.png\">" +
                    "<p><h1>似乎未匹配到用户~</h1></p>";
                $("#match_div").append(temp);
            } else {
                var page = 0;
                temp = "     <div id=\"myCarousel\" class=\"carousel slide  col-lg-12\"  data-interval=\"false\">\n" +
                    "                <!-- 轮播（Carousel）项目 -->\n" +
                    "                <div class=\"carousel-inner\">\n";
                for (var i = 0; i < list.length; i++) {
                    var type = "按月还";
                    if (list[i].payType == "3") {
                        type = "按季还";
                    }
                    var date = list[i].startDate.split("T")[0];
                    var unraisedMoney = list[i].intendMoney - list[i].raisedMoney;
                    var style_type = (i % 3) + 1;

                    if (i % 3 == 0 && page == 0) {
                        page = 1;
                        if(i == 0){
                            temp += "<div class=\"item active\">";
                        }else {
                            temp += "<div class=\"item\">";
                        }
                    }
                    temp +=
                        "<div id=\"pick_table" + i + "\" class=\"priceing-table-main\">\n" +
                        "\t\t\t<div class=\"col-md-4 price-grid\" style=\"padding-bottom: 30px\">\n" +
                        "\t\t\t\t<div class=\"price-block agile\">\n" +
                        "\t\t\t\t\t<div class=\"price-gd-top pric-clr" + style_type + "\">\n" +
                        "\t\t\t\t\t\t<h4>还需筹集金额</h4>\n" +
                        "\t\t\t\t\t\t<h3>" + unraisedMoney + "</h3>\n" +
                        "\t\t\t\t\t</div>\n" +
                        "\t\t\t\t\t<div class=\"price-gd-bottom\">\n" +
                        "\t\t\t\t\t\t<div class=\"price-list\">\n" +
                        "\t\t\t\t\t\t\t<ul>" +
                        '<li>' + "借单号&nbsp;:" + '<strong >' + list[i].billId + '</strong>' + '</li>' +
                        '<li>' + "借款金额:" + '<strong>' + list[i].intendMoney + '</strong>' + "元" + '</li>' +
                        '<li>' + "起始日期:" + '<strong>' + date + '</strong>' + '</li>' +
                        '<li>' + "利率&nbsp;&nbsp;:" + '<strong>' + list[i].payRate + '</strong>' + "%" + '</li>' +
                        '<li>' + "还款方式:" + '<strong>' + type + '</strong>' + '</li>' +
                        '<li>' + "期限&nbsp;&nbsp;:" + '<strong>' + list[i].limitMonths + '</strong>' + "月" + '</li>' +
                        '<li>' + "已筹集金额:" + '<strong>' + list[i].raisedMoney + '</strong>' + "元" + '</li>' +
                        "\t\t\t\t</ul>\n" +
                        "\t\t\t\t\t\t</div>\n" +
                        "\t\t\t\t\t\t<div class=\"price-selet pric-sclr" + style_type + "\">\n" +
                        "\t\t\t\t\t\t\t<a data-toggle=\"modal\" data-target=\"#lend_pick\" type=\"" + list[i].billId + "\" onclick=\"get_bill_id(this.type);\">借出</a>" +
                        "\t\t\t\t\t\t</div>\n" +
                        "\t\t\t\t\t</div>\n" +
                        "\t\t\t\t</div>\n" +
                        "\t\t\t</div>" +
                        "\t</div>";
                    if (i == list.length-1  || i % 3 == 2 && page == 1) {
                        page = 0;
                        temp += "</div>";
                    }
                }
                temp += "    </div>\n" +
                    "                <!-- 轮播（Carousel）导航 -->\n" +
                    "                <a class=\"left carousel-control\" href=\"#myCarousel\" role=\"button\" data-slide=\"prev\">\n" +
                    "                    <span class=\"glyphicon glyphicon-chevron-left\" aria-hidden=\"true\"></span>\n" +
                    "                    <span class=\"sr-only\">Previous</span>\n" +
                    "                </a>\n" +
                    "                <a class=\"right carousel-control\" href=\"#myCarousel\" role=\"button\" data-slide=\"next\">\n" +
                    "                    <span class=\"glyphicon glyphicon-chevron-right\" aria-hidden=\"true\"></span>\n" +
                    "                    <span class=\"sr-only\">Next</span>\n" +
                    "                </a>\n" +
                    "            </div>";
                console.info(temp);
                $("#match_div").append(temp);
            }
        },
        error: function () {
            temp = " <img src=\"../../static/images/not_match.png\">" +
                "<p><h1>似乎未匹配到用户~</h1></p>";
            $("#match_div").append(temp);
        }
    })
});

//获取当前时间
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    return currentdate;
}

//获取bill_id
function get_bill_id(arg) {
    $("#bill_id").text(arg);
}

$("#lend").click(function () {
    $.ajax({
        type: "POST",
        url: "192.168.0.195:8080/subLend",
        xhrFields: {
            withCredentials: true
        },
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
            "billId": $("#bill_id").text(),
            "lendMoney": $("#lend_money").val(),
            "intendLendDate": getNowFormatDate()
        }),
        dataType: "json",
        success: function (message) {
            if (message.state == "successful") {
                alert("借出成功");
            } else {
                alert("借出失败");
            }
        },
        error: function () {
            alert("借出失败，请稍后再试~");
        }
    })
});

//轮播效果js
window.addEventListener('load', function () {
    var carousels = document.querySelectorAll('.carousel_1');

    for (var i = 0; i < carousels.length; i++) {
        carousel(carousels[i]);
    }
});

function carousel(root) {
    var figure = root.querySelector('figure'),
        nav = root.querySelector('nav'),
        images = figure.children,
        n = images.length,
        gap = root.dataset.gap || 0,
        bfc = 'bfc' in root.dataset,
        theta = 2 * Math.PI / n,
        currImage = 0;
    setupCarousel(n, parseFloat(getComputedStyle(images[0]).width));
    window.addEventListener('resize', function () {
        setupCarousel(n, parseFloat(getComputedStyle(images[0]).width));
    });
    setupNavigation();

    function setupCarousel(n, s) {
        var apothem = s / (2 * Math.tan(Math.PI / n));

        figure.style.transformOrigin = '50% 50% ' + -apothem + 'px';

        for (var i = 0; i < n; i++) {
            images[i].style.padding = gap + 'px';
        }
        for (i = 1; i < n; i++) {
            images[i].style.transformOrigin = '50% 50% ' + -apothem + 'px';
            images[i].style.transform = 'rotateY(' + i * theta + 'rad)';
        }
        if (bfc) for (i = 0; i < n; i++) {
            images[i].style.backfaceVisibility = 'hidden';
        }
        rotateCarousel(currImage);
    }

    function setupNavigation() {
        nav.addEventListener('click', onClick, true);

        function onClick(e) {
            e.stopPropagation();
            var t = e.target;
            if (t.tagName.toUpperCase() != 'BUTTON') return;
            if (t.classList.contains('next')) {
                currImage++;
            } else {
                currImage--;
            }
            alert(currImage);
            rotateCarousel(currImage);
        }
    }
    function rotateCarousel(imageIndex) {
        figure.style.transform = 'rotateY(' + imageIndex * -theta + 'rad)';
    }
}
