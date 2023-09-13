export async function compileStyles() {
  const command = "bunx tailwindcss -i ./src/styles.css -o dist/styles.css";

  const proc = Bun.spawn([
    "bunx",
    "tailwindcss",
    "-i",
    "./src/styles.css",
    "-o",
    "dist/styles.css",
  ]);

  await proc.exited;
}

await compileStyles();
