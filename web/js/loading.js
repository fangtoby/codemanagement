defined('loading', function(require) {

	var test = require('test')

	var loading = {
		init: function(argument) {

			$('#search-box').val('all script loaded')
			test.init()
			log('loading start...')
		}
	}
	loading.init()
})