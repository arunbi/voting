App.Views.QnaView = Backbone.View.extend({
	initialize : function(obj){
		this.addEvent();
		this.container = $(".qna-con");
		this.jsonData = ""
		this.timer;
		this.isContentsCurrent = true;
		this.isShowPopup = false;
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

        this.getQnaData();

	},

	// 보여주기 완료
	showComplete : function(){
		this.$el.off("webkitAnimationEnd");
		this.$el.removeClass("alphaIn_animate");
	},

	// 감추기
	hide : function(route){

        clearTimeout(this.timer);
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
		this.$el.find(".btn-current").on(App.GlobalVars.CLICK, _.bind(this.onClick_current, this))
		this.$el.find(".btn-all").on(App.GlobalVars.CLICK, _.bind(this.onClick_all, this))

		this.$el.find(".btn-close-qnapop").on(App.GlobalVars.CLICK, _.bind(this.onClick_pop_close, this))
        this.$el.find(".top-area .btn-back").on(App.GlobalVars.CLICK, _.bind(this.onClick_close, this));
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

    onClick_current : function(e){
		this.showContentsCurrent();
		return false
	},

	onClick_all : function(e){
		this.showContentsAll();
		return false
	},

	showBtnCurrent : function(){
        this.$el.find(".btn-current").removeClass("hide");
	},

	hideBtnCurrent : function(){
        this.$el.find(".btn-current").addClass("hide");
	},

	showBtnAll : function(){
        this.$el.find(".btn-all").removeClass("hide");
	},

	hideBtnAll : function(){
        this.$el.find(".btn-all").addClass("hide");
	},

	showContentsCurrent : function(){
        this.isContentsCurrent = true;
		var current = App.GlobalVars.current_session_index;

        this.hideBtnCurrent();
        this.showBtnAll();

        this.$el.find('.qna-session').addClass('hide');
        this.$el.find('.qna-session').eq(current).removeClass('hide');

        this.reloadQnaData();
	},

	showContentsAll : function(){
        this.isContentsCurrent = false;
        this.hideBtnAll();
        this.showBtnCurrent();

        this.$el.find('.qna-session').removeClass('hide');

        this.reloadQnaData();
	},

	onClick_list : function(e){
		var oneIndex = $(e.currentTarget).attr('data-one');
		var twoIndex = $(e.currentTarget).attr('data-two');
        this.setQnaPopup(oneIndex, twoIndex);
		this.showPopup();
		return false;
	},

    onClick_close : function(){
        this.goSession();
    },

	onClick_pop_close : function(){
		this.hidePopup()
		return false;
	},

	showPopup : function(){
        this.isShowPopup = true;
		this.$el.find('.qna-pop').removeClass('hide');
	},

	hidePopup : function(){
        this.isShowPopup = false;
        this.$el.find('.qna-pop').addClass('hide');
        this.getQnaData();
	},

	setQnaPopup : function(one, two){
        var session = this.getSession(one);
		var text = session[two].value;
		this.$el.find('.qna-pop p').text(text);
	},



    reloadQnaData: function(){
        clearTimeout(this.timer);
		if(!this.isShowPopup){
			this.timer = setTimeout(App.qnaView.getQnaData, 3000);
        }
	},

	getQnaData : function(){
        var url = App.GlobalVars.GET_ADMIN_QNA_URL;
        if(App.GlobalVars.isDebugMode) url = App.GlobalVars.DEBUG_GET_ADMIN_QNA_URL;

        var lstno = App.GlobalVars.json_setting_data.lstno;
        var sessno = App.GlobalVars.current_session_index+1;
        var data = {
            "lstno":lstno,
            "sessno":sessno+1
        }

        App.getJsonData(url, data, App.qnaView.onComplete_getQnaData)
	},

	onComplete_getQnaData : function(json){
        App.qnaView.jsonData = json;
        App.qnaView.setQnaData(json);
	},

	setQnaData : function(json){

        this.$el.find(".qna-area ol").children().remove();

		var len = json.result.length;

		for(var i = 0; i<len; i++){
			var qLen = 0;
			var session = this.getSession(i);


            qLen = session.length;

			/*<li class="qna-session">
					<b>Session 2</b>
				<ul>
					<li><a href="#">ics laba lama 3가지 약제가 하나의 흡입기에 들어간 약제는 나오나요?</a></li>
					<li><a href="#">경기도내 대표적인 신도시중 한 곳인 화성 동탄2신도시 23블록 부영아파트 입주민들이 입주 이후 5개월이 지나도록 하자보수가 답보상태에 머물고 있는 현실에 단단히 화가 났다.</a></li>
					<li><a href="#">경기도내 대표적인 신도시중 한 곳인 화성 동탄2신도시 23블록 부영아파트 입주민들이 입주 이후 5개월이 지나도록 하자보수가 답보상태에 머물고 있는 현실에 단단히 화가 났다.</a></li>
				</ul>
			</li>		*/

			var oneEle = '<li class="qna-session"><b>Session '+(i+1)+'</b><ul></ul></li>'

			this.$el.find(".qna-area ol").append(oneEle)


			for(var j=0; j<qLen; j++){
				var twoEle = '<li><a href="#" data-one="'+i+'" data-two="'+j+'">'+session[j].value+'</a></li>';
                this.$el.find(".qna-area ol>li").eq(i).find(">ul").append(twoEle);
			}

		}

        this.$el.find(".qna-area ol>li>ul>li>a").off(App.GlobalVars.CLICK);
        this.$el.find(".qna-area ol>li>ul>li>a").on(App.GlobalVars.CLICK, _.bind(this.onClick_list,this));

        if(this.isContentsCurrent){
            this.showContentsCurrent();
        } else {
            this.showContentsAll();
        }

        this.reloadQnaData();
	},

	getSession : function(index){
        var result = this.jsonData.result[index];
        var session = ""
        if(index==0){
            session = result.session1
        }else if(index==1){
            session = result.session2
        }else if(index==2){
            session = result.session3
        }else if(index==3){
            session = result.session4
        }else if(index==4){
            session = result.session5
        }else if(index==5){
            session = result.session6
        }
        return session
	},

    goSession : function(){
        App.GlobalVars.isReset_session = false;
        location.href = this.$el.find(".top-area .btn-back").attr("href");
    }


});

