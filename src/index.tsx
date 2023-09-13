import { renderToReadableStream } from "react-dom/server";
import { App } from "./App";
import { execSync } from "child_process";
const command = "bunx tailwindcss -i ./src/styles.css -o dist/styles.css";
execSync(command, { stdio: "inherit" });
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
