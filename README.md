## Project 4: Website Performance Optimization project


<ol>
<li>Check out the repository</li>
<li>Install Dependencies</li>

  ```bash
  $> cd /path/to/your-project-folder
  $> npm install 
  ```

<li>Execute GruntFile.js</li>

```bash
  $> cd /path/to/your-project-folder
  $> grunt default 
  ```
  
</ol>

### Getting started

<ol>
<li>Starting localhost</li>

  ```bash
  $> cd /path/to/your-project-folder
  $> python -m SimpleHTTPServer 8080  (if python version = 2)
  OR
  $> python -m http.server 8080  (if python version = 3)
  ```

<li>Open a browser and visit localhost:8080/dist
   Note: The final output is in the "dist" folder</li>
<li>Running "ngrok" - To create tunnel to publish the local web server to internet</li>

   ``` bash
   $> cd /path/to/your-project-folder  
   ```

   Open Command Prompt (in Windows) and run the following command:
   
   ``` bash
   $> ngrok http 8080  
   ```
</ol>

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
<li><span class="noteLabel">Image compression</span>: Images were rescaled and resized to the final layout dimensions.</li>
<li><span class="noteLabel">Inline critical CSS</span>: critical above-the-fold content styles are inlined and applied to the document immediately vs. blocking loading. This was done using the methods prescribed by Google Developers (see references).</li>
<li><span class="noteLabel">Defer alternative media CSS</span>: print stylesheets, although small, were deliberately chosen not to be served inline in HTML documents due to at least three different pages using it. A media attribute was added to ensure that it would only be downloaded when printing.</li>
<li><span class="noteLabel">Minifying CSS/JS</span>: all CSS and JS files were minified--but not obfuscated--to ensure faster downloading. The formatted and indented files are still present in their respective directories, without the .min in their filenames.</li>
<li><span class="noteLabel">HTML Compression</span>: The index.html has been compressed as per the suggestions from PageSpeed Insights
</ul>

####Part 2: Optimize Frames per Second in pizza.html

<ul>
<li><span class="noteLabel">Loop optimization</span>: unnecessary JS operations were pulled out of for loops where possible, in views/js/main.js.</li>
<li><span class="noteLabel">Debouncing</span>: scroll events were 'debounced' to decouple the animations and only reflow/repaint when needed.</li>
</ul>


####Further areas of improvement

<ul>
<li>Browser caching, configured server-side, could have reduced page loading time.</li>
<li>Using a CDN for Bootstrap files could have reduced page loading time as well, but was minified for the purposes of this exercise.</li>
</ul>


<style>
  .finalValue {
    color: purple; 
    font-weight: bold;
  }
  .noteLabel {
    font-weight: bold;
    color: aqua;
  }

</style>
