/*

	Vizualyze Core Plugin File

	Author: 	Josh McDonald 
	Twitter:	@onestepcreative
	Github:		github.com/onestepcreative
	
	
	This file was forked from the Zurb team
	in pursuit of deeper knowledge about more
	advanced Javascript techniques and libs.
	
	This file will act as our 'core' and
	can share different mehtoes between you

*/


// Wrap plugin in closure to avoid conflicts
;(function($, window, document, undefined) {

	'use strict';
	
	// Define our global plugin Object
	window.Visualyze = {
		
		name	: 'Visualyze',
		
		version	: '1.0.0',		
		
		cache	: {},
		
		
		// Global initialization method
		init: function(scope, libs, method, options, response) {

			// Setup Visualyze's global scope
			this.scope = scope || this.scope;

			// Array for all active libs
			var libsArray = [];
			
			// Array for plugin responses
			var responses = [];
			
			// Create array of all arguments passed
			var args = [scope, method, options, response];

			// Loop through all active libraries
			if(libs && typeof libs === 'string' && !/reflow/i.test(libs)) {
				
				// Tell us if the lib is turned off first
				if(/off/i.test(libs)) { return this.off(); }
				
				// Convert libs string to libs array 
				libsArray = libs.split(' ');
				
				// Make sure the array isn't empty
				if(libsArray.length > 0) {
					
					// Loop thru if libs exist in the array
					for(var i = libsArray.length - 1; i >=0; i--) {
						
						// Push all of the items into a new array
						responses.push(this.initLib(libsArray[i], args));
						
					}
					
				} else {
					
					if(/reflow/i.test(libs)) { args[1] = 'reflow'; }
					
					for(var lib in this.libs) {
						
						responses.push(this.initLib(lib, args));
						
					}
					
				}

			}
			
			// Check to see if first parameter is callback
			if(typeof libs === 'function') {
				
				// If callback, make it an arg instead
				args.unshift(libs);
				
			}
			
			// Store response to an object for global inheritance
			return this.responseObj(responses, args);
			
		},
		
		// Global response method
		responseObj: function(responseArray, args) {
			
			for(var i = 0; i < args.length; i++) {
				
				if(typeof args[i]) {
					
					errors: responseArray.filter(function(s) {
						
						if (typeof s === 'string') { return s; }
						
					});
					
				}
				
			}
		
			return responseArray;
			
		},
		
		// Library handling method
		initLib: function(lib, args) {
			
			return this.trap(function() {
				
				if(this.libs.hasOwnProperty(lib)) { 
				
					this.patch(this.libs[lib]);
					
					return this.libs[lib].init.apply(this.libs[lib], args);
				
				} else {
					
					return function(){  };
					
				}
				
			}.bind(this), lib);
			
		},
		
		// Libs error handling method
		trap: function(func, lib) {
			
			if(!this.nc) {
				
				try { 
				
					return func(); 
					
				} catch(e) {
					
					return this.error({ name: lib, message: 'could not be initialized', more: e.name + '  ' + e.message });
					
				}
				
			}
			
			return func();
			
		},

		// Lib scope patch method
		patch: function(lib) {
			
			this.fixOuter(lib);
			
			lib.scope = this.scope;	
			
		},
		
		// Global build url helper
		urlBuilder: function(url) {
				
			var spliturl 	= url.split( '/' );
			var protocol 	= spliturl[0];
			var simpleurl 	= spliturl[2];
			var baseurl 	= protocol + '//' + simpleurl;
			
			return baseurl;
			
		},
		
		// Inheritance handling method
		inherit: function(scope, methods) {
						
			var methodsArray = methods.split(' ');
			
			for(var i = methodsArray.length - 1; i >= 0; i--) {
				
				if(this.libMethods.hasOwnProperty(methodsArray[i])) {
				
					this.libs[scope.name][methodsArray[i]] = this.libMethods[methodsArray[i]];
				
				}
				
			}	
			
		},
		
		// Cache busting helper method
		randomStr: function(length) {
			
			var chars 	= '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
			var str 	= '';
			
			if(!length) { 
			
				Math.floor(Math.random() * chars.length); 
				
			}
			
			for(var i = 0; i < length; i++) {
				
				str += chars[Math.floor(Math.random() * chars.length)];
				
			}
			
			return str;
			
		},
		
		// Active libs object
		libs: {},
		
		// Global library api methods
		libMethods: {
			
			// Setting data method
			setData: function(node, data) {
				
				// Use caller's(this.name) name to generate unique ID
				var id = [this.name, +new Date(), Visualyze.randomStr(5)].join('-');
				
				Visualyze.cache[id] = data;
				
				node.attr('data-' + this.name + '-id', id);
				
				return data;
				
			},
			
			// Getting data method
			getData: function(node) {
				
				return Visualyze.cache[node.attr('data-' + this.name + '-id')];
				
			},
			
			// Deleting data method
			removeData: function(node) {
			
				if(node) {
					
					delete Visualyze.cache[node.attr('data-' + this.name + '-id')];
					
					node.attr('data-' + this.name + '-id', '');
					
				} else {
					
					$('[data-' + this.name + '-id]').each(function() {
						
						delete Visualyze.cache[$(this).attr('data-' + this.name + '-id')];
						
						$(this).attr('data-' + this.name + '-id', '');
						
					});
					
				}
			
			},
			
			// Throttling method
			throttle: function(func, delay) {
				
				var timer = null;
				
				return function() {
					
					var context = this;
					var args	= arguments;
					
					clearTimeout(timer);
					
					timer = setTimeout(function() {
						
						func.apply(context, args);
						
					}, delay);
					
				};
				
			},
			
			// Data-Options (html) method
			dataOptions: function(elem) {
				
				console.log('fired');
				
				var opts 		= {};
				var optsArray 	= (elem.attr('data-options') || ':').split(';');
				var optsLength	= optsArray.length;

				var ii, p;
				
				function isNumber(o) {
					
					return !isNaN(o-0) && o !== null && o !== '' && o !== false && o !== true
					
				}
				
				function trim(str) {
					
					if(typeof str === 'string') { return $.trim(str); }
					
					return str;
					
				}
				
				// Parse option stored to DOM node
				for(ii = optsLength - 1; ii >= 0; ii--) {
					
					p = optsArray[ii].split(':');
					
					if(/true/i.test(p[1])) { p[1] = true; }
					
					if(/false/i.test(p[1])) { p[1] = false; }
					
					if(isNumber (p[1])) { p[1] = parseInt(p[1], 10); }
					
					if(p.length === 2 && p[0].length > 0) {
						
						opts[trim(p[0])] = trim(p[1]);
						
					}
					
				}
				
				return opts;
				
			},
			
			// Delay method
			delay: function(func, delay) {
				
				return setTimeout(func, delay);
				
			},
			
			// ScrollTo helper method
			scrollTo: function(elem, to, duration) {
				
				if(duration < 0) { return; }
				
				var diff = to - $(window).scrollTop();
				var tick = diff / duration * 10;
				
				this.scrollToTimerCache = setTimeout(function() {
					
					if(!isNaN(parseInt(tick, 10))) {
						
						window.scrollTo(0, $(window).scrollTop() + tick);
						
						this.scrollTo(elem, to, duration - 10);
						
					}
					
				}.bind(this), 10)
				
			},
			
			// ScrollLeft helper method
			scrollLeft: function(elem) {
				
				if(!elem.length) { return; }
				
				return ('scrollLeft' in elem[0]) ? elem[0].scrollLeft : elem[0].pageXOffset;
				
			},
			
			// Object content checking
			empty: function(obj) {
				
				if(obj.length && obj.length > 0) { return false; }
				
				if(obj.length && obj.length === 0) { return true; }
				
				for(var key in obj) {
					
					if(hasOwnProperty.call(obj, key)) {
						
						return false;
						
					}
					
				}
				
				return  true;
				
			}
			
		},
		
		// Not exactly sure what this is for
		fixOuter: function(lib) {
			
			lib.outerHeight = function(elem, bool) {
				
				if(typeof bool !== 'undefined') {
					
					return elem.outerHeight(bool);
					
				}
				
				return elem.outerHeight();
				
			}
			
			lib.outerWidth = function(elem, bool) {
				
				if(typeof bool !== 'undefined') {
					
					return elem.outerWidth(bool);
					
				}
				
				return elem.outerWidth();
				
			}
			
		},
		
		// Error message helper method
		error: function(error) {
			
			return error.name + ' ' + error.message + ': ' + error.more;
			
		},
		
		// Event killer method (unbinding)
		off: function() {
			
			$(this.scope).off('.fndtn');
			
			$(window).off('.fndtn');
			
			return true;
			
		},
		
	};
	
	// Makes the .vizcore() method globally available
	$.fn.vizcore = function() {
		
		var args = Array.prototype.slice.call(arguments, 0);
		
		return this.each(function() {
			
			Visualyze.init.apply(Visualyze, [this].concat(args));
			
			return this;
			
		});
		
	};
	
	// Usage: log('inside coolFunc', this, arguments)
	window.log = function() {
		
		log.history = log.history || [];
		
		log.history.push(arguments);
	
		if(window.console){
			
			console.log(Array.prototype.slice.call(arguments));
			
		}
	};
	
})(jQuery, this, this.document);
	
// Include this script to do cross-domain requests with Yahoo's YQL hack
document.write("<script src=\"assets/scripts/crystal/viz.xdom.js\"></script>");
	


