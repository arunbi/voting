App.Views.UtilView = Backbone.View.extend({

	initialize : function(obj){
		// 숫자 유효성검사 정규식
		this.EXP_NUMBER = /^[0-9]*$/;
		// 핸드폰 번호 유효성검사 정규식
		this.EXP_MOBILENUMBER = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
		// 공백 유효성검사 정규식
		this.EXP_BLANK = /^\s+|\s+$/g;
		// 이메일 유효성검사 정규식
		this.EXP_EMAIL = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

	},

	getBrowserLanguage : function(){
		var lang = "";

		if(navigator.appName == 'Netscape'){
			lang = navigator.language;
		}else{
			lang = navigator.userLanguage;
		}

		// 국가코드 앞 2글자만 자름
		lang = lang.substr(0, 2);
		return lang
	},

	// 주소창 파라미터 가져오기
	getUrlParameter : function (){
		var ParameterObject = new Object();
		var locate = location.href;

		if(locate.indexOf("?")==-1){
			return ParameterObject;
		}

		var parameter = locate.split("?")[1];
		parameter = parameter.split("#")[0];
		var paramAreay = parameter.split("&");
		for ( var i=0; i<paramAreay.length; i++ )
		{
			var tem = paramAreay[i].split("=");
			ParameterObject[tem[0]] = tem[1];
		}
		getUrlParameter = function () { return ParameterObject; }
		return ParameterObject;
	},

	setParam : function(){
		var obj = this.getUrlParameter();
		var strParam = "parameter =  ";
		var isParam = false;

		for(var i in obj){
			isParam = true;
			strParam = strParam + i+":"+obj[i]+" / ";
		}

		if(!isParam) strParam = strParam +"none";

		$(".temp-param").html(strParam);
	},

	// 1차 함수
	linearFunc : function(x, a, b, c, d){
		var y = (d-c)/(b-a)*(x-a)+c;
		return y;
	},

	// 1차 방정식
	linearEquation : function(a, b, c){
		var xx = (b*c)/a;
		return xx
	},

	// 10의 자리 체크
	digit : function($num){
		var tempNum = 0;

		if($num<10){
			tempNum = "0"+$num;
		}else{
			tempNum = $num;
		}

		return tempNum;
	},

	// 크기 비율 계산
	sumSizePer : function(targetWidth, targetHeight, defaultWidth, defaultHeight){
		var perWidth = targetWidth / defaultWidth;
		var perHeight = targetHeight / defaultHeight;
		var per = 0;

		if(perWidth > perHeight){
			per = perWidth;
		}else{
			per = perHeight;
		}

		return per;
	},

	// 버전 셋팅(이미지, js, css등 캐쉬문제를 위한 부분)
	setVersion : function(){
		// version-change-img
		// version-change-css
		// version-change-js
		this.versionChangeImg();
		this.versionChangeCss();
		this.versionChangeJs();
	},

	versionChangeImg : function(){
		var len = $(".version-change-img").length;
		var i = 0;

		for(i=0; i<len; i++){
			var src =  $(".version-change-img").eq(i).attr("src")+"?ver="+App.GlobalVars.ver;
			$(".version-change-img").eq(i).attr("src", src)
		}
	},

	versionChangeCss : function(){
		var len = $(".version-change-css").length;
		var i = 0;

		for(i=0; i<len; i++){
			var href =  $(".version-change-css").eq(i).attr("href")+"?ver="+App.GlobalVars.ver;
			$(".version-change-css").eq(i).attr("href", href)
		}
	},

	versionChangeJs : function(){
		var len = $(".version-change-js").length;
		var i = 0;

		for(i=0; i<len; i++){
			var src =  $(".version-change-js").eq(i).attr("src")+"?ver="+App.GlobalVars.ver;
			$(".version-change-js").eq(i).attr("src", src)
		}
	},

	// 오름차순 정렬
	compNumber:function(a,b){
		return a - b;
	},

	// 내림차순 정렬
	compNumberReverse : function(a,b){
		return b - a;
	},

	// 3자리수 마다 쉼표
	commify : function (n) {
		var reg = /(^[+-]?\d+)(\d{3})/;   // 정규식
		n += '';                          // 숫자를 문자열로 변환

		while (reg.test(n))
			n = n.replace(reg, '$1' + ',' + '$2');

		return n;
	},

	// 정규식 검사하기
	checkExp : function(exp, val){
		var isExpTest = true;
		if(exp == this.EXP_BLANK){
			// 공백체크 경우
			if(val.replace( exp, '' ) == ""){
				isExpTest = false;
			}
		}else{
			// 공백체크 아닌 경우
			if(!exp.test(val)){
				isExpTest = false;
			}
		}
		return isExpTest;
	},


	// 디바이스에 맞게 이미지 넣어주기 (웹 or 모바일)
	imgMatchingDevice : function(){
		var deviceMode = App.GlobalVars.currentDevice;
		var w = App.GlobalVars.DEVICE_TYPE_WEB;
		var t = App.GlobalVars.DEVICE_TYPE_TABLET;
		var i, len, prop, secectorImg;

		for( i=0, len=$(".changable").length; i<len; i++ ) {
			prop = ( deviceMode == w || deviceMode == t ) ? 'data-web-img-url' : 'data-mobile-img-url';
			secectorImg = $(".changable").eq(i);
			secectorImg.attr( {src:secectorImg.attr(prop)} );
		}
	}
});
