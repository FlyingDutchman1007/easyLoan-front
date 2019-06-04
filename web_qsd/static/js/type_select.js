		$("#borrower_btn").click(function(){
			$("#borrower_btn").attr("value",0);
			$("#borrower_btn").addClass("btn-success");			
			$("#lender_btn").removeClass("btn-success");
			
		});
		$("#lender_btn").click(function(){
			$("#borrower_btn").attr("value",1);
			$("#lender_btn").addClass("btn-success");			
			$("#borrower_btn").removeClass("btn-success");
		});