# The Daily Broadcast

News Site, with additional third-party-capital integration.

- Home Page (/): Features Google Tag Manager, Google Analytics, Google Maps and YoutubeEmbed
- US Page (/us): Features YoutubeEmbed
- World Page (/world): Features Google Maps
- Politics Page (/politics): Features Google Analytics
- Business Page (/business): Features Google Tag Manager

Changes (compared to News-Site-Next):

content supports maps and video data

```JavaScript
video: {
    id: "z-8vVxz-If0",
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

components: added ArticleMap and ArticleVideo

```JavaScript
<ArticleMap mapClass={articleStyles["article-map-container"]} map={article.map} meta={article.meta} />
```

```JavaScript
<ArticleVideo videoClass={articleStyles["article-video-container"]} video={article.video} meta={article.meta} />
```


## Description

This app is a news-site built with [Next.js](https://nextjs.org/). It utilizes the [News Site Template](https://github.com/flashdesignory/news-site-template) as the basis for styling and functionality.

## Local Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.