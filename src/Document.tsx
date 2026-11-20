import type { ParentComponent } from "solid-js";
import { HydrationScript } from "@solidjs/web";

const FOUC_SCRIPT =
  'try{var s=localStorage.getItem("color-scheme");if(s==="light"||s==="dark"){var m=document.querySelector(\'meta[name="color-scheme"]\');if(m)m.setAttribute("content",s);}}catch(e){}';

const Document: ParentComponent = (props) => {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="color-scheme" content="light dark" />
        <script>{FOUC_SCRIPT}</script>
        <meta name="theme-color" content="#0b1120" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=Outfit:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <HydrationScript />
      </head>
      <body>{props.children}</body>
    </html>
  );
};

export default Document;
