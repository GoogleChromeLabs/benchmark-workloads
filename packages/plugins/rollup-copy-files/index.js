import fs from "fs-extra";
import path from "path";
import os from "os";
import terser from "terser";

function ensureContentsEndsWithEmptyLine(contents) {
  if (!contents.endsWith(os.EOL)) return contents + os.EOL;
  return contents;
}

async function copy(src, dest, rename, file, minify) {
  if (file) {
    let fileContents = "";
    try {
      fileContents = fs.readFileSync(file, "utf-8");
    } catch (e) {
      fs.createFileSync(file);
    }
    const srcContents = fs.readFileSync(src, "utf-8");
    fs.writeFileSync(
      file,
      `${ensureContentsEndsWithEmptyLine(fileContents)}\n${srcContents}`
    );
  } else {
    const { base, name, ext } = path.parse(src);
    const fileName = rename ? rename(name, ext.replace(".", "")) : base;
    const outputPath = path.join(dest, fileName);
    if (minify) {
      const srcContents = fs.readFileSync(src, "utf-8");
      const destContents = await terser.minify(srcContents, {
        sourceMap: true,
      });
      fs.createFileSync(outputPath);
      fs.writeFileSync(outputPath, destContents.code);
    } else {
      await fs.copy(src, outputPath);
    }
  }
}

function copyFiles({
  src,
  dest = "dist/",
  hook = "generateBundle",
  rename,
  file,
  minify = false,
} = {}) {
  if (!src) throw new Error("src option missing");

  return {
    name: "copy-files",
    [hook]: async () => {
      const { globby } = await import("globby");
      const matchedPaths = await globby(src, {
        expandDirectories: false,
      });

      await Promise.all(
        matchedPaths.map((src) => copy(src, dest, rename, file, minify))
      );
    },
  };
}

export { copyFiles };
