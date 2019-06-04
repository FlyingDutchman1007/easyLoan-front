$("#repayment_record").DateTable ({
	"autoWidth": false,
	"serverSide": true,
	"ajax": {
		url: "/trade/borrower/loan",
		method: "POST",
		data: {
			"bill_id": $('#bill_id').val(),
			"start_date": $('#start_date').val(),
			"start_money": $('#start_money').val(),
			"unpay_money": $('#unpay_money').val(),
			"next_time_should_pay": $('#next_time_should_pay').val(),
			"liquidated_money": $('#liquidated_money').val(),
			"pay_rate": $('#pay_rate').val(),
			"pay_type": $('#pay_type').val(),
			"deadline": $('#deadline').val(),
			"start_interest": $('#start_interest').val()
		
			},
	},
		"columnDefs": [
		       {
			   "targets": 0,
			   "visible": false,
				},
		       {
			   targets: 11,
			   render: function (data, type,row) {
					   return '<button type="button" class="btn btn-info">还款</button>';
			   }
			  }			   
			],  
	"columns": [//返回的json数据在这里填充，注意一定要与上面的<th>数量对应，否则排版出现扭曲
	    { "data": "bill_id"},
	    { "data": "start_date" },
	    { "data": "start_interest" },
	    { "data": "start_money" },
	    { "data": "pay_rate" },
	    { "data": "pay_type" },
	    { "data": "next_time_should_pay" },
	    { "data": "unpay_money" },
		{ "data": "deadline" },
		{ "data": "liquidated_money" },
		{ "data": null }
		]
});