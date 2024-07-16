const fs = require("fs").promises;
const { dirname } = require("path");

const { getArguments } = require("./utils");

/**
 * copyFile
 *
 * Copies a file from a source to a destination.
 *
 * @param {string} src Source file.
 * @param {string} dest Destination file.
 */
async function copyFile(src, dest) {
  await fs.mkdir(dirname(dest), { recursive: true });
  await fs.copyFile(src, dest);
}

/**
 * copyConfig
 */
async function copyConfig() {
  const { src, dest } = getArguments({ args: process.argv });

  if (!src) {
    throw Error("No source file passed in!");
  }

  if (!dest) {
    throw Error("No output file passed in");
  }

  await copyFile(src, dest);

  console.log("Done!");
}

copyConfig();
