# Basic usage
### Installation
To istall `static-pages-bundler` globaly, simply run [```npm install -g static-pages-bundler```] from terminal.

You may remove `-g` flag if you want to install `static-pages-bundler` as a dev dependansy. So, the command will be [```npm i --save-dev static-pages-bundler```].


### Bundling process

1. Create next structure in a folder you're going to run the script from:
    ```
      dist
      dist/css
      dist/js
    ```
    You may skip the step, but in the case, you will have to run `static-pages-bundler` using `sudo` to give the bundler permissions to create that folder structure for you (running npm libs with `sudo` is never recommended with any third party lib).
&nbsp;
2. In your HTML template setup the entry points for the bundler: 
     - wrap your `<link ...>` elements that have CSS files imports via CSS comments:
       ```
       <!-- Bundler CSS start -->
         ... your <link ...> elements
       <!-- Bundler CSS end -->
       ```
     - wrap your `<script ...>` elements that have JS scripts via JS comments:
       ```
       <!-- Bundler JS start -->
         ... your <script ...> elements
       <!-- Bundler JS end -->
       ```
       `!` Its important to use exact same comment lines (`<!-- Bundler CSS start -->`, `<!-- Bundler CSS end -->`, `<!-- Bundler JS start -->` and `<!-- Bundler JS end -->`).
       `!` Also, please use only one entry point for CSS and one for JS. The library doesn't work with multiple entry points for now.
&nbsp;
1. Go to the location where your `index.html` located and run [```static-pages-bundler```] command from your terminal.
  You can use [```spb```] shortcut for the command instead of full [```static-pages-bundler```].
  Also, if the name of your HTML template is not `index.html` you can specify it in the command eg [```spb <your-html-template>```].
&nbsp;
1. As a result:
Your HTML will be added to `dist/<filename>.html`.
Your CSS will be compressed to `dist/css/bundle.css`.
Your JS will be compressed to `dist/css/bundle.js`.
All your `<link` and `<script>` lines that were wrapped info CSS and JS comment lines will be replaced with `<link rel="stylesheet" href="css/bundle.css">` and `<script src="js/bundle.js" defer></script>`.
&nbsp;
5. If you use any `assets`, then copy folder with them into a place where your new bundle will have access (same relative path as they had previously). `static-pages-bundler` doesn't change any links/paths inside your code, so please, make sure all the paths work (paths to images, icons, fonts, etc.).
