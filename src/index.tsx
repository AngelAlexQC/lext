import { renderToReadableStream } from "react-dom/server";

const App = () => (
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
    </head>
    <body>
      <h1>Hello World</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam</p>
      <img src="https://picsum.photos/200/300" alt="random" />
    </body>
  </html>
);

Bun.serve({
  async fetch() {
    const stream = await renderToReadableStream(<App />);
    return new Response(stream, {
      headers: { "Content-Type": "text/html" },
    });
  },
});
