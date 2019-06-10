$(function(){
   $.ajax({
       type: "get",
       url: "ufrd.json",
       dataType: "json",
       success: function (res) {
           var list = res;
           var temp = "";
           var money = 0;
           for (ls in list) {
               //temp存放表单信息
			   temp += '<td>' + list[ls].bill_id + '</td>';
			   temp += '<td>' + list[ls].intend_money + '</td>';
			   temp += '<td>' + list[ls].start_date + '</td>';
			   temp += '<td>' + list[ls].rate + '</td>';
			   if (list[ls].pay_type == 1){
                    temp += '<td>' + '按月还' + '</td>';
                       } else{
					temp += '<td>' + '按季还' + '</td>';
                       }
				temp += '<td>' + list[ls].limit_months + '</td>';
				temp += '<td>' + list[ls].raised_money + '</td>';				
				money = list[ls].intend_money - list[ls].raised_money
           }
           $("#unfinished").html(temp);
           $("#money").text(money + "元");
       }
   });
});
