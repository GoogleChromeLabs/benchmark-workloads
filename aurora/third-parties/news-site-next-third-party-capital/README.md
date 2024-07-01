# The Daily Broadcast - Third Party Capital

News Site, with additional [third-party-capital](https://github.com/GoogleChromeLabs/third-party-capital) integration.

- Home Page (/): Features Google Tag Manager, Google Analytics, Google Maps and YoutubeEmbed
- US Page (/us): Features YoutubeEmbed
- World Page (/world): Features Google Maps
- Politics Page (/politics): Features Google Analytics
- Business Page (/business): Features Google Tag Manager

## Link

[https://news-site-next-third-party-capital.netlify.app/](https://news-site-next-third-party-capital.netlify.app/)

## Description

This app is a news-site built with [Next.js](https://nextjs.org/). It utilizes the [News Site Template](https://github.com/flashdesignory/news-site-template) as the basis for styling and functionality.

## Changes (compared to News-Site-Next):

### Content

content supports maps and video data

```JavaScript
video: {
    id: "[VIDEO_ID]",
    width: "1280",
    height: "720",
},
```

```JavaScript
map: {
    q: "Brooklyn+Bridge,New+York,NY",
    mode: "place",
    width: "1280",
    height: "720",
},
```

### Components

ArticleMap implements Google Maps Embed from [next/third-parties](https://github.com/vercel/next.js/tree/canary/packages/third-parties).

```JavaScript
<ArticleMap mapClass={articleStyles["article-map-container"]} map={article.map} meta={article.meta} />
```

ArticleVideo implements [lite-youtube-embed](https://github.com/paulirish/lite-youtube-embed) from [next/third-parties](https://github.com/vercel/next.js/tree/canary/packages/third-parties).
```JavaScript
<ArticleVideo videoClass={articleStyles["article-video-container"]} video={article.video} meta={article.meta} />
```

## Local Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
