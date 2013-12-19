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
  
## Markup Preparation

Getting the html from your response injected into the DOM is done using data attributes and a single class. The data attribute (data-ajaxify) is the element from the ajax response you want to inject, and the class (default: .ajaxify) is where you want the element to be injected. Follow this pattern:

```html
<div class="[class assigned in 'elem' setting]" data-ajaxify="[the ajaxed element to inject]"></div>
```
A class is used, so that you can grab multiple elements from a single response and inject them into the DOM as needed. That default class is '.ajaxify', but that can be changed by setting the 'elem' option in the options object. For instance, to take the #header, #footer, and #main-content elements from example.com, and inject them into the DOM, your implementation would look like this:

```html
<body>
    
    <div class="page-container">
        
        <div class="inject-here" data-ajaxify="#header"><!-- #header appends here --></div>
        
        <div class="inject-here" data-ajaxify="#main-content"><!-- #main-content appends here --></div>
        
        <div class="inject-here" data-ajaxify="#footer"><!-- #footer appends here --></div>
        
    </div>
    
    <script>
        
        $(document).vizcore('ajaxify', {
            url     : 'http://example.com',
            type    : 'GET',
            elem    : '.inject-here',
            replace : true,
            effect  : 'fade'
        })
        
    </script>
    
</body>
```
This implementation will take all elements with the 'inject-here' class, loop through them, looking at the data in the 'data-ajaxify' attribute, and injecting those items found in the ajax response.

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
  

## Multiple Ajaxify Requests

There are times you may want to grab html elements from multiple different sites. This is where the 'elem' settings really comes into play. Because Ajaxify uses a class instead of the [data-ajaxify] attribute to find elements to inject items into, you can run multiple instances without a problem.
 
```html
<body>
    
    <div class="page-container">
        
        <div class="nbc-widget" data-ajaxify="#nbcWidget"></div>
        
        <div class="cnn-widget" data-ajaxify="#cnnWidget"></div>
                
    </div>
    
    <script>
        
        $(document).vizcore('ajaxify', {
            url     : 'http://nbc.com',
            elem    : '.nbc-widget',
        })
        
        $(document).vizcore('ajaxify', {
            url     : 'http://cnn.com',
            elem    : '.cnn-widget',
        })
        
    </script>
    
</body>
```

In this example, we could pull different widgets from multiple news sites, to create a news board (hypothetically). The 'nbc-widget' class would inject the #nbcWidget element from nbc.com while the 'cnn-widget' class would inject the #cnnWidget element from cnn.com





