import { Button, buttonVariants } from "./components/ui/button";

export function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Lext - 🚀 The next generation web framework for Bun</title>
        <link href="/styles.css" rel="stylesheet" />
      </head>
      <body>
        <main className="p-4 flex flex-col items-center gap-4">
          <h1 className="text-3xl font-bold">
            Build your next generation web app with Lext
          </h1>
          <p>
            Lext is a new web framework for Bun. It is designed to be simple,
            flexible and fast.
          </p>
          <Button
            variant="default"
            onClick={(e) => {
              e.preventDefault();
              console.log("This is a client-side event handler!");
              alert("This is a client-side event handler!");
            }}>
            Get started
          </Button>
        </main>
      </body>
    </html>
  );
}
