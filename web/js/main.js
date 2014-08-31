(function(global) {
	/*
	 * var modules = {
	 *	name : {
	 *		module : module,
	 *		status : 0 [unload], 1 [loaded,currect], 2 [loaded,error]
	 *	}
	 *}
	 */
	var yomi = global.yomi = {
		version: '0.1',
		status: 0,
		modules: {
			//
		},
		config: {
			debug: false,
			preload: 'text',
			modules: {

			},
			_modules: {

			}
		},
		beforeUse: function(callback) {
			var self = this,
				load = require('load'),
				config = self.config,
				_modules = config.modules

			load.get(_modules, callback)
		},
		use: function(name, callback) {
			var self = this

			self.beforeUse(function() {
				log('all loaded.')
				if (isString(name) && !isUndefined(name)) {
					self.modules[name].module(require)
				}
				callback()
			})
		}
	}
	var modules = yomi.modules

	/*
	 * Util
	 */

	function isObject(obj) {
		return typeof(obj) == 'object'
	}

	function isString(str) {
		return typeof(str) == 'string'
	}

	function isFunction(obj) {
		return typeof(obj) == 'function'
	}

	function isUndefined(obj) {
		return typeof(obj) == 'undefined'
	}

	function log(msg) {
		console.log(msg)
	}

	function err(msg) {
		alert(msg)
	}

	function isEmptyObject(obj) {
		for (var name in obj) {
			return false
		}
		return true
	}
	/*
	 * core
	 */
	yomi.defined = function(name, obj) {
		if (isFunction(obj) && isString(name)) {
			modules[name] = {}
			modules[name].module = obj
			modules[name].status = 1
		} else {
			err('argument error.')
		}
	}

	var defined = global.defined = yomi.defined

	function require(name) {
		if (!isUndefined(name) && !isUndefined(modules[name])) {
			if (modules[name].status == 1) {
				return modules[name].module(require)
			} else {
				err('module unload')
			}
		}
	}
	/*
	 * core modules
	 */
	defined('load', function(require) {
		var load = {
			get: function(arrModule, callback) {

				var self = this,
					tempModules = arrModule

				for (var module in arrModule) {
					log('index:' + module)
					self._get(arrModule[module], function(uri) {
						log(uri + ':>loaded')
						for (var _module in tempModules) {
							if (tempModules[_module] == uri) {
								delete tempModules[_module]
								if (isEmptyObject(tempModules)) {
									callback()
								}
							}
						}
					})
				}
			},
			removeDom: function(_element) {
				var _parentElement = _element.parentNode
				if (_parentElement && !yomi.config.debug) {
					_parentElement.removeChild(_element)
				}
			},
			_get: function(uri, callback) {
				var self = this
				var _doc = document.getElementsByTagName('head')[0]
				var js = document.createElement('script')
				js.setAttribute('type', 'text/javascript')
				js.setAttribute('src', uri)
				js.setAttribute('async', true)
				_doc.appendChild(js)

				if (! /*@cc_on!@*/ 0) { //if not IE
					//Firefox2、Firefox3、Safari3.1+、Opera9.6+ support js.onload
					js.onload = function() {
						//log('Firefox2、Firefox3、Safari3.1+、Opera9.6+ support js.onload')
						callback(uri)
						self.removeDom(js)
					}
					js.onerror = function() {
						err(uri + ',can"t be loaded.')
					}
				} else {
					//IE6、IE7 support js.onreadystatechange
					js.onreadystatechange = function() {
						log(js.readyState)
						if (js.readyState == 'loaded' || js.readyState == 'complete') {
							//log('IE6、IE7 support js.onreadystatechange')
							callback(uri)
							self.removeDom(js)
						}
					}
				}
				return true
			}
		}
		return load
	})


	global.log = log

})(this)