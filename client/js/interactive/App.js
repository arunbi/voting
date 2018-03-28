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

		// this.onChangeRoute(this.GlobalVars.ROUTER_MAIN,0);
		// Backbone.history.start();

        if(window.location.href.indexOf('?') != -1){
            var hash, vars = [];
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

            for(var i = 0; i < hashes.length; i++)
            {
                hash = hashes[i].split('=');
                // vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }

            if(!vars.lstno){
            	alert("잘못된 접근입니다.")
                window.location = "index.html"
				return false;
			} else {
            	App.GlobalVars.lstno = vars.lstno;
            	App.GlobalVars.uno = vars.uno;
			}

        } else {
            alert("잘못된 접근입니다.")
            window.location = "index.html"
            return false;
		}

		this.getData();

        /*$(window).on("resize", _.bind(this.onResize, this));
        this.onResize();*/
/*
        $(window).on( "orientationchange", function( event ) {
            $( ".wrapper" ).text( "This device is in " + event.orientation + " mode!" );
        });
        $( window ).orientationchange();*/
        console.log("start")
	},


	/////////////////////////////////////////////
	//	뷰 생성하기
	/////////////////////////////////////////////
	makeView : function(){
		this.resizeView = new App.Views.ResizeView();
		this.utilView = new App.Views.UtilView();
		this.mainView = new App.Views.MainView({"el":$("#main-wrapper")});
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

		lstno : "",
        uno : "",

		/* data url */



		GET_USER_SETTING_DATA_URL : "Http://d.wemix.co.kr/voting/api/get-usr-setting.asp", //?lstno=8
		SET_VOTING_VALUE_URL :"Http://d.wemix.co.kr/voting/api/set-voting-value.asp",//?lstno=8&uno=1004&value=2
		QNA_URL : "Http://d.wemix.co.kr/voting/api/set-qna-value.asp", //?lstno=8&uno=1004&value=내용
		SURVEY_URL : "http://d.wemix.co.kr/voting/client/survey.asp", //?lstno=8&uno=1004
		AGENDA_URL : "http://d.wemix.co.kr/voting/client/agenda.asp", //?lstno=8&uno=1004

		DEBUG_GET_USER_SETTING_DATA_URL : "json/get_user_setting.json", //?lstno=8
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

		var data = {"lstno":App.GlobalVars.lstno}
		App.getJsonData(url, data, this.getDataComplete)
	},

	getDataComplete : function(json){
		//console.log(json);
		App.trigger(App.Events.DATA_LOAD_COMPLETE, json)

		App.GlobalVars.SET_VOTING_VALUE_URL = json.voting_url;
		App.GlobalVars.QNA_URL = json.qna_url;
		App.GlobalVars.SURVEY_URL = json.survey_url == "" ? "" : json.survey_url + "?lstno="+App.GlobalVars.lstno+"&uno="+App.GlobalVars.uno;
		if(App.GlobalVars.SURVEY_URL == ""){
			//dimmed
            $(".survey-btn").addClass("dimmed-btn")
		} else {
            $(".survey-btn").attr("href", App.GlobalVars.SURVEY_URL);
		}


		App.GlobalVars.AGENDA_URL = json.agenda_url == "" ? "" : json.agenda_url + "?lstno="+App.GlobalVars.lstno+"&uno="+App.GlobalVars.uno;
		if(App.GlobalVars.AGENDA_URL == ""){
            $(".agenda-btn").addClass("dimmed-btn")
		} else {
            $(".agenda-btn").attr("href", App.GlobalVars.AGENDA_URL);
		}


		$(".logo-img").attr("src", json.logo);
		$("#wrapper").css("background-color", json.bgcolor);
		$(".btn-number").css("color", json.txtcolor);

		$(".survey-btn").css("color", json.txtcolor);
		$(".survey-btn").css("border-bottom", "1px solid "+json.txtcolor);
		$(".qna-btn").css("color", json.txtcolor);
        $(".qna-btn").css("border-bottom", "1px solid "+json.txtcolor);
		$(".agenda-btn").css("color", json.txtcolor);
        $(".agenda-btn").css("border-bottom", "1px solid "+json.txtcolor);

		$(".btn-number").css("border-color", json.linecolor);
		$(".alert-number").css("background-color", json.btnbgcolor);
		$(".alert-number").css("color", json.btntxtcolor);

		$(".content-wrapper").removeClass("hide");

        // this.onChangeRoute(this.GlobalVars.ROUTER_MAIN,0);
        App.onChangeRoute(App.GlobalVars.ROUTER_MAIN,0);
        Backbone.history.start();

	},


    onResize : function(){
        var w = $(window).width();
        var h = $(window).height();

        var isPop = $("body").hasClass("show-popup");

        $(".wrapper .qna-popup textarea").blur();
        console.log($(".wrapper .qna-popup textarea"))

        if(w > h){
            // $("#no-btn").removeClass("hide");

            $("body").addClass("show-alert")
        } else {
            $("body").removeClass("show-alert")

            // $("#no-btn").addClass("hide");

        }



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