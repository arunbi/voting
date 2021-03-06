App.Views.ResultView = Backbone.View.extend({
	initialize : function(obj){
		this.addEvent();
		this.container = $(".result-con");

        this.maxTime = 3;
        this.timerNum = 0;

        this.timer = "";
        this.timeArr = [];
	},

	// 페이지 렌더링
	render: function (){

	},

	// 보여주기
	show : function(prevPage){

		this.$el.removeClass("hide");
		this.$el.on("webkitAnimationEnd", _.bind(this.showComplete, this));

		if(prevPage == App.GlobalVars.ROUTER_MAIN){
			this.$el.addClass("alphaIn_animate");
		} else {
			this.$el.addClass("alphaIn_animate");
		}

		this.setEle();
		this.getResultData();

	},

	// 보여주기 완료
	showComplete : function(){
		this.$el.off("webkitAnimationEnd");
		this.$el.removeClass("alphaIn_animate");
	},

	// 감추기
	hide : function(route){

		this.$el.on("webkitAnimationEnd", _.bind(this.hideComplete, this));

		if(route == App.GlobalVars.ROUTER_MAIN){
			this.$el.addClass("alphOut_animate");
		} else {
			this.$el.addClass("alphOut_animate");
		}

	},

	// 감추기 완료
	hideComplete : function(){
		this.$el.addClass("hide");
		this.$el.off("webkitAnimationEnd");
		this.$el.removeClass("alphOut_animate");
        this.timerNum = 0;
        $(".loading-con .loading-box .load-guage").css("width", 0);
	},

	// 이벤트 생성
	addEvent : function(){
		// this.$el.find(".btn-brochure").on(App.GlobalVars.CLICK, this.onClick_brochure)
		this.$el.find(".btn-close-result").on(App.GlobalVars.CLICK, _.bind(this.onClick_close, this));
	},

	// 이벤트 제거
	removeEvent : function(){

	},

	// 리사이즈
	onResize : function(e){
		var _this = App.view;
		var w = App.GlobalVars.window_width;
		var h = App.GlobalVars.window_height;
	},

    setEle : function(){
		if(App.GlobalVars.isShow_loading){
			this.showLoading();
		}
	},

	showLoading : function(){
		this.$el.find('.loading-con').removeClass('hide-obj');
		// this.startTimer();

		var loadingBar = $(".loading-con .loading-box .load-guage");
        TweenMax.to(loadingBar, this.maxTime, {width:100+"%", ease:Cubic.easeInOut, onComplete:App.resultView.completeTime});
	},

	hideLoading : function(){
        this.$el.find('.loading-con').addClass('hide-obj');
	},

	startTimer : function(){
        this.timer = window.setInterval(function(){
            var _this = App.resultView;
            _this.timerEventHandler();
        }, 1000);
	},

	stopTimer : function(){
        window.clearInterval(this.timer);
	},

    timerEventHandler : function(){
        this.timerNum++
        console.log("result timer : ", this.timerNum);
        if(this.timerNum == this.maxTime){
            this.completeTime();
        }
    },

    completeTime : function(){
		console.log("completeTimecompleteTimecompleteTime")
    	// this.stopTimer();
		var _this = App.resultView
        _this.hideLoading();
        if(App.GlobalVars.isShow_loading){
            _this.startGraph();
        }

	},

	startGraph: function(){

        var graph = $(".graph");

        console.log("startGraph", graph)

		for(var i=0 ; i<graph.length ; i++){
            var graphObj = $(graph[i]);
            var graphNumObj = $(graphObj.find(".percent"));

            graphNumObj.css("opacity", 0);
            graphNumObj.html($(graph[i]).attr("data-percent")+"%")

			var per = parseInt( $(graph[i]).attr("data-percent") );

            TweenMax.to(graphObj, 1, {delay:i*0.2, height:per+"%", ease:Cubic.easeInOut});
            TweenMax.to(graphNumObj, 0.5, {delay:i*0.25, opacity:1, ease:Cubic.easeInOut});

		}
	},

    onClick_close : function(){
		this.goSession();
	},

	getResultData : function(){
        var url = App.GlobalVars.SET_ADMIN_VOTION_END_URL;
        if(App.GlobalVars.isDebugMode) url = App.GlobalVars.DEBUG_SET_ADMIN_VOTION_END_URL;

        var lstno = App.GlobalVars.json_setting_data.lstno;
        var qno = App.GlobalVars.json_setting_data.qlist[App.GlobalVars.current_q_index].qno;
        var qnum = App.GlobalVars.json_setting_data.qlist[App.GlobalVars.current_q_index].qnum;
        var qopt = App.GlobalVars.json_setting_data.qlist[App.GlobalVars.current_q_index].qopt;
        var data = {
            "lstno":lstno,
            "qno":qno,
			"qnum":qnum,
			"qopt":qopt
        }

        App.getJsonData(url, data, _.bind(this.onComplete_getResultData, this))
	},

    onComplete_getResultData : function(json){
		this.setResultData(json)
	},

	setResultData : function(json){
    	if(this.$el.find('.result-graph ol').children().length != 0){
            this.$el.find('.result-graph ol').children().remove();
		}

		var len = json.result.length;
		for(var i=0; i<len; i++){
			var ele = '<li>'
                // +'<div class="graph" style="height: '+json.result[i].percent+'%;">'
							+'<div class="graph" data-percent="'+json.result[i].percent+'">'
								+'<span class="percent" data-percent="'+json.result[i].percent+'">'+0+'%</span>'
								+'<span class="graph-guage"></span>'
							+'</div>'
							+'<span class="session-num">'+json.result[i].exam+'</span>'
						+'</li>'
			this.$el.find('.result-graph ol').append(ele);
		}

		var ml = 500 / len;
		$(".result-con .result-graph li").css("margin-left", ml);

        if(!App.GlobalVars.isShow_loading){
            this.startGraph();
        }
	},

	goSession : function(){
		App.GlobalVars.isReset_session = false;
        location.href = this.$el.find(".btn-close-result").attr("href");
	}

});

