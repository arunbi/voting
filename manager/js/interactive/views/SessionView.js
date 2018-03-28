App.Views.SessionView = Backbone.View.extend({
	initialize : function(obj){
		this.addEvent();
		this.container = $(".session-con");
		this.totalQuestion = "";
		this.currentQuestionIndex = 0;
		this.maxTime = 5;
		this.timerNum = 0;

		this.timer = "";
        this.swiper;

	},

	// 페이지 렌더링
	render: function (){

	},

	// 보여주기
	show : function(prevPage){



		this.$el.removeClass("hide");
		this.$el.on("webkitAnimationEnd", _.bind(this.showComplete, this));


        if(prevPage == "#/"+App.GlobalVars.ROUTER_RESULT || prevPage == "#/"+App.GlobalVars.ROUTER_QNA){
            console.log("prevPage : ", prevPage)
        } else {
            //reset
            console.log("prevPage reset: ", prevPage)
            this.resetEle();
            this.setEle();
        }

		if(prevPage == App.GlobalVars.ROUTER_MAIN){
			this.$el.addClass("alphaIn_animate");
		} else {
			this.$el.addClass("alphaIn_animate");
		}

        App.GlobalVars.isShow_loading = false;



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
            //this.swiper.slideTo(0);
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
	},

	// 이벤트 생성
	addEvent : function(){
		// this.$el.find(".btn-brochure").on(App.GlobalVars.CLICK, this.onClick_brochure)
		this.$el.find(".btn-start").on(App.GlobalVars.CLICK, _.bind(this.onClick_start, this));
		this.$el.find(".btn-stop").on(App.GlobalVars.CLICK, _.bind(this.onClick_stop, this));
		this.$el.find(".btn-result").on(App.GlobalVars.CLICK, _.bind(this.onClick_result, this));
		this.$el.find(".btn-qna").on(App.GlobalVars.CLICK, _.bind(this.onClick_qna, this));
		this.$el.find(".current").on(App.GlobalVars.CLICK, _.bind(this.onClick_current, this));

        this.$el.find(".btn-prev").on(App.GlobalVars.CLICK, _.bind(this.onClick_prev, this));
        this.$el.find(".btn-next").on(App.GlobalVars.CLICK, _.bind(this.onClick_next, this));
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

	onClick_prev : function(e){
		// this.prev();
        this.swiper.slidePrev()
	},

	onClick_next : function(e){
		// this.next();
        this.swiper.slideNext()
	},

    onClick_start : function(e){
		this.startTimer();
		this.showCount();
		this.hideBtnPrev();
		this.hideBtnNext();

		this.setStartData();
	},

    onClick_stop : function(e){
    	this.hideCount();
		this.stopTimer();
		this.resetTimer();
        this.checkBtn(this.currentQuestionIndex);

        this.setStopData();
	},

    onClick_result : function(e){
    	App.GlobalVars.isShow_loading = false;
        this.goResult();
    },

    onClick_qna : function(e){

    },

    onClick_current : function(e){
    	this.setEndData();
		return false;
	},

	resetEle: function(){
		console.log("resetttttt", $('.swiper-slide'))
        this.currentQuestionIndex = 0;
        App.GlobalVars.current_q_index = 0;
        this.checkBtn(0);
        $('.swiper-slide').remove();
        $(".swiper-wrapper").attr("style", "");
        if(this.swiper) this.swiper.destroy();
	},

    setEle : function(){
        this.totalQuestion = App.GlobalVars.json_setting_data.qlist.length;
        this.maxTime = App.GlobalVars.json_setting_data.vtime;

        var current = App.GlobalVars.current_session_index+1;
        this.$el.find('.current').text(current);

        var len = App.GlobalVars.json_setting_data.qlist.length;

        for(var i = 0; i<len; i++){
            var ele = '<li class="swiper-slide" style="background: url('+App.GlobalVars.json_setting_data.qlist[i].qimg+') 0 0 no-repeat; background-size: cover;"></li>'

            this.$el.find('.swiper-wrapper').append(ele);

            if(i !=this.currentQuestionIndex){
                this.hideQuestion(i)
            }
        }

        this.checkBtn(this.currentQuestionIndex);

        this.swiper = new Swiper('.swiper-container', {
            onSlideChangeEnd:this.onSwipeEnd
        });
	},

    onSwipeEnd: function(){
		var _this = App.sessionView;
		var sindex = _this.swiper.activeIndex;
        _this.currentQuestionIndex = sindex;
        App.GlobalVars.current_q_index = sindex;
        _this.checkBtn(_this.currentQuestionIndex);
        console.log(_this.currentQuestionIndex, _this.swiper.activeIndex)
	},

	prev : function(){
		var tempIndex = this.currentQuestionIndex-1;
		if(tempIndex<0){
			tempIndex = 0;
		}

        this.changeQuestion(tempIndex);
	},

	next : function(){
        var tempIndex = this.currentQuestionIndex+1;
        if(tempIndex>this.totalQuestion-1){
            tempIndex = this.totalQuestion-1;
        }

        this.changeQuestion(tempIndex);
	},

	changeQuestion : function(index){
		// this.hideQuestion(this.currentQuestionIndex);
        this.currentQuestionIndex = index;
        App.GlobalVars.current_q_index = index;
        // this.showQuestion(this.currentQuestionIndex);
        this.checkBtn(this.currentQuestionIndex);
	},

	showQuestion : function(index){
        this.$el.find('.swiper-wrapper li').eq(index).removeClass('hide');
	},

	hideQuestion : function(index){
        // this.$el.find('.swiper-wrapper li').eq(index).addClass('hide');
	},

	checkBtn : function(index){
		if(index==0){
			this.hideBtnPrev();
		}else{
			this.showBtnPrev();
		}

        if(index==this.totalQuestion-1){
            this.hideBtnNext();
        }else{
            this.showBtnNext();
        }
	},

	showBtnPrev : function(){
        this.$el.find(".btn-prev").removeClass('hide');
	},

	hideBtnPrev : function(){
        this.$el.find(".btn-prev").addClass('hide');
	},

	showBtnNext : function(){
        this.$el.find(".btn-next").removeClass('hide');
	},

	hideBtnNext : function(){
        this.$el.find(".btn-next").addClass('hide');
	},

	resetTimer : function(){
        this.timerNum = 0;
        var bar = $(".timer-guage");
        TweenMax.killTweensOf(bar);
        TweenMax.to(bar, 1, {width:"0%"});

	},

	startTimer : function(){
        var bar = $(".timer-guage")
        TweenMax.to(bar, 1, {width:(this.timerNum+1) * (100/this.maxTime)+"%", ease:Linear.easeNone});

		this.timer = window.setInterval(function(){
			var _this = App.sessionView;
			_this.timerEventHandler();
		}, 1000);
	},

	stopTimer : function(){
		window.clearInterval(this.timer);
	},

	timerEventHandler : function(){
		this.timerNum++
        // $(".timer-guage").css("width", this.timerNum * 10 + "%")

		var bar = $(".timer-guage")
        TweenMax.to(bar, 1, {width:(this.timerNum+1) * (100/this.maxTime)+"%", ease:Linear.easeNone});

        console.log("session timer : ", this.timerNum);
		if(this.timerNum == this.maxTime){
			this.completeTime();
		}

		// console.log(this.timerNum)
	},

	completeTime : function(){
		App.GlobalVars.isShow_loading = true;
		this.hideCount();
		this.stopTimer();
       	this.resetTimer();
       	this.goResult();
	},

	showCount : function(){
		this.$el.find('.timer-con').removeClass('hide');
		$(".swiper-container").css("pointer-events", "none")
	},

	hideCount : function(){
        this.$el.find('.timer-con').addClass('hide');
        $(".swiper-container").css("pointer-events", "auto")
	},

    setStartData : function(){
        var url = App.GlobalVars.SET_ADMIN_VOTION_START_URL;
        if(App.GlobalVars.isDebugMode) url = App.GlobalVars.DEBUG_SET_ADMIN_VOTION_START_URL;

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

        App.getJsonData(url, data, _.bind(this.onComplete_setStartData, this));
    },

    onComplete_setStartData: function(json){

    },

    setStopData : function(){
        var url = App.GlobalVars.SET_ADMIN_VOTION_STOP_URL;
        if(App.GlobalVars.isDebugMode) url = App.GlobalVars.DEBUG_SET_ADMIN_VOTION_STOP_URL;

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

        App.getJsonData(url, data, _.bind(this.onComplete_setStopData, this));
    },

    onComplete_setStopData: function(json){

    },



    setEndData : function(){
        var url = App.GlobalVars.SET_ADMIN_SESSION_END_URL;
        if(App.GlobalVars.isDebugMode) url = App.GlobalVars.DEBUG_SET_ADMIN_SESSION_END_URL;

        var lstno = App.GlobalVars.json_setting_data.lstno;
        var sessno = App.GlobalVars.current_session_index;
        var data = {
            "lstno":lstno,
            "sessno":sessno+1
        }

        App.getJsonData(url, data, _.bind(this.onComplete_setEndData, this));
    },

    onComplete_setEndData: function(json){
		this.goMain();
    },

	goMain : function(){
        location.href = this.$el.find(".current").attr("href");
	},

    goResult : function(){
        location.href = this.$el.find(".btn-result").attr("href");
    },

    goQna : function(){

    }
});

