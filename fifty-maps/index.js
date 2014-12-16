(function($) {
	var
		originData = {},
		content = "";

	// 创建表格，传入二维数组
	function createTable(data) {
		var
			table = "<table><tbody>*</tbody></table>",
			tr = "<tr>*</tr>",
			td = "<td>*</td>",
			temp;
		data.forEach(function(row, i) {
			row.forEach(function(cell, i) {
				row[i] = td.replace("*", cell);
			});
			data[i] = tr.replace("*", row.join(""));
		});
		return table.replace("*", data.join(""));
	}

	// 创建表格块，传入原始数据
	function createBlock(data) {
		for (var type in data) {
			if (data[type] instanceof Array) {
				content += createTable(data[type]);
			} else {
				content = "";
				arguments.callee(data[type]);
				$("." + type).html(content);
			}
		}
	}

	$(document).ready(function() {
		$.get("data.json", function(data) {
			originData = $.extend({}, data);
			createBlock(data);
		});
	});
})(jQuery);