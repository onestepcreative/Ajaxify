
#### Initialize Ajaxify

To get Ajaxify initialized, we can use the pattern we learned in "Javascript Core" that looked like this:

```javascript
$(document).crystalcore('your_extension', { /* your_extension_settings */ });
```

Because we are going to be sending off an ajax request, grabbing some elements from that request, and appending those elements to the page, there are two required bits of info we need.

**Ajaxify has two settings that *must* be set to move forward: 'url' & 'klass'**

**url   :** an absolute url we'll send the ajax request to - "http://example.com"  
**klass :** the class the ajax data will be append to      - ".ajaxify"  

Now that we have the two required settings figured out, lets initialize Ajaxify

```javascript
$(document).crystalcore('ajaxify', {
    url   : 'http://example.com',
    klass : '.ajaxify'
});
```

#### Build Markup for Ajaxify

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
    
    
    <!-- load the CrystalCore file, it is required -->  
    <script src="/files/assets/scripts/crystal/crystal.core.js"></script>
    
    <!-- load all extension files to be used in site -->  
    <script src="/files/assets/scripts/crystal/crystal.ajaxify.js"></script>
    
    <script>

        // Initialize Ajaxify and config the settings
        $(document).crystalcore('ajaxify' {
            url   : 'http://example.com/',
            klass : '.ajaxify',
        });

    </script>
    
</body>
```

#### Ajaxify Options

Aside from settings we covered, Ajaxify comes with a variety of different settings that you can set to customize your install. Listed below are the options available to you. If you have ideas for additional configuration options, be sure to [track an issue](https://github.com/crystalcommerce/FrontendPlugins/issues) to the Plugins Repo!

```javascript
$(document).crystalcore('ajaxify', {
    url		: null,		// 'string' - The site to send the Ajax Request to
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
