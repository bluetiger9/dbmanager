$(document).ready(function(){
		
	$( "#button" ).button();
	
	$("#menu-buttons").css("left", (($(window).width() - 126) / 2) + $(window).scrollLeft() + "px");

	$(window).resize(function(){
		$("#menu-buttons").css("left", (($(window).width() - 126) / 2) + $(window).scrollLeft() + "px");
	});
	
	getServer();
});