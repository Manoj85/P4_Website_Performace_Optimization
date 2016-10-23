## Project 4: Website Performance Optimization project



Check out the repository

Install Dependencies

```bash
  $> cd /path/to/your-project-folder
  $> python -m SimpleHTTPServer 8080
  ```

Execute GruntFile.js
  
```bash
  $> cd /path/to/your-project-folder
  $> grunt default 
  ```

### Getting started


Starting localhost

  ```bash
  $> cd /path/to/your-project-folder
  $> python -m SimpleHTTPServer 8080  (if python version = 2)
  OR
  $> python -m http.server 8080  (if python version = 3)
  ```

Open a browser and visit localhost:8080/dist

Note: The final output is in the "dist" folder

Running "ngrok" - To create tunnel to publish the local web server to internet

``` bash
 $> cd /path/to/your-project-folder  
 ```

Open Command Prompt (in Windows) and run the following command:
   
   ``` bash
   $> ngrok http 8080  
   ```

####Part 1: Optimize PageSpeed Insights score for index.html

<table style="border-collapse: collapse">
<tr>
    <td colspan="2">Initial PageSpeed Insights</td>
    <td colspan="2">Final PageSpeed Insights</td>
</tr>
<tr>
    <td>Mobile</td>
    <td>75/100</td>
    <td>Mobile</td>
    <td class="finalValue">92/100</td>
</tr>
<tr>
    <td>Desktop</td>
    <td>79/100</td>
    <td>Desktop</td>
    <td class="finalValue">94/100</td>
</tr>
</table>


<ul>
<li>Image compression: Images were rescaled and resized to the final layout dimensions.</li>
<li>Inline critical CSS: critical above-the-fold content styles are inlined and applied to the document immediately vs. blocking loading. This was done using the methods prescribed by Google Developers (see references).</li>
<li>Defer alternative media CSS: print stylesheets, although small, were deliberately chosen not to be served inline in HTML documents due to at least three different pages using it. A media attribute was added to ensure that it would only be downloaded when printing.</li>
<li>Minifying CSS/JS: all CSS and JS files were minified--but not obfuscated--to ensure faster downloading. The formatted and indented files are still present in their respective directories, without the .min in their filenames.</li>
<li>HTML Compression: The index.html has been compressed as per the suggestions from PageSpeed Insights
</ul>

####Part 2: Optimize Frames per Second in pizza.html

<ul>
<li>Loop optimization: unnecessary JS operations were pulled out of for loops where possible, in views/js/main.js.</li>
<li>Debouncing: scroll events were 'debounced' to decouple the animations and only reflow/repaint when needed.</li>
</ul>


####Further areas of improvement

<ul>
<li>Browser caching, configured server-side, could have reduced page loading time.</li>
<li>Using a CDN for Bootstrap files could have reduced page loading time as well, but was minified for the purposes of this exercise.</li>
</ul>


