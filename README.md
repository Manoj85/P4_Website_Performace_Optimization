## Project 4: Website Performance Optimization project


### To Build Project Locally

###### Clone the repo, and navigate to its root directory.

```bash
  $> cd /path/to/your-project-folder
  ```
  
###### With NodeJs & Npm installed, in the project directory simply run:

###### Install Dependencies

```bash  
  $> npm install
  ```

###### Once dependencies are installed, Run the below command:
  
```bash  
  $> grunt default 
  ```

###### The above statement will output a build in /dist


### Getting started

###### Starting localhost

  ```bash
  $> cd /path/to/your-project-folder
  $> python -m SimpleHTTPServer 8080  (if python version = 2)
  OR
  $> python -m http.server 8080  (if python version = 3)
  ```

###### Open a browser and visit <a target="_blank" href="http://localhost:8080/dist"> http://localhost:8080/dist </a>

###### Note: The final output is in the "dist" folder

###### Running "ngrok" - To create tunnel to publish the local web server to internet

``` bash
 $> cd /path/to/your-project-folder  
 ```

###### Open Command Prompt (in Windows) and run the following command:
   
   ``` bash
   $> ngrok http 8080  
   ```

#### Part 1: Optimize PageSpeed Insights score for index.html

<table style="border-collapse: collapse">
<tr>
    <td colspan="2">Initial PageSpeed Insights</td>
    <td colspan="2">Final PageSpeed Insights</td>
</tr>
<tr>
    <td>Mobile</td>
    <td>75/100</td>
    <td>Mobile</td>
    <td class="finalValue">94/100</td>
</tr>
<tr>
    <td>Desktop</td>
    <td>79/100</td>
    <td>Desktop</td>
    <td class="finalValue">95/100</td>
</tr>
</table>

Implemented Grunt automation for:
<ul>
<li>Image compression: Images were rescaled and resized to the final layout dimensions.</li>
<li>Inline critical CSS: critical above-the-fold content styles are inlined and applied to the document immediately vs. blocking loading. This was done using the methods prescribed by Google Developers (see references).</li>
<li>Defer alternative media CSS: print stylesheets, although small, were deliberately chosen not to be served inline in HTML documents due to at least three different pages using it. A media attribute was added to ensure that it would only be downloaded when printing.</li>
<li>Minifying CSS/JS: all CSS and JS files were minified--but not obfuscated--to ensure faster downloading. The formatted and indented files are still present in their respective directories, without the .min in their filenames.</li>
<li>HTML Compression: The index.html has been compressed as per the suggestions from PageSpeed Insights</li>
<li>Browser Caching: Enabled browser caching by automatically adding version numbers to script and link tags</li>
</ul>


#### Part 2: Optimize Frames per Second in pizza.html

<table style="border-collapse: collapse">
<tr>
    <td colspan="2" align="center">Final Metrics</td>    
</tr>
<tr>
    <td>Time to Resize Pizzas</td>
    <td class="finalValue"> &lt; 5ms </td>
</tr>
<tr>
    <td>Time to generate pizzas on load</td>
    <td class="finalValue"> 178ms </td>
</tr>
<tr>
    <td>Average scripting time to generate last 10 frames</td>
    <td class="finalValue"> 13.900499999999942ms </td>
</tr>
</table>

###### TL;DR

<ul>
<li>Loop optimization: unnecessary JS operations were pulled out of for loops where possible, in views/js/main.js.</li>
<li>Debouncing: scroll events were 'debounced' to decouple the animations and only reflow/repaint when needed.</li>
</ul>

###### All Steps

<ul>
<li> Moved capitalization from String.prototype.capitalize to a css rule </li>
<li> De-nested the following function delcarations: </li>
<ul>
<li> changleSliderLabel </li>
<li> determineDx </li>
<li> changePizzaSizes </li>
<li> sizedSwitcher </li>
</ul>
<li> Debounced onScroll Animation </li>
<li> Moved DOM queries out of loops where applicable </li>
<li> Switched for loops to stored value ( cached versions ) where applicable </li>
<li> Switched animation from operating on left to more performant translateX property </li>
<li> Switched # of moving pizzas from a static value to one calculated based on availwidth & availheight ( reduces overall count ) </li>
<li> Replaced querySelector & querySelectorAll with the more performant counterparts where applicable.
added translate3d property to moving pizza elements to force 3d acceleration** </li>
</ul>

#### Summary of Grunt Tasks:

###### htmlmin task
_Run this task with the `grunt htmlmin` command._
<ul>
<li> Minifies the *.html files and copies to the "dist" folder</li>
</ul>

###### cssmin task
_Run this task with the `grunt cssmin` command._
<ul>
<li> Minifies the *.css files and copies to the "dist" folder</li>
</ul>

###### uglify task
_Run this task with the `grunt uglify` command._
<ul>
<li> Minifies the *.js files and copies to the "dist" folder</li>
<li> Used "compress" options to compress the *.js files. Possible compress options can be found <a href="https://github.com/mishoo/UglifyJS2#compressor-options"> here </a> </li>
</ul>


###### uglify task
_Run this task with the `grunt compress` command._
<ul>
<li> Compresses the *.html files inside the "dist" folder</li>
</ul>

###### cache_control task
_Run this task with the `grunt cache_control` command._
<ul>
<li> This task automatically appends version number as ?v=1.0 to every script and link tags</li>
<li> Note: Not able to append it to <img> tags yet. Will update when found the solution</li>
</ul>

###### replace task
_Run this task with the `grunt replace` command._
<ul>
<li> This task will replace the text in the mentioned files</li>
<li> Inside the source folder, i am loading the unminified versions of files</li>
<span style="color: blue;"> src='js/analytics.js' </span>
<li> When disted, the references to unminified versions inside the dist folder will be replaced with minified versions</li>
<span style="color: blue;"> src='js/analytics.min.js' </span>
</ul>

#### Further areas of improvement

<ul>
<li>Browser caching, configured server-side, could have reduced page loading time.</li>
<li>Using a CDN for Bootstrap files could have reduced page loading time as well, but was minified for the purposes of this exercise.</li>
</ul>


