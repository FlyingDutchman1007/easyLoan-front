/*
 获取的json为数组类型
 */
$(function(){
   $.ajax({
       type: "get",
       url: "lenderjs/unfinished_funds_record.json",
       dataType: "json",
       success: function (res) {

           var list = res;
           var temp = "";
           var money = 0;
           var pay_type = "月";

           for(var i = 0; i<list.length; i++){

               temp +=
                   '<tr>' +
                   '<td>' + list[i].bill_id +  '</td>' +
                   '<td>' + list[i].intend_money + "元" + '</td>' +
                   '<td>' + list[i].start_date + '</td>' +
                   '<td>' + list[i].rate + "%" + '</td>';

               if(list[i].pay_type == "1"){
                   temp +=
                       '<td>' + "按月付款" + '</td>';
               }else{
                   temp +=
                       '<td>' + "按季付款" + '</td>';
               }
               temp +=
                   '<td>' + list[i].limit_nomths + "月" + '</td>' +
                   '<td>' + list[i].raised_money +  "元" + '</td>' +
                   '<td>' + list[i].lend_money +  "元" + '</td>' +
                   '<td>' + list[i].excat_date + '</td>' +
                   '/<tr>'
               ;
                   /*
                   '<td>' + list[i].bill_id + "月" + '</td>' +
                    */
               $("#unfinished").append(temp);
           }
           /*
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
                   money = parseFloat(list[ls]);
               }
               if (ls == "raised_money"){
                   money -= parseFloat(list[ls]);
               }

           }
               //console.log(temp);
           $("#unfinished").html(temp);
           $("#money").text(money + "元");
               //计算还需要的金额
               //$("#surplus" + ($i+1)).text(parseFloat(list[$i].intend_money) - parseFloat(list[$i].raised_money));
               //$("#list_info1").text("aaa</li>");
               //console.log(temp);
           //}

            */
       }
   });
});