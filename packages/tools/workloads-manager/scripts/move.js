const fs = require("fs-extra");
const path = require("path");

const { findDirectoriesByName } = require("./utils");

/**
 * createDirectory
 *
 * Removes and recreates a directory.
 *
 * @param {string} directory Directory name.
 */
async function createDirectory(directory) {
  await fs.rm(directory, { recursive: true, force: true });
  await fs.mkdir(directory);
}

/**
 * copyDirectory
 *
 * Copies a source folder to a destination folder.
 *
 * @param {string} src Source directory.
 * @param {string} dest Destination directory.
 */
async function copyDirectory(src, dest) {
  await fs.cp(src, dest, { recursive: true }, (err) => {
    if (err) console.error(err);
  });
}

async function moveWorkload({ workload, start, output }) {
  // Name of the root directory - "aurora-workloads".
  const root = path.basename(path.resolve(start));

  const { name, distDirectory = "/dist" } = workload;

  const results = await findDirectoriesByName({
    start,
    target: name,
    root,
  });

  const directory = results[0];

  const src = `${directory}${distDirectory}`;
  const dest = `${output}/${name}`;

  await createDirectory(dest);
  await copyDirectory(src, dest);
}

async function moveWorkloads() {
  // We're starting from the root directory of the monorepo.
  const start = "../../../";
  // Adds a '.workloads' folder in the root of the monorepo.
  const output = path.resolve(`${start}.workloads`);

  if (!process.env.DATA) {
    throw Error("No data file passed in!");
  }

  await createDirectory(output);

  const { workloads } = JSON.parse(fs.readFileSync(process.env.DATA, "utf-8"));

  for (const workload of workloads) {
    await moveWorkload({ workload, start, output });
  }

  console.log("Done!");
}

moveWorkloads();
