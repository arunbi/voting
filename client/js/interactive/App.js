var App = new (Backbone.Router.extend({
	Models: {},
	Collections: {},
	Views: {},

	routes: {
		":route":"onChangeRoute"
	},

	onChangeRoute : function(route){
		console.log("route : ", route);


		if(route == App.GlobalVars.ROUTER_MAIN){
			//direction check

		}

		App.GlobalVars.current_route = route;
		if(App.GlobalVars.current_view != ""){
			App.GlobalVars.current_view.hide(route);
		}



		switch (route){
			case App.GlobalVars.ROUTER_MAIN:
				App.GlobalVars.current_view = App.mainView;
				break;
			default :
				break;
		}

		App.GlobalVars.prev_page = App.GlobalVars.current_page;
		App.GlobalVars.current_page = "#/"+route;
		//console.log(App.GlobalVars.prev_page , App.GlobalVars.current_page )
		App.GlobalVars.current_view.show(App.GlobalVars.prev_page);

	},

	start: function (options) {
		this.makeModel();			// 모델 생성하기
		this.makeCollection();		// 콜렉션 생성하기
		this.makeView();			// 뷰 생성하기

		this.onChangeRoute(this.GlobalVars.ROUTER_MAIN,0);
		Backbone.history.start();


		this.getData();
	},


	/////////////////////////////////////////////
	//	뷰 생성하기
	/////////////////////////////////////////////
	makeView : function(){
		this.resizeView = new App.Views.ResizeView();
		this.utilView = new App.Views.UtilView();
		this.mainView = new App.Views.MainView({"el":$(".main-con")});
	},


	/////////////////////////////////////////////
	//	모델 생성하기
	/////////////////////////////////////////////
	makeModel : function(){

	},


	/////////////////////////////////////////////
	//	콜렉션 생성하기
	/////////////////////////////////////////////
	makeCollection : function(){

	},


	/////////////////////////////////////////////
	//	글로벌 변수
	/////////////////////////////////////////////
	GlobalVars : {
		isDebugMode : true,

		/* window size */
		window_width : 0,
		window_height : 0,

		current_index : -1,

		/* device size */
		DEVICE_WIDTH : 1024,
		DEVICE_HEIGHT : 748,

		/* data url */



		GET_USER_SETTING_DATA_URL : "Http://d.wemix.co.kr/voting/api/get-usr-setting.asp", //?lstno=8
		SET_VOTING_VALUE_URL :"Http://d.wemix.co.kr/voting/api/set-voting-value.asp",//?lstno=8&uno=1004&value=2
		QNA_URL : "Http://d.wemix.co.kr/voting/api/set-qna-value.asp", //?lstno=8&uno=1004&value=내용
		SURVEY_URL : "http://d.wemix.co.kr/voting/client/survey.asp", //?lstno=8&uno=1004
		AGENDA_URL : "http://d.wemix.co.kr/voting/client/agenda.asp", //?lstno=8&uno=1004

		// DEBUG_GET_USER_SETTING_DATA_URL : "json/get_user_setting.json", //?lstno=8
		DEBUG_SET_VOTING_VALUE_URL :"json/get_complete.json",//?lstno=8&uno=1004&value=2
		DEBUG_QNA_URL : "json/get_complete.json", //?lstno=8&uno=1004&value=내용
		DEBUG_SURVEY_URL : "json/get_complete.json", //?lstno=8&uno=1004
		DEBUG_AGENDA_URL : "json/get_complete.json", //?lstno=8&uno=1004


		/* router menu */
		ROUTER_MAIN : "main",
		current_route : "",
		current_view : "",
		prev_page : "",
		current_page : "",

		brochure_index : -1,
		keymsg_index : -1,

		CLICK: "click"

	},


	/////////////////////////////////////////////
	//	이벤트
	/////////////////////////////////////////////
	Events : {
		RESIZE_BROWSER : "resizebrowser",
		DATA_LOAD_COMPLETE : "dataloadcomplete"
	},


	/////////////////////////////////////////////
	//	공통
	/////////////////////////////////////////////

	changeHash : function(hash){
		window.location.hash = hash;
	},

	getData : function(){
		var url = App.GlobalVars.GET_USER_SETTING_DATA_URL;
		if(App.GlobalVars.isDebugMode) url = App.GlobalVars.DEBUG_GET_USER_SETTING_DATA_URL;

		var data = {}
		App.getJsonData(url, data, this.getDataComplete)
	},

	getDataComplete : function(json){
		//console.log(json);
		App.trigger(App.Events.DATA_LOAD_COMPLETE, json)

		App.GlobalVars.SET_VOTING_VALUE_URL = json.voting_url;
		App.GlobalVars.QNA_URL = json.qna_url;
		App.GlobalVars.SURVEY_URL = json.survey_url;
		App.GlobalVars.AGENDA_URL = json.agenda_url;

		$(".logo-img").attr("src", json.logo);
		$("body").css("background-color", json.bgcolor);
		$(".btn-number").css("color", json.txtcolor);
		$(".btn-number").css("border-color", json.linecolor);
		$(".alert-number").css("background-color", json.btnbgcolor);
		$(".alert-number").css("color", json.btntxtcolor);

		/*$(".logo").attr("href", json.logo);
		$(".logo").attr("href", json.logo);
		$(".logo").attr("href", json.logo);
		$(".logo").attr("href", json.logo);*/


/*
		“logo”: "http://d.wemix.co.kr/voting/uploads/logo.png",

			"bgcolor" : "#ffdf00",
			"txtcolor" : "#000000",
			"linecolor" : "#000000",
			"btnbgcolor" : "#333b58",
			"btntxtcolor" : "#ffdf00“
*/

	},


	/////////////////////////////////////////////
	//	서버 통신
	/////////////////////////////////////////////
	getJsonData : function(url, data, callback){
		$.ajax({
			url : url,
			data : data,
			dataType: "json",
			error : function(e){
				console.error('json parse error');
			},
			success : function(json){
				callback(json);
			}
		});
	}
}))();