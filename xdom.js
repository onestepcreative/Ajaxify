
/*

	The YQL Cross-Domain Ajax Helper

	This file is simply included as a backup,
	incase you run into some issues when running
	cross-domain ajax. Currently, at the bottom
	of crystal.core.js, this script is loading
	so you should have any problems.

*/



jQuery.ajax = (function(_ajax){

    var protocol = location.protocol,
        hostname = location.hostname,
        exRegex = RegExp(protocol + '//' + hostname),
        YQL = 'http' + (/^https/.test(protocol)?'s':'') + '://query.yahooapis.com/v1/public/yql?callback=?',
        query = 'select * from html where url="{URL}" and xpath="*" and compat="html5"';

    function isExternal(url) {

        return !exRegex.test(url) && /:\/\//.test(url);

    }

    return function(o) {

        var url = o.url;

        if (/get/i.test(o.type) && !/json/i.test(o.dataType) && isExternal(url)) {

            // MANIPULATE OPTION SO JSONP-X REQUEST IS MADE TO YQL

            o.url = YQL;
            o.dataType = 'json';

            o.data = {

                q: query.replace(
                    '{URL}', url + (o.data ? (/\?/.test(url) ? '&' : '?') + jQuery.param(o.data) : '')),

                format: 'xml'
            };

            // COMPLETE === SUCCESS

            if (!o.success && o.complete) {

                o.success = o.complete;
                delete o.complete;

            }

            o.success = (function(_success){

                return function(data) {

                    if (_success) {

                        // FAKE XHR CALLBACK
                        _success.call(this, {

                            responseText: (data.results[0] || '')

                                // GET RID OF <SCRIPT>
                                .replace(/<script[^>]+?\/>|<script(.|\s)*?\/script>/gi, '')

                        }, 'success');

                    }

                };

            })(o.success);

        }

        return _ajax.apply(this, arguments);

    };

})(jQuery.ajax);