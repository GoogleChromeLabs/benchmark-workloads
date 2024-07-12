const fs = require("fs").promises;
const { dirname } = require("path");

/**
 * deleteFile
 *
 * Deletes a file with a src input.
 *
 * @param {string} src Path to the file to delete.
 */
async function deleteFile(src) {
  try {
    await fs.unlink(src);
    console.log(`File ${src} has been deleted.`);
  } catch (err) {
    console.error("No previous file exists, no need to delete!");
  }
}

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
 * prepare
 *
 * Function that copies the workload-testing-utils.min file to a new location.
 * An optional 'HOST' environment variable can be used to assign a custom host directory.
 *
 */
async function prepare() {
  const hostDirectory = process.env.HOST ?? "public";
  await deleteFile(`${hostDirectory}/workload-testing-utils.min.js`);
  await copyFile("node_modules/workload-testing-utils/dist/workload-testing-utils.min.js", `${hostDirectory}/workload-testing-utils.min.js`)
  
  console.log("Done with preparation!");
}

prepare();
