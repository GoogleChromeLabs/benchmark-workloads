const fs = require("fs").promises;
const { dirname } = require("path");

async function createDirectory(directory) {
  await fs.rm(directory, { recursive: true, force: true });
  await fs.mkdir(directory);
}

async function copyDirectory(src, dest) {
  await fs.cp(src, dest, { recursive: true }, (err) => {
      if (err)
          console.error(err);
  });
}

async function copyFile(src, dest) {
  await fs.mkdir(dirname(dest), { recursive: true });
  await fs.copyFile(src, dest);
};

async function copyFiles(files) {
  for (const file of files)
      await copyFile(file.src, `${file.dest}`);
};

async function updateImportsInFile({ file, src, dest }) {
  let contents = await fs.readFile(`${file}`, "utf8");
  contents = contents.replaceAll(src, dest);
  await fs.writeFile(`${file}`, contents);
};

async function updateImports({ files, src, dest }) {
  for (const file of files) {
      await updateImportsInFile({ file, src, dest })
  }
}

module.exports = {
  createDirectory,
  copyDirectory,
  copyFile,
  copyFiles,
  updateImports,
  updateImportsInFile
}