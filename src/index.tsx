import { renderToReadableStream } from "react-dom/server";
import { compileStyles } from "./lib/compileStyles";
import { FileSystemRouter } from "bun";

await compileStyles();

export default {
  port: 3000,
  async fetch(request: Request) {
    const { pathname } = new URL(request.url);

    if (pathname === "/styles.css") {
      const styles = Bun.file("./dist/styles.css");

      return new Response(styles, {
        headers: {
          "Content-Type": "text/css",
        },
      });
    }

    const router = new FileSystemRouter({
      dir: import.meta.dir + "/pages",
      style: "nextjs",
    });

    const route = router.match(request);

    const { default: Root } = await import(route?.filePath!);
    return new Response(
      await renderToReadableStream(<Root {...route?.params} />)
    );
  },
};
