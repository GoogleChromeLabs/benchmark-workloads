# Ad CSS Animations

A simple css animation driven ad that supports multiple ad sizes. 

## using different sizes

The following sizes are supported via UrlSearchParams: 300x250, 970x250, 600x250, 728x90.

example:

```
<iframe src="ad-css-animations/index.html?w=970&h=250"></iframe>
```

note: an exact width & height should be set on the iframe element.

## Features

- an IntersectionObserver is implemented to ensure the ad autoplays when scrolled into view.
- replay of the animation is supported via a replay button on the end frame.
- JsConfetti animation triggered via the action button on the end frame.
