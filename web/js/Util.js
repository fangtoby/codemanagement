var Tools = {
  /*
   *  version (判断是否为ie浏览器)
   *
   * @date 2014/09/13 16/06/48
   */
  ie: /*@cc_on!@*/ false,
  /*
   * version (判断是否为ie6)
   *
   * @date 2014/09/13 16/06/48
   */
  ie6: navigator.appVersion.indexOf("MSIE 6.0") != -1,
  /*
   * version (判断浏览器是否支持html5)
   *
   * @date 2014/09/13 16/06/48
   */
  isWebkit: function (argument) {
    var userAgent = navigator.userAgent.toLowerCase();
    return /applewebkit/.test(userAgent);
  },
  /*
   * dom (根据id获取元素)
   *
   * @date 2014/09/13 16/06/48
   */
  $: function(id, docObj) {
    if (!docObj) {
      var doc = document;
    }
    return doc.getElementById(id);
  },
  /*
   * Elment (根据类获取元素)
   *
   * @date 2014/09/13 16/06/48
   */
  getElementsByClassName: function(obj, name) {
    var checkNode = function(node, cname, arr) {
      if (node.hasChildNodes()) {
        var obj = node.childNodes;
        for (var i = 0; i < obj.length; checkNode(obj[i], cname, arr), i++);
      }

      try {
        if (node.className != null) {
          var cnames = node.className.split(' ');
          for (var i = 0; i < cnames.length;
            (cnames[i] == cname) ? arr.push(node) : null, i++);
        }
      } catch (err) {}
    }
    var arr = [];
    checkNode(obj, name, arr);
    return arr;
  },
  /*
   * object (判断对象中成员是否为空)
   *
   * @date 2014/09/13 16/06/48
   */
  isDefined: function(obj, field) {
    return typeof(obj[field]) != "undefined";
  },
  /*
   * function (判断是否为方法)
   *
   * @date 2014/09/13 16/06/48
   */
  isFunction: function(obj) {
    return !!(obj && obj.constructor && obj.call && obj.apply);
  },
  /*
   * function (判断是否为数组)
   *
   * @date 2014/10/20 16/06/48
   */
  isArray:function(o){
  	return Object.prototype.toString.call(o) === '[object Array]';
  },
  /*
   * string (判断是否为字符串)
   *
   * @date 2014/09/13 16/06/48
   */
  isString: function(str) {
    return (str && typeof(str) == 'string');
  },
  /*
   * object (判断是否为对象)
   *
   * @date 2014/09/13 16/06/48
   */
  isObject: function(obj){
    return (obj && typeof(obj) == 'object');
  },
  /*
   * int (判断是否为数字)
   *
   * @date 2014/09/13 16/06/48
   */
  isNumber: function(interget){
    return (interget && isNaN(interget));
  },
  /*
   * int (字符串转数字)
   *
   * @date 2014/09/13 16/06/48
   */
  getNumber : function(value) {
    return value ? parseInt(value) : 0;
  },
  /*
   * Element (创建元素)
   *
   * @date 2014/09/13 16/06/48
   */
  createElement: function(tName, docObj) {
    if (!docObj) {
      var doc = document;
    }
    return doc.createElement(tName);
  },
  /*
   * Element (为元素添加样式)
   *
   * @date 2014/09/13 16/06/48
   */
  css: function(element, styles) {
    var style = element.style;
    for (var name in styles) {
      style[name] = styles[name];
    }
  },
  /*
   * Element (获取元素的位置)
   *
   * @arguments ele
   * @date 2014/09/13 16/06/48
   */
  getOffsetPosition: function(elem) {
    if (!elem) return {
      left: 0,
      top: 0
    };
    var top = 0,
      left = 0;
    if ("getBoundingClientRect" in document.documentElement) {
      //jquery方法
      var box = elem.getBoundingClientRect(),
        doc = elem.ownerDocument,
        body = doc.body,
        docElem = doc.documentElement,
        clientTop = docElem.clientTop || body.clientTop || 0,
        clientLeft = docElem.clientLeft || body.clientLeft || 0,
        top = box.top + (self.pageYOffset || docElem && docElem.scrollTop || body.scrollTop) - clientTop,
        left = box.left + (self.pageXOffset || docElem && docElem.scrollLeft || body.scrollLeft) - clientLeft;
    } else {
      do {
        top += elem.offsetTop || 0;
        left += elem.offsetLeft || 0;
        elem = elem.offsetParent;
      } while (elem);
    }
    return {
      left: left,
      top: top
    };
  },
  /*
   * String (字符串去除空格)
   *
   * @input    str = ' 2122 323  23 '
   * @output   str = '212232323 '
   *
   * @arguments str
   * @date 2014/09/13 16/06/48
   */
  trim: function(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
  },
  /*
   * String (匹配子字符串)
   *
   * @date 2014/09/13 16/06/48
   */
  contains: function(str1, str2) {
    //按小写匹配
    return str1.toLowerCase().indexOf(str2.toLowerCase()) > -1;
  },
  /*
   * class  (判断元素是否有该类)
   *
   * @date 2014/09/13 16/06/48
   */
  hasClass: function(ele, cls) {
    return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
  },
  /*
   * class  (为元素添加类)
   *
   * @date 2014/09/13 16/06/48
   */
  addClass: function(ele, cls) {
    if (!this.hasClass(ele, cls)) ele.className += " " + cls;
  },
  /*
   * class  (为元素删除类)
   *
   * @date 2014/09/13 16/06/48
   */
  removeClass: function(ele, cls) {
    if (this.hasClass(ele, cls)) {
      var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
      ele.className = ele.className.replace(reg, ' ');
    }
  },
  /*
   * obj  (复制对象)
   *
   * @date 2014/09/13 16/06/48
   */
  mix: function(destination, sources) {
    for (k in sources) {
      if (sources[k] !== void 0) {
        destination[k] = sources[k];
      }
    }
    return destination;
  },
  /*
   * Array & Object Sort(对象|数组|按键值|升序|降序|排序)
   *
   * @input    arr = [Object { name="wlz", age="24"}, Object { name="zlw", age="5"}]
   * @output   arr = [Object { name="wlz", age="5"}, Object { name="zlw", age="24"}]
   *
   * @use arr.sort(compareObjectArray(key,type))
   * @arguments type
   *  -range ["asc", "desc"]
   *  -default "asc"
   * @date 2014/08/16 22/06/48
   */
  compareObjectArray: function(prop, type) {
    return function(obj1, obj2) {
      var val1 = obj1[prop];
      var val2 = obj2[prop];
      var sort = 1;

      if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
        val1 = Number(val1);
        val2 = Number(val2);
      }
      if (typeof(type) == 'string' && type == "desc") {
        sort = -1;
      }
      if (val1 < val2) {
        return -1 * sort;
      } else if (val1 > val2) {
        return 1 * sort;
      } else {
        return 0;
      }
    }
  },
  /*
   * Array Sort(数组|排序)
   *
   * @input  arr = [23, 9, 4, 78, 3]
   * @output arr = [3, 4, 9, 23, 78]
   *
   * @use arr.sort(compareArray(type))
   * @arguments type
   *  -range ["asc", "desc"]
   *  -default "asc"
   * @date 2014/08/16 22/06/48
   *
   */
  compareArray: function(type) {
    return function(x, y) {
      var type = 1;
      if (typeof(type) == 'string' && type == "desc") {
        type = -1;
      }
      if (x < y) {
        return -1 * type;
      } else if (x > y) {
        return 1 * type;
      } else {
        return 0;
      }
    }
  },
  /*
  * String Find (子字符串查找 | 子字符串匹配)
  * @return (true,false)
  * @date 2014/09/02 09/48/48
  */
  hasClass: function(classAll,classTarget){
    var classAll= classAll || '';
	var classArray = classAll.split(/\s/g);
	for(var i=0,total=classArray.length;i<total;i++){
		if(classArray[i] == classTarget){
			return true;
		}
	}
	return false;
  },
  /*
  * String replace (字符串替换 | 字符串匹配)
  * @return string
  * @date 2014/09/02 09/48/48
  */
  render: function(tpl,data){
	var txt = '';
		for(var i=0 in data){
			txt += tpl.replace(/{(.*?)}/g,function(a,b){
				//var key = arguments[1];
				return data[i][b] || '';
			});
		}
		return txt;                 
  },
  /*
  * 连续点击事件 解决方案
  *
  * @target 2 (解决方案)
  * @date 2014/09/02 09/48/48
  */
	avoidTimer:null,
	avoidRepeatEvent: function(){
	  var self = this;
	  if(self.avoidTimer != null){
				clearTimeout(self.avoidTimer);
		}
		self.avoidTimer = setTimeout(function(){
		  //content
		},300);
	},
	/*
  * 改变dom内数字
  *
  * @target 1 (功能性方法)
  * @date 2014/09/02 09/48/48
  */
	changeCountElement : function($this,type){
			$this.each(function(index, element) {
					var _this = $(this);
					var beforeValue = _this.html();
					if(type == '+' || typeof(type) == 'undefined'){
						if(typeof(number) != 'undefined'){
							beforeValue += number;
						}else{
							++beforeValue;	
						}
					}else{
						if(typeof(number) != 'undefined'){
							beforeValue -= number;
						}else{
							--beforeValue;	
						}
					}
					_this.html(beforeValue);
				});
	},
	/*
  * Ajax 复合型工具方法
  *
  * @target 1 (功能性方法)
  * @date 2014/09/02 09/48/48
  */
	ajaxCenter : function(url,type,data,success,failure){
				$.ajax({
					'url' : url,
					'type' : type || 'GET',
					'data' : data,
					'dataType' : 'json',
					'success' : function(d){
						if(d && d.code ==200){
							success && success(d);
						}else{
							success && success(d.message);
						}
					},
					'error' : function(){
						failure && failure('请求失败');
					}
				});	
	},
	/*
  * dom 动画
  *
  * @target 1 (功能性方法)
  * @date 2014/09/02 09/48/48
  */
	flyNum:function(txt,offset,toSize){
				var aniDom = $('<div class="fly_num">' + txt + '</div>');
				aniDom.css({
					'top' : offset.top,
					'left' : offset.left+15
				});
				$('body').append(aniDom);
				aniDom.animate({
					'top' : offset.top + toSize,
					'opacity' : 0
				},1000,function(){
					aniDom.remove();
				});
	},
	/*
  * 定制时间格式修改
  *
  * @target 1 (功能性方法)
  * @date 2014/09/02 09/48/48
  */
	modifyCreateTime:function(createTime){
			var d;
			if(createTime){
				d=createTime.replace(/-/g,'/');
			}else{
				return "";
			}
			var d=createTime.replace(/-/g,'/');
			var getD = new Date(d).getTime();
			var nowD = new Date().getTime();
			var differ = nowD-getD,int_day;
			if(differ>0){
				int_day=Math.floor(differ/86400000);
				if(int_day>0){  //more than one day
					return createTime.substring(5,10);
				}else if(Math.floor(differ/3600000)>0){
					return Math.floor(differ/3600000)+'小时前';
				}
				var time;
				if(Math.floor(differ/60000)==0){
					time=1;
				}else{
					time=Math.floor(differ/60000);
				}
				return time+'分钟前';
			}else{
				return '1分钟前';
			}
	},
	/*
  * 字符串转数字
  *
  * @target 1 (功能性方法)
  * @date 2014/09/02 09/48/48
  */
	toInt : function(string, number) {
				number = number || 0;
				return string ? parseInt(string, 10) + number : 0;
	},
	/*
  * 数字向上取整
  *
  * @target 1 (功能性方法)
  * @date 2014/09/02 09/48/48
  */
	intToupper: function(double){
		return  Math.ceil(double);
	},
	/*
  * 数字向下取整
  *
  * @target 1 (功能性方法)
  * @date 2014/09/02 09/48/48
  */
	intToLower: function(double){
		return parseInt(double);
	},
	/*
  * 数组转字符串
  *
  * @target 1 (功能性方法)
  * @date 2014/09/02 09/48/48
  */
	arrayToString: function(arr, splitStr){
		var _splitStr = '';
		if(typeof(splitStr) != 'undefined'){
			_splitStr = splitStr;
		}
		return arr.join(_splitStr);
	},
	/*
  * 字符转小写
  *
  * @target 1 (功能性方法)
  * @date 2014/09/02 09/48/48
  */
	toLowerCase: function(str){
		if(typeof(str) == 'string'){
			return str.toLowerCase();
		}
	},
	/*
  * 字符转大写
  *
  * @target 1 (功能性方法)
  * @date 2014/09/02 09/48/48
  */
	toUpperCase: function(str){
		if(typeof(str) == 'string'){
			return str.toUpperCase();
		}
	},
	/*
  * 返回所有字母大写合集
  *
  * @target 1 (功能性方法)
  * @date 2014/09/02 09/48/48
  */
	allCharList: function(){
		var charList = [];
		for ( var i = 65; i <= 90; i++) {
				charList.push(String.fromCharCode(i));
		}
		return charList;
	},
	/*
  * window窗口变化 触发事件入口
  *
  * @target 1 (功能性方法)
  * @date 2014/09/02 09/48/48
  */
	setResize : function() {
			var self = this;
			$(window).resize(function() {
				//code
			});
	},
	/*
  * 鼠标移动位置获取接口
  *
  * @target 1 (功能性方法)
  * @date 2014/09/02 09/48/48
  */
	getMousePosition: function(){
			$(document).mousemove(function(event) {
					return{
							'left' : event.pageX,
							'top' : event.pageY
					};
			}).mouseup(function() {
				//
			});
	},
	in_array : function(needle, haystack, argStrict) {
			  //  discuss at: http://phpjs.org/functions/in_array/
			  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
			  // improved by: vlado houba
			  // improved by: Jonas Sciangula Street (Joni2Back)
			  //    input by: Billy
			  // bugfixed by: Brett Zamir (http://brett-zamir.me)
			  //   example 1: in_array('van', ['Kevin', 'van', 'Zonneveld']);
			  //   returns 1: true
			  //   example 2: in_array('vlado', {0: 'Kevin', vlado: 'van', 1: 'Zonneveld'});
			  //   returns 2: false
			  //   example 3: in_array(1, ['1', '2', '3']);
			  //   example 3: in_array(1, ['1', '2', '3'], false);
			  //   returns 3: true
			  //   returns 3: true
			  //   example 4: in_array(1, ['1', '2', '3'], true);
			  //   returns 4: false
			  var key = '',
			    strict = !! argStrict;
			  //we prevent the double check (strict && arr[key] === ndl) || (!strict && arr[key] == ndl)
			  //in just one for, in order to improve the performance 
			  //deciding wich type of comparation will do before walk array
			  if (strict) {
			    for (key in haystack) {
			      if (haystack[key] === needle) {
			        return true;
			      }
			    }
			  } else {
			    for (key in haystack) {
			      if (haystack[key] == needle) {
			        return true;
			      }
			    }
			  }
			  return false;
	},
	/*
  * Ajax
  *
  * @target 1 (功能性方法)
  * @date 2014/09/02 09/48/48
  */
	postData : function(url, data, afterSuccess, afterFailure, then) {
			if (!yiban.loading) {
				afterSuccess = afterSuccess || yiban.noop;
				afterFailure = afterFailure || yiban.noop;
				then = then || false;
				$.ajax({
					url : baseUrl + url,
					type : 'POST',
					data : data,
					dataType : 'json',
					beforeSend : function(jqXHR, settings) {
						yiban.loading = true;
					},
					success : function(response, textStatus, jqXHR) {
						if (response.code === 200) {
							if (then) {
								yiban.loading = false;
							}
							afterSuccess(response);
						} else {
							if (response.code === 110) {
								yiban.util.needLogin();
							} else {
								afterFailure(response);
							}
						}
					},
					error : function(jqXHR, textStatus, errorThrown) {
						if (yiban.debug) {
							yiban.log(jqXHR);
						}
					},
					complete : function(jqXHR, textStatus) {
						yiban.loading = false;
					}
				});
			}
	},
	/*
  * Ajax
  *
  * @target 1 (功能性方法)
  * @date 2014/09/02 09/48/48
  */
	getData : function(url, data, afterSuccess, afterFailure) {
			afterFailure = afterFailure || yiban.noop;
			$.ajax({
				url : baseUrl + url,
				type : 'GET',
				data : data,
				dataType : 'json',
				success : function(response, textStatus, jqXHR) {
					if (response.code === 200) {
						afterSuccess(response);
					} else {
						if (response.code === 110) {
							yiban.util.needLogin();
						} else {
							afterFailure(response);
						}
					}
				}
			});
	}
};
