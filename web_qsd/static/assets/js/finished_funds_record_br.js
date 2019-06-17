$(function(){
   $.ajax({
       type : "get",
       dataType : "json",
       url : "fin_rec.json",
       success : function (list) {
           for($i = 0;$i<list.length;$i++){
               var temp = "";
               var type = "按月付";
               if(list[$i].pay_type == "3"){
                   type = "按季付";
               }
               temp +=
                   '<tr>'+
                   '<td>' + list[$i].billId + '</td>' +
                   '<td>' + list[$i].money + "元" + '</td>' +
                   '<td>' + list[$i].interest + "元" + '</td>' +
                   '<td>' + list[$i].liquidatedMoney + "元" + '</td>' +
                   '<td>' + list[$i].totalMoney + "元" + '</td>' +
                   '<td>' + list[$i].rate + "%" + '</td>' +
                   '<td>' + type + '</td>' +
                   '<td>' + list[$i].limitMonths + "月" + '</td>' +
                   '<td>' + list[$i].startDate + '</td>' +
                   '<td>' + list[$i].settleDate + '</td>' +
                   '</tr>';
               $("#tbody").append(temp);
           }
       }
   });
});
