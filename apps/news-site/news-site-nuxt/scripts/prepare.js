const fs = require("fs").promises;
const getDirName = require("path").dirname;

async function deleteFile(src) {
    try {
        await fs.unlink(src);
        console.log(`File ${src} has been deleted.`);
    } catch (err) {
        console.error("No previous file exists, no need to delete!");
    }
}

async function copyFile(src, dest) {
    await fs.mkdir(getDirName(dest), { recursive: true });
    await fs.copyFile(src, dest);
    console.log(`File ${src} has been copied to ${dest}.`);
}

async function prepare() {
    await deleteFile("public/benchmark-connector.min.js");
    await copyFile("node_modules/benchmark-connector/dist/benchmark-connector.min.js", "public/benchmark-connector.min.js");
    console.log("Done with preparation!");
}

prepare();
