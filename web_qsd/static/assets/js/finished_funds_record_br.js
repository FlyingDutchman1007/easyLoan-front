$(function(){
   $.ajax({
       type : "get",
       dataType : "json",
       url : "/trade/borrower/finishedLoan",
       success : function (res) {

           var list = res ;
           for($i = 0;$i<list.length;$i++){

               var temp = "";
               var type = "月";
               var all_money = 0;
               console.log($i);
               /*
               list[$i].bill_id = ;
               list[$i].start_date = ;
               list[$i].money = ;
               list[$i].interest = ;
               list[$i].rate = ;
               list[$i].pay_type = ;
               list[$i].limit_months = ;
               list[$i].settle_date = ;
                */
               if(list[$i].pay_type == "3"){
                   var type = "季";
               }
               all_money = parseInt(list[$i].money) + parseInt(list[$i].interest);

               temp +=
                   '<tr>'+
                   '<td>' + list[$i].bill_id + '</td>' +
                   '<td>' + list[$i].start_date + '</td>' +
                   '<td>' + list[$i].money + "元" + '</td>' +
                   '<td>' + list[$i].interest + "元" + '</td>' +
                   '<td>' + list[$i].rate + "%" + '</td>' +
                   '<td>' + type + '</td>' +
                   '<td>' + list[$i].limit_months + "月" + '</td>' +
                   '<td>' + list[$i].settle_date + '</td>' +
                   '<td class="text-success">' + all_money + "元" + '</td>' +
                   '</tr>';

               $("#tbody").append(temp);

           }
       }
   });
});

/*
"bill_id" : "001" ,
    "start_date" : "2018-07-06",
    "money" : "1000",
    "interest" : "100",
    "rate" : "1",
    "pay_type" : "1",
    "limit_nomths" : "5",
    "settle_date" : "2018-12-06"
 */