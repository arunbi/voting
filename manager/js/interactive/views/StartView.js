App.Views.StartView = Backbone.View.extend({
	initialize : function(obj){
		this.addEvent();
		this.container = $(".start-con");
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
	},

	// 이벤트 생성
	addEvent : function(){
		// this.$el.find(".btn-brochure").on(App.GlobalVars.CLICK, this.onClick_brochure)
		this.$el.find(".go-next").on(App.GlobalVars.CLICK, _.bind(this.onClick_next, this));
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

    onClick_next : function(e){
		var vkey = this.$el.find('input').val();
		this.checkInput(vkey);
		return false;
	},

	checkInput : function(vkey){
		if(vkey == ""){
			console.log('진행키를 입력해 주세요.')
		}else if(vkey.length != 4){
            console.log('진행키를 입력해 주세요.')
		}else{
            this.getSettingData(vkey)
		}
	},


	getSettingData : function(vkey){
        var url = App.GlobalVars.GET_ADMIN_SETTING_DATA_URL;
		if(App.GlobalVars.isDebugMode) url = App.GlobalVars.DEBUG_GET_ADMIN_SETTING_DATA_URL;

		var data = {"vkey":vkey}
		App.getJsonData(url, data, _.bind(this.onComplete_getSettingData, this))
	},

	onComplete_getSettingData : function(json){
        App.GlobalVars.json_setting_data = json;
       this.goMain();
	},

	goMain : function(){
        location.href = this.$el.find(".go-next").attr("href");
	}
});

