App.Views.MainView = Backbone.View.extend({
	initialize : function(obj){
		this.addEvent();
		this.container = $(".main-con");
	},

	// 페이지 렌더링
	render: function (){

	},

	// 보여주기
	show : function(prevPage){

		if(window.location.href.indexOf('?') != -1){
			var hash, vars = [];
			var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

			for(var i = 0; i < hashes.length; i++)
			{
				hash = hashes[i].split('=');
				vars.push(hash[0]);
				vars[hash[0]] = hash[1];
			}

			localStorage.setItem("dno", hash[1]);
		}


		var prev = prevPage.replace("#/", "")

		// App.trigger(App.Events.SHOW_BTN_REFERENCE);
		App.trigger(App.Events.SHOW_BTN_HOME);

		this.$el.removeClass("hide");
		this.$el.on("webkitAnimationEnd", _.bind(this.showComplete, this));

		if(prev == App.GlobalVars.ROUTER_LIST){
			this.$el.addClass("slideIn_animate_ver");
		} else if(prev == App.GlobalVars.ROUTER_REFERENCE){
			this.$el.addClass("slideIn_animate_ver_rever");
		} else {
			this.$el.addClass("slideIn_animate_rever");
		}

	},

	// 보여주기 완료
	showComplete : function(){
		this.$el.off("webkitAnimationEnd");
		this.$el.removeClass("slideIn_animate_ver");
		this.$el.removeClass("slideIn_animate_ver_rever");
		this.$el.removeClass("slideIn_animate_rever");
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
		// this.$el.find(".btn-brochure").on(App.GlobalVars.CLICK, this.onClick_brochure)
	},

	// 이벤트 제거
	removeEvent : function(){

	},

	// 리사이즈
	onResize : function(e){
		var _this = App.view;
		var w = App.GlobalVars.window_width;
		var h = App.GlobalVars.window_height;
	}


});

