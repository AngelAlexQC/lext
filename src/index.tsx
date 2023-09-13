import { renderToReadableStream } from "react-dom/server";
import { App } from "./App";
import { compileStyles } from "./lib/compileStyles";

await compileStyles();

Bun.serve({
  async fetch(req) {
    const { pathname } = new URL(req.url);
    if (pathname.startsWith("/styles.css")) {
      const styles = Bun.file("./dist/styles.css");
      return new Response(styles, {
        headers: { "Content-Type": "text/css" },
      });
    }

    const stream = await renderToReadableStream(<App />);
    return new Response(stream, {
      headers: { "Content-Type": "text/html" },
    });
  },
});
