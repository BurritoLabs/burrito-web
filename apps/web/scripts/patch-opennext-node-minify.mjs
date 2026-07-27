import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const target = path.resolve(
  "node_modules",
  "@opennextjs",
  "aws",
  "dist",
  "minimize-js.js",
);
const legacyImport = 'import minify from "@node-minify/core";';
const currentImport = 'import { minify } from "@node-minify/core";';
const source = await readFile(target, "utf8");

if (!source.includes(currentImport)) {
  if (!source.includes(legacyImport)) {
    throw new Error(
      "OpenNext minifier import changed; review the node-minify compatibility patch.",
    );
  }

  await writeFile(target, source.replace(legacyImport, currentImport), "utf8");
}
