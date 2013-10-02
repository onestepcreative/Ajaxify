***

#### Getting Started

The Javascript Core, also known as CrystalCore, is built similar to Foundation 4 Javascript. Our biggest focus was to create a clear and concise way to interact with the core and extensions, while maintaining control and flexibility.

#### Dependencies

To run the CrystalCore Plugin, be sure that **jQuery** is included in the **head** of the page. Unlike Foundation, CrystalCore doesn't support Zepto, so we recommend using only jQuery. **Modernizr** is also required and is used for the html5shiv and feature detection, and should ***always*** be included in the **head** above your stylesheets.

```html

<!-- don't forget Modernizr, it is required -->  
<script src="/files/assets/scripts/crystal/custom.modernizr.js"></script>

<!-- stylesheets should be loaded here -->

<!-- load up jQuery here, it is required -->  
<script src="/files/assets/scripts/crystal/custom.jquery.js"></script>
  
```

#### Include Libraries & Extensions

CrystalCore was built in such a way that it streamlines the implementation of CrystalCore Extensions by wrapping them up in a single, easy to use plugin under the ***$.fn.crystalcore()*** jQuery namespace. In order to make this happen, a file called *crystal.core.js* serves as the center hub for each extension used in the site. For any and all of the plugin and extensions to work, include crystal.core.js above the **body** tag in the footer. Any extension files should be included after the core.

```html

<!-- load the CrystalCore file, it is required -->  
<script src="/files/assets/scripts/crystal/crystal.core.js"></script>

<!-- load all extension files to be used in site -->  
<script src="/files/assets/scripts/crystal/crystal.ajaxify.js"></script>
<script src="/files/assets/scripts/crystal/crystal.extension_name.js"></script>
<script src="/files/assets/scripts/crystal/crystal.extension_name.js"></script>
<!-- ... -->

</body>
  
```

#### Initialize CrystalCore

After the CrystalCore Javascript has been included, a simple call can get the core up and running. 
```html
    <!-- core and extension files -->

    <script>
        $(document).crystalcore()
    </script>

</body>
```

Initializing the core will kick things off. Then, there's a great way to initialize and customize the extensions you want to use:

```javascript
// In it's simplest form, here's how crystalcore works
$(document).crystalcore('your_extension', { /* your_extension_settings */ });

// In this example, the Ajaxify Extension is being initialized
// Where http://the-ajax-url.com will be used to run the ajax call 
// And our klass setting '.ajaxify' is used to append ajaxed data
$(document).crystalcore('ajaxify', { url: 'http://the-url.com', klass: '.ajaxify' });
```

This should give you a pretty good start as to what to expect.   
For more in depth documentation each extensions has it's own wiki page.










***

#### The Purpose

Ajaxify is an extension that makes it very simple to make new Ajax requests, grab the needed data, and append it to the page. With Ajaxify, you can make multiple requests to different sites, and append data to your site in a matter of seconds.

#### Including the Extension

If you haven't read the "Javascript Core" documentation, do so now: [here's the link](https://github.com/crystalcommerce/FrontendPlugins/wiki/Javascript-Core)

Now that you've had a chance to read about the fundamentals of how the CrystalCore plugin system works, lets get the Ajaxify extension up and running. I'll assume that you've already uploaded the necessary files, and have included them in the footer of your site. You might have something like this (notice where the ajaxify file is being included at):

```html
    <!-- load the CrystalCore file, it is required -->  
    <script src="/files/assets/scripts/crystal/crystal.core.js"></script>

    <!-- now you can load the Ajaxify file here -->  
    <script src="/files/assets/scripts/crystal/crystal.ajaxify.js"></script>

</body>
```

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
