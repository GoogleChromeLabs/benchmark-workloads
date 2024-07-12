# The Daily Broadcast

**_NOTE:_** This workload does not support static builds and relies on a node server to be able to run properly.

## Link

[https://news-site-next-static.netlify.app/](https://news-site-next-static.netlify.app/)

## Description

This app is a news-site built with [Next.js](https://nextjs.org/). It utilizes the [News Site Template](https://github.com/flashdesignory/news-site-template) as the basis for styling and functionality.

## Features

### Routing

Routing is done through a `pages router`, which ensures that full functionality is possible with static builds.

### Navigation Bar

This site supports page navigation through a navigation bar, that is accessible through a menu button on mobile view ports.
Some pages are hidden in a `more` dropdown, to simulate how a web site might implement a large amount of navigation buttons.

### Home Navigation

Clicking on the web site title, which is persistent on all pages, always navigates to the home page.

### Footer Navigation

The footer contains persistent navigation links, including sub-section links, that directly navigate to a page's section on click.

### Sidebar Navigation

The `sattelite icon` in the header opens a sidebar that contains persistent navigation links, including sub-section links, that directly navigate to a page's section on click.

### Settings Modal

An `a11y icon` in the footer opens a settings modal, that lets you change a few a11y-related behaviors.

-   Reduced Motion: enables / disables animations.
-   High Contrast: applies / removes a high-contrast theme.

### Login Modal

A login modal is available through a `log in` icon in the header. This modal is currently not making any kind of requests and simply closes the modal on submit.

### Local Storage

-   `news-site-notification-cookies-seen`: sets a boolean value on interaction with the cookies notification.
-   `news-site-settings-high-contrast`: sets a boolean value on interaction with the high contrast toggle.
-   `news-site-settings-reduced-motion`: sets a boolean value on interaction with the reduced motion toggle.

## Local Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.