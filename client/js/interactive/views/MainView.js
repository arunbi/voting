App.Views.MainView = Backbone.View.extend({
	initialize : function(obj){
		this.addEvent();
		this.container = $("#main-wrapper");
		this.timer;
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
	},

	// 보여주기 완료
	showComplete : function(){
		this.$el.off("webkitAnimationEnd");
		this.$el.removeClass("alphaIn_animate");
	},

	// 감추기
	hide : function(route){

		this.$el.on("webkitAnimationEnd", _.bind(this.hideComplete, this));

		if(route == App.GlobalVars.ROUTER_REFERENCE){
			this.$el.addClass("slideOut_animate_ver_rever");
		} else if(route == App.GlobalVars.ROUTER_BROCHURE || route == App.GlobalVars.ROUTER_KEYMSG){
			this.$el.addClass("slideOut_animate_rever");
		} else if(route == App.GlobalVars.ROUTER_LIST) {
			this.$el.addClass("slideOut_animate_ver");
		} else {
			this.$el.addClass("alphOut_animate");

		}

		// this.$el.addClass("hide");
		//this.removeEvent();
		// this.hideComplete();



	},

	// 감추기 완료
	hideComplete : function(){
		this.$el.addClass("hide");
		this.$el.off("webkitAnimationEnd");
		this.$el.removeClass("slideOut_animate_ver_rever");
		this.$el.removeClass("slideOut_animate_rever");
		this.$el.removeClass("slideOut_animate_ver");
		this.$el.removeClass("alphOut_animate");
	},

	// 이벤트 생성
	addEvent : function(){
		this.$el.find(".btn-number").on(App.GlobalVars.CLICK, this.onClick_number);
        this.$el.find(".qna-btn").on(App.GlobalVars.CLICK, this.onClick_qna);

        $(".qna-popup .btn-register").on(App.GlobalVars.CLICK, this.sendQna);
        $(".qna-popup .btn-close").on(App.GlobalVars.CLICK, this.qnaClose);
        $(".complete-popup .btn-confirm").on(App.GlobalVars.CLICK, this.qnaClose);
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

    onClick_number: function(e){
		var num = $(e.currentTarget).attr("index")
		App.mainView.setSendNumber(num)

		e.preventDefault();
		return false;

	},

	setSendNumber: function(index){
		$(".alert-number p").html(index);

		clearTimeout(this.timer);
        this.timer = setTimeout(this.sendValue, 1000);

		// this.sendValue();
	},

	sendValue: function(){

        var url = App.GlobalVars.SET_VOTING_VALUE_URL;
        if(App.GlobalVars.isDebugMode) url = App.GlobalVars.DEBUG_SET_VOTING_VALUE_URL;

		App.getJsonData(url, {}, App.mainView.sendValueComplete)

	},

    sendValueComplete: function(){
		console.log("complete")
        $(".alert-number p").html("");

	},

    onClick_qna: function(){
		$("body").addClass("show-popup");
        $(".qna-popup").removeClass("hide");

        /*$(".qna-popup .btn-register").on(App.GlobalVars.CLICK, App.mainView.sendQna);
        $(".qna-popup .btn-close").on(App.GlobalVars.CLICK, App.mainView.qnaClose);
        $(".complete-popup .btn-confirm").on(App.GlobalVars.CLICK, App.mainView.qnaClose);*/

	},

	sendQna: function(){
        $(".qna-popup").addClass("hide");
        $(".complete-popup").removeClass("hide");
	},

	qnaClose: function(){
        $("body").removeClass("show-popup");
        $(".qna-popup").addClass("hide");
        $(".complete-popup").addClass("hide");
	}




});

