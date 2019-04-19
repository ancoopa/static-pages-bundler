# About
### What is `static-pages-bundler`
This is a simple library that creates a bundle of a simple web page that uses classic `<link ...>` and `<script ...>` way to connect a bunch of CSS and JS files to the HTML template.
  
An entry point is your `index.html`. All the connected CSS, JS found by their paths in the `index.html`. Then the data parsed and compressed into three files: `index.html`, `bundle.css` and `bundle.js`.
    
    
### `!` Important notes
For now `static-pages-bundler` tested only on `macOS Movaje v10.14.4`, `Windows 7 Enterprise` and `Ubuntu 18.04.2 LTS`.
    
    
# Basic usage
### Installation
To use the library you will need to have [node.js](https://nodejs.org/en/) and [git](https://git-scm.com/) installed on your system.
  
    
To install `static-pages-bundler` globally, simply run from terminal:
```
  $ npm install -g static-pages-bundler
```

  
You may remove the `-g` flag if you want to install `static-pages-bundler` as a dev dependency. So, the command will be 
```
  $ npm i --save-dev static-pages-bundler
```


### Bundling process
1. Create a `dist` folder you're going to run the script from.
    You may skip the step, but in the case, you will have to run `static-pages-bundler` using `sudo` to give the bundler permissions to create that folder structure for you (running `npm` libs with `sudo` is never recommended with any third party lib).
    
    
2. In your HTML template setup the entry points for the bundler:
  
     2.1. Wrap your `<link ...>` elements that have CSS files imports via CSS comments:
   ```
       <!-- Bundler CSS start -->
         ... your <link ...> elements
       <!-- Bundler CSS end -->
   ```
     2.2. Wrap your `<script ...>` elements that have JS scripts via JS comments:
   ```
       <!-- Bundler JS start -->
         ... your <script ...> elements
       <!-- Bundler JS end -->
   ```
   `!` Its important to use exact same comment lines 
   ```
       <!-- Bundler CSS start -->,
       <!-- Bundler CSS end -->,
       <!-- Bundler JS start --> and
       <!-- Bundler JS end -->.
   ```
   `!` Also, please use only one entry point for CSS and one for JS. The library doesn't work with multiple entry points for now.
    
    
3. Using terminal go to the location where your `index.html` located and run:
    ```
      $ static-pages-bundler
    ```
  
      You can use the next shortcut instead of full `static-pages-bundler`:
    ```
      $ spb
    ```
    
    Also, if the name of your HTML template is not `index.html` you can specify it in the command eg:
    ```
      $ spb <your-html-template>
    ```
    

4. As a result:
Your HTML will be added to `dist/<filename>.html`.
Your CSS will be compressed to `dist/bundle.css`.
Your JS will be compressed to `dist/bundle.js`.
All your `<link` and `<script>` lines that were wrapped info CSS and JS comment lines will be replaced with `<link rel="stylesheet" href="bundle.css">` and `<script src="bundle.js" defer></script>`.
      
  
    
5. If you use any `assets`, then copy folder with them into a place where your new bundle will have access (same relative path as they had previously). `static-pages-bundler` doesn't change any links/paths inside your code, so please, make sure all the paths work (paths to images, icons, fonts, etc.).
