# The Daily Broadcast - Third Parties

News Site, with additional third parties.

- Home Page (/): Features Google Tag Manager, Google Analytics, Google Maps and YoutubeEmbed
- US Page (/us): Features YoutubeEmbed
- World Page (/world): Features Google Maps
- Politics Page (/politics): Features Google Analytics
- Business Page (/business): Features Google Tag Manager

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

ArticleMap implements Google Maps Embed with a native iframe tag.

```JavaScript
<ArticleMap mapClass={articleStyles["article-map-container"]} map={article.map} meta={article.meta} />
```

ArticleVideo implements Youtube Embed with a native iframe tag.
```JavaScript
<ArticleVideo videoClass={articleStyles["article-video-container"]} video={article.video} meta={article.meta} />
```

## Local Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.