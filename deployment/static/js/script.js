$("#form").submit(function(e){
	e.preventDefault();
	var form = $(this)
	// passing data manually frm form..so must setup csrf manually
	var csrf_token = $('input[name="csrfmiddlewaretoken"]').val();
	$.ajax({
		type:'POST',
		url : form.attr("curl"),
		data : {'content': $("#content").val(),
				'todoid' : form.attr("todoid"),
				'csrfmiddlewaretoken' : csrf_token,
				},
		dataType : 'json',
		success : function(data){
			if(data.form_is_valid){
				form.trigger("reset");
				$(".partial-list").html(data.partial_list);
				form.attr("todoid","");
				$("#link").css("visibility","hidden");
			}
		}
	});
	e.preventDefault();

});

$("#list-wrapper").on("click",".edit",function(e){
	e.preventDefault();
	var id = $(this).attr("datacat-id");
	$("#form").attr("todoid", id);
	$("#content").val($("#content"+id).html());
	$("#link").css("visibility","visible");
	e.preventDefault();

});

$("#link").on("click",function(e){
	e.preventDefault();
	$("#form").trigger("reset");
	$("#form").attr("todoid","");
	$(this).css("visibility","hidden");
	e.preventDefault();
});

$("#list-wrapper").on("click",".delete",function(e){
	e.preventDefault();
	var deleteid = $(this).attr("datacat-id")
	$.ajax({
		type:'GET',
		url : $(this).attr("js-delete-url"),
		data : {'deleteid' : deleteid},
		dataType : 'json',
		success : function(data){
			if(data.is_deleted){
				$("#form").trigger("reset");
				$(".partial-list").html(data.partial_list);
				$("#form").attr("todoid","");
				$("#link").css("visibility","hidden");
			}
		}
	});
	e.preventDefault();
});

$("#list-wrapper").on("click",".completed",function(e){
	e.preventDefault();
	var cid = $(this).attr("datacat-id");
	$.ajax({
		type:'GET',
		url : $(this).attr("js-completed-url"),
		data : {'cid' : cid},
		dataType : 'json',
		success : function(data){
			if(data.is_completed){
				$("#form").trigger("reset");
				$(".partial-list").html(data.partial_list);
				$("#form").attr("todoid","");
				$("#link").css("visibility","hidden");
			}
		}
	});
	e.preventDefault();
});