$(document).ready(function () {
	var now = new Date();

	$(".timeout").text(27 - now.getDay());
});