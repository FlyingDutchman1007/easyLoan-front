$(function(){
   $.ajax({
       type: "get",
       url: "/trade/borrower/unfinishedLoan",
       dataType: "json",
       success: function (res) {
           var list = res;
           var temp = "";
           var money = 0;

           for (ls in list) {
               //console.log($i);
               //temp存放表单信息
               if (ls != "state") {
                   if (ls == "pay_type" ) {
                       if (list[ls] == 1){
                           temp +=
                               '<td>' + "月" + '</td>';
                       } else{
                           temp +=
                               '<td>' + "季" + '</td>';
                       }
                   }else{
                       if(ls == "limit_nomths"){
                           temp +=
                               '<td>' + list[ls] + "月" + '</td>';
                       }else{
                           temp +=
                               '<td>' + list[ls] + '</td>';
                       }

                   }

               }

               if( ls == "intend_money" ){
                   money = parseInt(list[ls]);
               }
               if (ls == "raised_money"){
                   money -= parseInt(list[ls]);
               }
               /*
                '<td>' + list[$i].intend_money + '</td>' +
                '<td>' + list[$i].intend_money + '</td>' +
                '<td>' + list[$i].start_date + '</td>' +
                '<td>' + list[$i].rate + '</td>' +
                '<td>' + list[$i].pay_type + '</td>' +
                '<td>' + list[$i].limit_nomths + '</td>' +
                '<td>' + list[$i].raised_money + '</td>';
                */
           }
               //console.log(temp);
           $("#unfinished").html(temp);
           $("#money").text(money + "元");
               //计算还需要的金额
               //$("#surplus" + ($i+1)).text(parseInt(list[$i].intend_money) - parseInt(list[$i].raised_money));
               //$("#list_info1").text("aaa</li>");
               //console.log(temp);
           //}
       }
   });
});