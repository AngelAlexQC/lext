import { renderToReadableStream } from "react-dom/server";
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

    const folder = "pages";
    const checkPath = pathname === "/" ? "/index" : pathname;
    const path = `${folder}${checkPath}.tsx`;
    const Page = await import(`./${path}`);

    const stream = await renderToReadableStream(<Page.default />);
    return new Response(stream, {
      headers: { "Content-Type": "text/html" },
    });
  },
});
