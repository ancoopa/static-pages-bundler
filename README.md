# Basic usage
### Installation


### Bundle schema

1. Create next structure in folder you're going to run script from:
    ```
      dist
      dist/css
      dist/js
    ```
    You may skip the step, but in the case you will have to run the bundler using `sudo` to give the bundler permissions to create that folder structure for you (running npm libs with `sudo` is never recommended with any third party lib).
&nbsp;
1. In your HTML template setup the entry points for the bundler: 
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
3. Run `<my-module-name> <path-to-your-html-template-(eg. index.html)>`.
&nbsp;
4. As a result:
Your HTML will be added to `dist/<filename>.html`.
Your CSS will be compressed to `dist/css/bundle.css`.
Your JS will be compressed to `dist/css/bundle.js`.
All your `<link` and `<script>` lines that were wrapped info CSS and JS comment lines will be replaced with `<link rel="stylesheet" href="css/bundle.css">` and `<script src="js/bundle.js" defer></script>`.
&nbsp;
5. If you use ane `assets`, copy foldet with them into a place where your new bundle will have access (same relative path as they had previously) Bundler doesn't change any links inside your code, so please, make sure all the pathes work (pathes to images, icons, fonts, ect.).
