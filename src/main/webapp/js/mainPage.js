$(function() {
	// initLoadingLayer();
	menuClickAction();
	welcomePageInit();
	signOut();
	homePage();
});

// 加载欢迎界面
function welcomePageInit(){
	$('#panel').load('pagecomponent/welcomePage.jsp');
}

// 跳回首页
function homePage(){
	$('.home').click(function(){
		$('#panel').load('pagecomponent/welcomePage.jsp');
	})
}


// 动作延时
var delay = (function(){
		var timer = 0;
		return function(callback, ms){
		clearTimeout (timer);
		timer = setTimeout(callback, ms);
		};
	})();


// 侧边栏连接点击动作
function menuClickAction() {
	$(".menu_item").click(function() {
		var url = $(this).attr("name");
		$('#panel .panel').mLoading('show');
		delay(function(){
			$('#panel').load(url);
		}, 500);
	})
}

// 注销登陆
function signOut() {
	$("#signOut").click(function() {
		$.ajax({
			type : "GET",
			url : "account/logout",
			dataType : "json",
			contentType : "application/json",
			success:function(response){
				window.location.reload(true);
			},error:function(response){
				
			}
		})
	})
}

// 显示操作结果提示模态框
function showMsg(type, msg, append) {
	$('#info_success').removeClass("hide");
	$('#info_error').removeClass("hide");
	if (type == "success") {
		$('#info_error').addClass("hide");
	} else if (type == "error") {
		$('#info_success').addClass("hide");
	}
	$('#info_summary').text(msg);
	$('#info_content').text(append);
	$('#global_info_modal').modal("show");
}

// 处理 Ajax 错误响应
function handleAjaxError(responseStatus){
	var type = 'error';
	var msg  = '';
	var append = '';
	if (responseStatus == 403) {
		msg = '未授权操作';
		append = '对不起，您未授权执行此操作，请重新登陆';
		showMsg(type, msg, append);
		// 刷新重新登陆
		delay(function(){
			window.location.reload(true);
		}, 5000);
	} else if (responseStatus == 404) {
		msg = '不存在的操作';
		showMsg(type, msg, append);
	} else if (responseStatus == 430){
		msg = '您的账号在其他地方登陆';
		append = '请确认是否为您本人的操作。若否请及时更换密码';
		showMsg(type, msg, append);
		// 刷新重新登陆
		delay(function(){
			window.location.reload(true);
		}, 5000);
	}else if (responseStatus == 500) {
		msg = '服务器错误';
		append = '对不起，服务器发生了错误，我们将尽快解决，请稍候重试';
		showMsg(type, msg, append);
	} else {
		msg = '遇到未知的错误';
		showMsg(type, msg, append);
	};
}