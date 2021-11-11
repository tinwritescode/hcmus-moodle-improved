const TOPIC_HEIGHT = "500px";
// create a css class and add it to the html

$(document).ready(function () {
	// if the screen is less than or equal to sm screen, then display grid template columns of repeat(1, 1fr)
	if ($(window).width() <= 768) {
		$(".topics").css({ display: "grid", gridTemplateColumns: "repeat(1, 1fr)" });
	}
	// if the screen is less than or equal to md screen, then display grid template columns of repeat(2, 1fr)
	else if ($(window).width() <= 992) {
		$(".topics").css({ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" });
	}
	else {
		$(".topics").css({ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" });
	}

	$("ul.section").css("overflow-y", "scroll").css("height", TOPIC_HEIGHT);

	$(".has-blocks.mb-3").removeClass("has-blocks").css("width", "full");

	// zoom out body
	$("body").css("zoom", "0.7");
});
