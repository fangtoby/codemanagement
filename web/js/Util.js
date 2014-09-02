var userAgent = navigator.userAgent.toLowerCase();

var Tools = {
  ie: /*@cc_on!@*/ false,
  ie6: navigator.appVersion.indexOf("MSIE 6.0") != -1,
  isWebkit: /applewebkit/.test(userAgent),
  $: function(id, docObj) {
    if (!docObj) {
      var doc = document;
    }
    return doc.getElementById(id);
  },
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
  isDefined: function(obj, field) {
    return typeof(obj[field]) != "undefined";
  },
  isFunction: function(obj) {
    return !!(obj && obj.constructor && obj.call && obj.apply);
  },
  isString: function(str) {
    return (str && typeof(str) == 'string');
  },
  isObject: function(obj){
    return (obj && typeof(obj) == 'object');
  },
  isNumber: function(interget){
    return (interget && isNaN(interget));
  },
  getNumber : function(value) {
    return value ? parseInt(value) : 0;
  },
  createElement: function(tName, docObj) {
    if (!docObj) {
      var doc = document;
    }
    return doc.createElement(tName);
  },
  css: function(element, styles) {
    var style = element.style;
    for (var name in styles) {
      style[name] = styles[name];
    }
  },
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
  trim: function(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
  },
  contains: function(str1, str2) {
    //按小写匹配
    return str1.toLowerCase().indexOf(str2.toLowerCase()) > -1;
  },
  hasClass: function(ele, cls) {
    return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
  },
  addClass: function(ele, cls) {
    if (!this.hasClass(ele, cls)) ele.className += " " + cls;
  },
  removeClass: function(ele, cls) {
    if (this.hasClass(ele, cls)) {
      var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
      ele.className = ele.className.replace(reg, ' ');
    }
  },
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
						++beforeValue;
					}else{
						--beforeValue;
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
	}
};
