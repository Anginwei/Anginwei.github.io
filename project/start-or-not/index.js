$(document).ready(function() {

	reflash();
});

function reflash() {
	var now = new Date(),
	   t;

	$(".day").text(26 - now.getDate());
	$(".hour").text(23 - now.getHours());
	$(".min").text(addZero(59 - now.getMinutes()));
	$(".sec").text(addZero(59 - now.getSeconds()));

	t = setTimeout("reflash()", 1000);
}

function addZero (i) {
	if (i<10) {
		i = "0" + i;
	}
	return i;
}