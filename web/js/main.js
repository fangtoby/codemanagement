var modules = {},
	index = 0

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

function defined(name, obj) {
	if (isFunction(obj) && isString(name)) {
		modules[name] = obj
	} else {
		err('argument error.')
	}
}

function require(name) {
	if (!isUndefined(name) && !isUndefined(modules[name])) {
		return modules[name](require)
	}
}

defined('test', function() {
	var test = {
		init: function(argument) {
			log('test start ...')
		}
	}
	return test
})

defined('loading', function(require) {

	var test = require('test')

	var loading = {
		init: function(argument) {

			test.init()

			log('loading start...')
		}
	}
	loading.init()
})

window.yomi = yomi = {}

yomi = {
	use: function(name) {
		if (isString(name) && !isUndefined(name)) {
			modules[name](require)
		}
	}
}

yomi.use('loading')

console.log(modules)