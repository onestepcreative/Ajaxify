/*

	The Ajaxify Plugin

	Author: 	Josh McDonald
	Twitter:	@onestepcreative
	Github:		github.com/onestepcreative
	
	This plugin allows you to make an Ajax
	request to get 'html' and parse it to the
	page with simple data attributes. 

*/



;(function($, window, document, undefined) {

	'use strict';
	
	Visualyze.libs.ajaxify = {

		name	: 'ajaxify',
		
		version	: '1.2.3',
		
		init: function(scope, options) {

			// TODO: Are more init methods needed?
			
			var self 	= this;
			var opts 	= options;

			if(typeof options === 'object') {
				
				$.extend(true, opts, options);
			
			} else if(typeof options === 'string') {
				
				opts.url = options;
				
			}
			
			// Create new instance
			new Ajaxify(scope, options);
			
		},
		
	};
	
	var Ajaxify = function(el, settings) {
		
		var self = this;
		
		// Set default options
		self.options = {
			url			: null,
			type		: 'GET',
			dataType	: 'html',
			klass		: '.ajaxify',
			cached		: [],
			unique		: null,
			animate		: null,
			loader		: null,
			hrefs		: null
		},
		
		// Merge settings with default options
		$.extend(true, self.options, settings);
		
		// Determine if Ajax needs to be fired
		self.init = function() {
			
			// TODO: Is there a faster way?
			
			var self = this;
			
			// If cache is empty, send request
			if(self.options.cached.length === 0) {
				
				self.get();
				
			} else {
				
				// Unique ID stored in settings (if set)
				var cachedUnique	= self.options.cached[0].id;					
				
				// Ajax data stored in the cached object 
				var cachedResponse 	= $(self.options.cached[0].response.results[0]);
				
				self.parse(cachedResponse);
				
			}
			
		},
		
		// Send off ajax request and get data
		self.get = function() {
		
			// TODO: Look into alternative ajax methods
			// TODO: Add customizable error handling
			// TODO: Build method to access cache easily
			// TODO: See if we can do one Ajax call at a time
			
			var self = this;
			
			$.ajax({
				
				url			: self.options.url,
				type		: self.options.type,
				dataType	: self.options.dataType,
				//success	: function(response) { console.log('succeeded: "' + self.options.unique + '"'); },
				//error		: function(response) { console.log('failed: "' + self.options.unique + '"'); }
			
			// Using .done() for reliable caching
			}).done(function(response) {
				
				// Create object with id and response for cache
				response = { id: self.options.unique, response: response };
				
				// Push the response object to our cached object
				self.options.cached.push(response);
				
				// Unique ID stored in settings (if set)
				var cachedUnique	= self.options.cached[0].id;					
				
				// Ajax data stored in the cached object 
				var cachedResponse 	= $(self.options.cached[0].response.results[0]);
				
				self.parse(cachedResponse);
				
			});
			
		},
		

		self.clean = function(data) {
			
			// TODO: Add HTTPS protocol support
			// TODO: Test for better loops speed
			
			var self 	 = this;
			var base 	 = Visualyze.urlBuilder(self.options.url);

			var data 	 = data;
			var images 	 = data.find('img');
			var links	 = data.find('a');
			
			// Fix imgage paths
			images.each(function() {
				
				var img = $(this);
				var src = img.attr('src');

				if(src.substring(0, 4) !== 'http') { 
					
					img.attr('src', base + src); 
					
				}
				
			});
						
			// Fix url paths
			links.each(function() {
				
				var link = $(this);
				var lref = link.attr('href');
				var ltar = link.attr('target');
				var refs = self.options.hrefs;

				if(typeof lref === 'string') {

					if(lref.substring(0, 4) !== 'http'){ 
						
						link.attr('href', base + lref); 
						
					}
				
				}
				
				// Add target to 'a' tags if 'hrefs' settings are set in settings
				if(refs !== null) { 
				
					link.attr('target', refs); 
					
				} else { 
				
					return; 
					
				}
				
			});
			
			return data;
			
		},
		
		// Append ajax content to the page
		self.parse = function(data) {
		
			// TODO: Look into a native 'for' loop for speed
			
			var self	= this;
			
			// Return clean data using .clean()
			var data	= self.clean(data);
			
			// Get all klasses defined during setup
			var elems	= $(self.options.klass);
			
			// Loop through the elems, do magic
			elems.each(function(i, elem) {
				
				// The element being appended to
				var reciever 	= $(elem);
				
				// Get all elements stored in 'data-ajaxify'
				var ajaxified 	= reciever.data('ajaxify');
				
				// Pull elements out of the ajax response
				var arrivee		= data.find(ajaxified);
				
				// Append ajax content to markup
				arrivee.appendTo(reciever);
				
			});
			
		},
		
		// Init Object
		self.init();		
		
	};
	
})(jQuery, this, this.document);
