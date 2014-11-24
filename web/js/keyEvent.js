/**
 * Keyboard Event
 *
 * @usage
 * var keyEvent = require('./keyEvent.js');
 *
 *		keyEvent.init({
 *			'ctrl&enter':function(){
 *	        	addCommentFn();
 *			},
 *			'ctrl&i':function(){
 *				$('#input-area').focus();	
 *			}
 *		});
 *
 *
 * @author fly <fangyanliang@yiban.cn>
 * @update 2014.08.26
 */
define(function(require) {
	var keyCodeSource = {
		13 : 'enter',
		65 : 'a',
		66 : 'b',
		67 : 'c',
		68 : 'd',
		69 : 'e',
		70 : 'f',
		71 : 'g',
		72 : 'h',
		73 : 'i',
		74 : 'j',
		75 : 'k',
		76 : 'l',
		77 : 'm',
		78 : 'n',
		79 : 'o',
		80 : 'p',
		81 : 'q',
		82 : 'r',
		83 : 's',
		84 : 't',
		85 : 'u',
		86 : 'v',
		87 : 'w',
		88 : 'x',
		89 : 'y',
		90 : 'z',
	};
	var keyDown = {
		init : function(obj) {
			this.keyAndEvent(obj);
		},
		bind : function(callback) {
			document.onkeydown = function(event) {
				var e = event || window.event
						|| arguments.callee.caller.arguments[0];
				callback(e);
			};
		},
		keyAndEvent : function(obj) {
			var self = this;
			self.bind(function(e) {
				var keyChar = keyCodeSource[e.keyCode], rightKeyChar = '',eventKey = '';
				if (e && e.keyCode && e.ctrlKey) {
					if (typeof (keyChar) != 'undefined') {
						rightKeyChar = keyChar.toLowerCase();
						eventKey = 'ctrl&' + rightKeyChar;
						self.execValue(obj[eventKey]);
					}
				}
			});
		},
		execValue : function(func) {
			if (typeof (func) == 'function') {
				func();
			}
		}
	};
	return keyDown;
})
