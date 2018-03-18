App.Views.ResizeView = Backbone.View.extend({
	
	initialize : function(obj){
		this.wrapper = $(".wrapper");
		this.addEvent();
		this.onResize();
	},

	// 페이지 렌더링
	render: function (){

	},

	// 보여주기
	show : function(){

	},

	// 보여주기 완료
	showComplete : function(){
		
	},

	// 감추기
	hide : function(){
		
	},

	// 감추기 완료
	hideComplete : function(){
		
	},

	// 이벤트 생성
	addEvent : function(){
		$(window).on("resize", _.bind(this.onResize, this));
	},

	// 이벤트 제거
	removeEvent : function(){
		
	},

	// 리사이즈
	onResize : function(e){
		App.GlobalVars.window_width = $(window).width();
		App.GlobalVars.window_height = $(window).height();

		App.trigger(App.Events.RESIZE_BROWSER);
	},

	resizeBg : function(){
		//var docH = $(document).height();

		this.wrapper.css("height", docH);
		//$(".wrapper").css("height", $(".contents").height()+105);
		//this.wrapper.css("background-size", "100% "+1000+"px");
	}
});