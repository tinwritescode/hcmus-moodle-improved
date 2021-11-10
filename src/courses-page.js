const TOPIC_HEIGHT = "500px";
// create a css class and add it to the html

$(document).ready(function () {
	$(".topics").css({ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" });

	$("ul.section").css("overflow-y", "scroll").css("height", TOPIC_HEIGHT);

	$(".has-blocks.mb-3").removeClass("has-blocks").css("width", "full");

	// zoom out body
	$("body").css("zoom", "0.7");
});
