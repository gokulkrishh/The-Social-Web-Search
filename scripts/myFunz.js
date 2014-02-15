$(document).ready(function() {
	$(".container").on('click','.more, .searchbtn',function(){
	var i = 0;
	var value = $("#search").val();
	if(!$(".searchresult").html())
	{
		$(".result-container").append("<h3 class='searchresult'> Search Result for "+ 
		value+"</h3>");
	}
	$("#img-spinner").show();
	$.ajax({
		type : 'GET',
		crossDomain : true,
		dataType : 'jsonp',
		url : 'http://socialmention.com/search?q='+value+'&f=jsonp&t=all',
		success:function(data){
			$.each(data,function(key,value){
				while(i<5)
				{
					var d = new Date(data.items[i].timestamp * 1000);
					var date = d.toString().split(" ");
					$(".result-container").append
					("<div class='container well' style='margin-bottom:10px'>" + 
					"<h2 class='heading'><a href='"+data.items[i].link+"' target='_blank'>"
					+data.items[i].title+ "</a></h2>" + 
					"" + "<div class='blogtime'>"+ date[0]+" " + date[1]+" " + date[2]+" "+ date[3]+"</div>"+
					"" + "<div class='desc'>" +data.items[i].description+ "</div>" +
					"" + "<div class='link'>"+data.items[i].link+ "</div>" + 
					"" + "<div class='share'>" + "<div class='g-plusone' data-annotation='inline' data-width='300'></div>" + 
					""+ "</div>" + "</div>");
					i++;
					var date = "";
					$("#img-spinner").hide();
				}
			});
		},
		error:function(err){
			console.log("Error");
			$("#img-spinner").hide();
		}
	});
	$("#img-spinner").show();
	$.ajax({
			type : 'GET',
			crossDomain : true,
			dataType : 'jsonp',
			url : 'http://api.duckduckgo.com/?q='+value+'&format=json',
			success:function(data){
			var i1 = 0;
				$.each(data,function(key,value){
					while(i1<4)
					{
						$(".result-container").append
						("<div class='container well' style='margin-bottom:10px'>" + 
						"<h2 class='heading'><a href='"+data.RelatedTopics[i].Text+"' target='_blank'>"
						+data.RelatedTopics[i].FirstURL+ "</a></h2>" + 
						"" + "<div class='desc'>" +data.RelatedTopics[i].Text+ "</div>" +
						"" + "<div class='link'>"+data.RelatedTopics[i].FirstURL+ "</div>"
						"" + "<div class='share'>" + "<div class='g-plusone' data-annotation='inline' data-width='300'></div>" + 
						""+ "</div>" + "</div>");
						i1++;
						$("#img-spinner").hide();
					}
				});
				if(!$(".more").html())
				{
					$(".moreBtn").append("<button title='click to get more result' class='more btn btn-primary btn-sm'>More Results</button><br>");
				}
			},
			error:function(err){
				console.log("Error");
				$("#img-spinner").hide();
			}
		});
	});
		//ajax image loader gif
	$("#spinner").bind('ajaxSend',function(){
		$(this).show();
	}).bind('ajaxError',function(){
		$(this).hide();
	}).bind('ajaxStop',function(){
		$(this).hide();
	});
});

