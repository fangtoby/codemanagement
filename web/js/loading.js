defined('loading', function(require) {

	var test = require('test')
	var url = require('url')

	var loading = {
		init: function(argument) {

			$('#search-box').val('all script loaded')
			log(url)
			test.init()
			log('loading start...')
		}
	}
	loading.init()
})