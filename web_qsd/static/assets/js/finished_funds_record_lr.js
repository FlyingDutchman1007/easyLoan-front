/*
 获取的json为数组类型
 */

$(function(){
   $.ajax({
       type : "get",
       dataType : "json",
       url : "lenderjs/finished_funds_record.json",
       async: true,
       success : function (res) {

           var list = res ;
           for($i = 0;$i<list.length;$i++){

               var temp = "";
               var all_money = 0;
               var start = new Date(list[$i].start_date);
               var end = new Date(list[$i].start_date);
               var m = (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth()- start.getMonth();


               console.log(list[$i].liquidated_money);

               all_money = parseFloat(list[$i].money) + parseFloat(list[$i].liquidated_money) + parseFloat(list[$i].real_interest);

               temp +=
                   '<tr>'+
                   '<td>' + list[$i].bill_id + '</td>' +
                   '<td>' + list[$i].start_date + '</td>' +
                   '<td>' + list[$i].money + "元" + '</td>' +
                   '<td>' + list[$i].real_interest + "元" + '</td>' +
                   '<td>' + list[$i].liquidated_money + "元" + '</td>' +
                   '<td>' + list[$i].rate + "%" + '</td>' +
                   '<td>' + list[$i].limit_months + "月" + '</td>' +
                   '<td>' + list[$i].pay_up_date + '</td>' +
                   '<td>' + '<strong>' + all_money + "元" + '<strong>' +  '</td>' +
                   '</tr>';

               $("#tbody").append(temp);

           }
       }
   });
});

/*
{
    "bill_id" : "002" ,
    "start_date" : "2016-11-23",
    "money" : "2000",
    "real_interest" : "3",
    "liquidated_money " : "0",
    "rate" : "2",
    "limit_months" : "3",
    "settle_date" : "2017-2-23"
  }
 */