## Requirements  
  
```html
<script src="assets/scripts/libs/jquery.js"></script>
<script src="assets/scripts/viz.core.js"></script>
<script src="assets/scripts/viz.ajaxify.js"></script>  

<!-- (optional) for doing cross-domain requests -->
<script src="assets/scripts/libs/xdom.js"></script>
```

## Initialize Ajaxify

The **vizcore namespace** is a plugin utility that is used to initialize plugins; where the first parameter is the name of the plugin, and the second parameter is either a string or a plain object. Other plugins can be added to the vizcore namespace by tapping into the Visualyze.libs object.  
  
For the simplest implementation, pass a url as the second paremeter:
```javascript
// Use an absolute url to define where to send the ajax request
$(document).vizcore('ajaxify', 'http://sendrequesttome.com');
```
  
## Ajaxify Options
For a more complex implementation, pass a settings object as the second parameter.  

```javascript
$(document).vizcore('ajaxify', {
    
    // Ajax specific options
    url         : 'http://example.com',
    data        : yourData,
    type        : 'GET',
    dataType    : 'html',
    
    // Ajax callback methods
    before      : function(){},
    success     : function(){},
    failure     : function(){},
    
    // DOM element handling
    elem        : '.ajaxify',
    replace     : false,
    
    // Animation options
    effect      : 'fade',
    speed       : 1000,
    loader      : '<div class="loading"></div>',
    
    // Caching / localStorage
    cached      : true,
    key         : 'ajaxify',
    duration    : 5,
    
    // Data cleaning options
    clean       : {
        
        links   : false,
        images  : true,
        
    }
});
```

***
#### Ajax Specific Options
***

#### url 
  + the url to send the ajax request to
  + **type:**  `string`
  + **default:** null  

#### data 
  + data parameters sent with ajax request
  + **type:**  `mixed`
  + **default:** null

#### type 
  + the type of request to make
  + **type:**  `string`
  + **default:** GET

#### dataType 
  + the type of data you'll be requesting
  + **type:**  `string`
  + **default:** html

***
#### Ajax Callback Options
***

#### before
  + called in the beforeSend ajax method
  + **type:**  `function`
  + **default:** null

#### success
  + called in the defferred.done() method on success
  + **type:**  `function`
  + **default:** null

#### failure
  + called in the defferred.fail() method on failure
  + **type:**  `function`
  + **default:** null

***
#### DOM Elements Options
***

#### elem
  + the DOM element to append response html to
  + **type:**  `string`
  + **default:** .ajaxify

#### replace
  + replace all content in 'elem' instead of append to 'elem'
  + **type:**  `boolean`
  + **default:** false

***
#### Response Animation Options
***

#### effect
  + the type of effect to use when injecting to the page
  + **type:**  `string`
  + **default:** flash
  + **options:** 'fade' or 'flash'

#### replace
  + the speed at which to animate when effect is set to 'fade'
  + **type:**  `number`
  + **default:** 500

#### loader
  + include a loading html element while waiting for response
  + **type:**  `string`
  + **default:** null

***
#### Response Caching Options
***

#### cached
  + whether or not to cache the ajax response
  + **type:**  `boolean`
  + **default:** true

#### key
  + the key to identify data in localStorage
  + **type:**  `string`
  + **default:** settings.url

#### duration
  + how long (in hours) to store the cache
  + **type:**  `number`
  + **default:** 5

***
#### Response Cleaning Options
***

#### clean.links
  + create absolute links based on settings.url
  + **type:**  `boolean`
  + **default:** true

#### clean.images
  + create absolute image src based on settings.url
  + **type:**  `boolean`
  + **default:** true  
  







## Build Markup for Ajaxify

Getting the ajaxed data into your page is easier than ever by using the predefined markup structure. Say for example we need to strip out three IDs from the ajax response: #main, #nav, #tree - all we have to do now is create three html elements in our page so we have a place to append our ajaxed elements.

Use this convention to create your markup:

```html
<div class=" [the 'klass' you set in ajaxify settings] " data-ajaxify=" [a stripped ajax elem] "></div>

<!-- for our example, that markup would be implemented like this -->

<div class="ajaxify" data-ajaxify="#main"><!-- // #main appendeds here --></div>

<nav class="ajaxify" data-ajaxify="#nav"><!-- // #nav appendeds here --></nav>

<aside class="ajaxify" data-ajaxify="#tree"><!-- // #tree appendeds here --></aside>
```

When we put it all together, it looks something like this:

```html
<body>

    <!-- the beginning of your html page an such -->
    
    <div class="ajaxify" data-ajaxify="#main"><!-- // #main appendeds here --></div>
    
    <nav class="ajaxify" data-ajaxify="#nav"><!-- // #nav appendeds here --></nav>
    
    <aside class="ajaxify" data-ajaxify="#tree"><!-- // #tree appendeds here --></aside>
    
    <!-- the rest of your html page an such --> 
    
    
    <!-- load the VizCore file, it is required -->  
    <script src="assets/scripts/viz.core.js"></script>
    
    <!-- load all extension files to be used in site -->  
    <script src="assets/scripts/viz.ajaxify.js"></script>
    
    <script>

        // Initialize Ajaxify and config the settings
        $(document).vizcore('ajaxify' {
            url   : 'http://example.com/',
            klass : '.ajaxify',
        });

    </script>
    
</body>
```

#### Ajaxify Options

Aside from settings we covered, Ajaxify comes with a variety of different settings that you can set to customize your install. Listed below are the options available to you. If you have ideas for additional configuration options, be sure to [track an issue](https://github.com/crystalcommerce/FrontendPlugins/issues) to the Plugins Repo!

```javascript
$(document).vizcore('ajaxify', {
    url    	: null,		// 'string' - The site to send the Ajax Request to
    type	: 'GET',	// 'string' - Type of request you'd like to make
    dataType	: 'html',	// 'string' - DataType that will be returned from ajax
    klass	: '.ajaxify',	// 'string' - The Class we'll append new ajax elements to
    cached	: [],		// boolean - A way to cache the response, so you can access it later
    unique	: null,		// 'string' - A unique ID that is set to identify cache
    animate	: null,		// boolean - Animate the content as it's appended to page
    loader	: null,		// 'string' - Set your image path for the ajax loader here
    hrefs       : null          // 'string' - Change behavior of links that don't have a target set
});
```

#### Multiple Ajaxify Requests
