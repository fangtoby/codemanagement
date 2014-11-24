/*
*	Cookie Class	
*
*	Date:11.11.2014  16:11
*	Author:fangtoby@live.cn
*/
define(function(require, exports, module) {
	var cookie = {
		getCookie:function(c_name) {
			if (document.cookie.length > 0) {
				var c_start = document.cookie.indexOf(c_name + "=")
				if (c_start != -1) {
					c_start = c_start + c_name.length + 1
					var c_end = document.cookie.indexOf(";", c_start)
					if (c_end == -1)
						c_end = document.cookie.length
					return unescape(document.cookie.substring(c_start, c_end))
				}
			}
			return ""
		},
		setCookie:function(c_name, value, expireHour) {
			var exdate = new Date()
			exdate.setTime(exdate.getTime() + expireHour * 60 * 60 * 1000)
			document.cookie = c_name
					+ "="
					+ escape(value)
					+ ((expireHour == null) ? "" : ";expires="
							+ exdate.toGMTString())
		},
		delCookie:function(c_name){
			this.setCookie(c_name, '', -1)
		},
		checkCookie:function() {
			var username = this.getCookie('username')
			if (username != null && username != "") {
				alert('Welcome again ' + username + '!')
			} else {
				username = prompt('Please enter your name:', "")
				if (username != null && username != "") {
					this.setCookie('username', username, 365)
				}
			}
		}
	}
	return cookie;
});
