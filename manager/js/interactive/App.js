var App = new (Backbone.Router.extend({
	Models: {},
	Collections: {},
	Views: {},

	routes: {
		":route":"onChangeRoute"
	},

	onChangeRoute : function(route){
		console.log("route : ", route);


		if(route == App.GlobalVars.ROUTER_START){
			//direction check

		}

		App.GlobalVars.current_route = route;
		if(App.GlobalVars.current_view != ""){
			App.GlobalVars.current_view.hide(route);
		}



		switch (route){
			case App.GlobalVars.ROUTER_START:
				App.GlobalVars.current_view = App.startView;
				break;
			case App.GlobalVars.ROUTER_MAIN:
				App.GlobalVars.current_view = App.mainView;
				break;
			case App.GlobalVars.ROUTER_SESSION:
				App.GlobalVars.current_view = App.sessionView;
				break;
			case App.GlobalVars.ROUTER_RESULT:
				App.GlobalVars.current_view = App.resultView;
				break;
			case App.GlobalVars.ROUTER_QNA:
				App.GlobalVars.current_view = App.qnaView;
				break;
			default :
				break;
		}

		App.GlobalVars.prev_page = App.GlobalVars.current_page;
		App.GlobalVars.current_page = "#/"+route;
		console.log(App.GlobalVars.prev_page , App.GlobalVars.current_page )
		App.GlobalVars.current_view.show(App.GlobalVars.prev_page);

	},

	start: function (options) {
		this.makeModel();			// 모델 생성하기
		this.makeCollection();		// 콜렉션 생성하기
		this.makeView();			// 뷰 생성하기

		this.onChangeRoute(this.GlobalVars.ROUTER_START,0);
		Backbone.history.start();


		// this.getData();
	},


	/////////////////////////////////////////////
	//	뷰 생성하기
	/////////////////////////////////////////////
	makeView : function(){
		this.resizeView = new App.Views.ResizeView();
		this.utilView = new App.Views.UtilView();
		this.startView = new App.Views.StartView({"el":$(".start-con")});
		this.mainView = new App.Views.MainView({"el":$(".main-con")});
		this.sessionView = new App.Views.SessionView({"el":$(".session-con")});
		this.resultView = new App.Views.ResultView({"el":$(".result-con")});
		this.qnaView = new App.Views.QnaView({"el":$(".qna-con")});
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
		isDebugMode : false,

		/* window size */
		window_width : 0,
		window_height : 0,

		current_index : -1,

		/* device size */
		DEVICE_WIDTH : 1024,
		DEVICE_HEIGHT : 748,

		/* data url */



		GET_ADMIN_SETTING_DATA_URL : "Http://d.wemix.co.kr/voting/api/get-admin-setting.asp", //?vkey=WD07

		SET_ADMIN_SESSION_START_URL : "Http://d.wemix.co.kr/voting/api/set-admin-session-start.asp", //?lstno=8&sessno=1
		SET_ADMIN_SESSION_END_URL : "Http://d.wemix.co.kr/voting/api/set-admin-session-end.asp", //?lstno=8&sessno=1

		SET_ADMIN_VOTION_START_URL : "Http://d.wemix.co.kr/voting/api/set-admin-voting-start.asp", //?lstno=8&qno=1&qnum=3&qopt=A
		SET_ADMIN_VOTION_END_URL : "Http://d.wemix.co.kr/voting/api/set-admin-voting-end.asp", //?lstno=8&qno=1&qnum=3&qopt=A
		SET_ADMIN_VOTION_STOP_URL : "Http://d.wemix.co.kr/voting/api/set-admin-voting-stop.asp", //?lstno=8&qno=1&qnum=3&qopt=A

		GET_ADMIN_QNA_URL : "Http://d.wemix.co.kr/voting/api/get-admin-qna.asp", //?lstno=8&sessno=1


        // debug
		DEBUG_GET_ADMIN_SETTING_DATA_URL : "json/get_admin_setting.json", //?vkey=WD07

		DEBUG_SET_ADMIN_SESSION_START_URL : "json/get_complete.json", //?lstno=8&sessno=1
		DEBUG_SET_ADMIN_SESSION_END_URL : "json/get_complete.json", //?lstno=8&sessno=1

		DEBUG_SET_ADMIN_VOTION_START_URL : "json/get_complete.json", //?lstno=8&qno=1&qnum=3&qopt=A
		DEBUG_SET_ADMIN_VOTION_END_URL : "json/set_admin_voting_end.json", //?lstno=8&qno=1&qnum=3&qopt=A
		DEBUG_SET_ADMIN_VOTION_STOP_URL : "json/get_complete.json", //?lstno=8&qno=1&qnum=3&qopt=A

		DEBUG_GET_ADMIN_QNA_URL : "json/get_admin_qna.json", //?lstno=8&sessno=1


		/* router menu */
		ROUTER_START : "start",
		ROUTER_MAIN : "main",
		ROUTER_SESSION : "session",
		ROUTER_RESULT : "result",
		ROUTER_QNA : "qna",


		current_route : "",
		current_view : "",
		prev_page : "",
		current_page : "",

		brochure_index : -1,
		keymsg_index : -1,

		json_setting_data : {},
		current_q_index : 0,
		current_session_index : 0,
		isShow_loading : false,
		isReset_session : false,

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
		var url = App.GlobalVars.GET_ADMIN_SETTING_DATA_URL;
		if(App.GlobalVars.isDebugMode) url = App.GlobalVars.GET_ADMIN_SETTING_DATA_URL;

		var data = {}
		App.getJsonData(url, data, this.getDataComplete)
	},

	getDataComplete : function(json){
		//console.log(json);
		App.trigger(App.Events.DATA_LOAD_COMPLETE, json)

		App.GlobalVars.LSTNO = json.lstno;
		App.GlobalVars.VTIME = json.vtime;
		App.GlobalVars.sessno = 0;

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