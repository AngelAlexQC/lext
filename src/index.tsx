import { renderToReadableStream } from "react-dom/server";
import { App } from "./App";

Bun.serve({
  async fetch() {
    const stream = await renderToReadableStream(<App />);
    return new Response(stream, {
      headers: { "Content-Type": "text/html" },
    });
  },
});
