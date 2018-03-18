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

		/*if(window.location.href.indexOf('?') != -1){
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


		var prev = prevPage.replace("#/", "")*/

		// App.trigger(App.Events.SHOW_BTN_REFERENCE);
		App.trigger(App.Events.SHOW_BTN_HOME);

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

