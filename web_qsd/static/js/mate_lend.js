$(function() {
    $.ajax({
        type: "get",
        url: "/trade/lender/searchBorrowers",
        dataType: "json",
        success: function (res) {
            var list = res;
            /* }
          })
      });*/

            //console.log(list[0].intend_money);
            for (var $i = 0; $i < list.length; $i++) {
                //console.log($i);
                //temp存放表单信息
                var temp = "";
                //if ($i == 0) {
                temp +=
                    '<li>' + "借款金额:" + '<strong>' + list[$i].intend_money + '</strong>' + "元" + '</li>' +
                    '<li>' + "起始日期:" + '<strong>' + list[$i].start_date + '</strong>'  + '</li>' +
                    '<li>' + "利率&nbsp&nbsp:" + '<strong>' + list[$i].pay_rate + '</strong>' + "%" + '</li>' +
                    '<li>' + "还款方式:" + '<strong>' + list[$i].pay_type + '</strong>'  + '</li>' +
                    '<li>' + "期限&nbsp&nbsp:" + '<strong>' + list[$i].limit_momths + '</strong>' + "月" + '</li>' +
                    '<li>' + "已筹集金额:" + '<strong>' + list[$i].raised_money + '</strong>' + "元" + '</li>';
                //console.log(temp);
                $("#list_info" + ($i+1)).html(temp);
                //计算还需要的金额
                $("#surplus" + ($i+1)).text(parseInt(list[$i].intend_money) - parseInt(list[$i].raised_money));
                //$("#list_info1").text("aaa</li>");
                console.log(temp);
            }


            //$("#my_money").text(my_money());
            //$("#my_rate").text(my_rate());
            //$("#my_month").text(my_month());

        }
    })
});
