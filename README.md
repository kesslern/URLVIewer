# URL Viewer

A simple Angular webapp to make viewing and editing a URL easier.

There is no build. Put the 'app' folder on a web server, or use the Gulp server with 'gulp webserver'.

### Bookmarklet

Copy this Javascript and paste it onto your bookmark toolbar. This bookmarklet will open the current URL in the URL Viewer in a new tab.

```
javascript: (function() {
    var viewerURL = "https://zapdos.duckdns.org/urlviewer/#/";
    var newURL = viewerURL + window.location.href;

    window.open(newURL, '_blank').focus();
}());
```

### License

URL Viewer is distributed with the MIT License.