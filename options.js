$(function () {
	$("#save").click(function () {
		localStorage["src_pages"] = $("#src_pages").val();
		localStorage["dst_page"] = $("#dst_page").val();
		localStorage["duration"] = $("#duration").val();
	});
	if (localStorage["src_pages"]) {
		$("#src_pages").val(localStorage["src_pages"]);
	}
	if (localStorage["dst_page"]) {
		$("#dst_page").val(localStorage["dst_page"]);
	}
	if (localStorage["duration"]) {
		$("#duration").val(localStorage["duration"]);
	}
});