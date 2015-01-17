(function() {
	$(document).ready(function() {
		/*
		 * 初始化Wtabbar
		 */
		var navList = $("#nav-list"),
			skillChart = $("#skill-chart");

		navList.Wtabbar({
			switchAnim: switchAnim,
			autoTab: false
		});
		skillChart.Wtabbar({
			switchAnim: switchAnim,
			autoTab: false
		});

		// 图表分类切换
		$(".skill-chart-prev").click(function() {
			skillChart.Wtabbar("switchTab", "prev");
		});
		$(".skill-chart-next").click(function() {
			skillChart.Wtabbar("switchTab", "next");
		});


		// 动画相关
		var animEndEvent = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
			animState = {
				endAll: true,
				endCur: false,
				endTar: false
			};

		// 结束动画后清除动画类并还原状态指针
		function onEndAnim(cur, tar) {
			animState.endAll = true;
			animState.endCur = false;
			animState.endTar = false;
			cur.removeAttr("class");
			tar.removeAttr("class");
			//$("#content").removeAttr("style");
		}

		// 动画切换控制
		function switchCtrl($curCon, $tarCon, outClass, inClass) {
		    //$("#content").css("overflow", "hidden");
			$curCon.addClass("animated " + outClass).one(animEndEvent, function() {
				$curCon.hide();
				animState.endCur = true;
				if (animState.endTar) {
					onEndAnim($curCon, $tarCon);
				}
			});
			$tarCon.show().addClass("animated " + inClass).one(animEndEvent, function() {
				animState.endTar = true;
				if (animState.endCur) {
					onEndAnim($curCon, $tarCon);
				}
			});
		}

		function switchAnim(data) {
			var $curCon = $(data.curCon),
				$tarCon = $(data.tarCon),
				$curTab = $(data.curTab),
				$tarTab = $(data.tarTab),
				i = data.i,
				j = data.j,
				// 动画类
				anim = {
					outClassI: "",
					inClassI: "",
					outClassJ: "",
					inClassJ: ""
				};

			if (this.id == "nav-list") {
                $.extend(anim, {
                    outClassI: "rotateOutUpLeft",
                    inClassI: "rotateInUpLeft",
                    outClassJ: "rotateOutDownRight",
                    inClassJ: "rotateInDownRight"
                });
			} else if (this.id == "skill-chart") {
                $.extend(anim, {
                    outClassI: "flipOutY",
                    inClassI: "flipInY",
                    outClassJ: "flipOutY",
                    inClassJ: "flipInY"
                });
			}

			if (animState.endAll) {
				animState.endAll = false;
				$curTab.toggleClass("active");
				$tarTab.toggleClass("active");
				if (i < j) {
					switchCtrl($curCon, $tarCon, anim.outClassI, anim.inClassI);
				} else {
					switchCtrl($curCon, $tarCon, anim.outClassJ, anim.inClassJ);
				}
			}
		}

		/*
		 * 初始化headroom
		 */
		var nav = document.querySelector("#nav-list"),
			footer = document.querySelector("footer");
		new Headroom(nav, {
			"tolerance": 0,
			"offset": 0,
			"classes": {
				"initial": "animated",
				"pinned": "slideInDown",
				"unpinned": "slideOutUp"
			}
		}).init();
		new Headroom(footer, {
			"tolerance": 0,
			"offset": 0,
			"classes": {
				"initial": "animated",
				"pinned": "slideInUp",
				"unpinned": "slideOutDown"
			}
		}).init();

		/*
		 * 技能图表数据
		 */
		var sce = document.querySelector("#skill-chart-exp").getContext("2d"),
			sco = document.querySelector("#skill-chart-other").getContext("2d"),
			data = [{
				labels: ["HTML", "CSS", "jQuery", "JavaScript", "AJAX", "LESS"],
				datasets: [{
					fillColor: "rgba(151,187,205,0.9)",
					strokeColor: "rgba(151,187,205,1)",
					pointColor: "rgba(151,187,205,1)",
					pointStrokeColor: "#fff",
					data: [75, 65, 50, 70, 40, 70]
				}]
			}, {
				labels: ["沟通", "学习", "管理"],
				datasets: [{
					fillColor: "rgba(151,187,205,0.9)",
					strokeColor: "rgba(151,187,205,1)",
					data: [50, 60, 40]
				}]
			}],
			options = [{
				scaleOverride: true,
				scaleSteps: 4,
				scaleStepWidth: 25,
				scaleStartValue: 0,
				scaleLineWidth: 2,
				scaleLineColor: "rgba(255,255,255,0.5)",
				angleLineWidth: 2,
				angleLineColor: "rgba(255,255,255,0.5)",
				pointLabelFontSize: 18,
				pointLabelFontColor: "#f7fcfe",
			}, {
				scaleOverride: true,
				scaleSteps: 4,
				scaleStepWidth: 25,
				scaleStartValue: 0,
				scaleLineWidth: 2,
				scaleLineColor: "rgba(255,255,255,0.5)",
				scaleFontFamily: '"microsoft yahei", simhei, simsun, arial',
				scaleFontSize: 18,
				scaleFontColor: "#f7fcfe",
				scaleGridLineColor: "rgba(255,255,255,0.2)",
				scaleGridLineWidth: 2,
				barValueSpacing: 25
			}];

		new Chart(sce).Radar(data[0], options[0]);
		new Chart(sco).Bar(data[1], options[1]);
	});
})();