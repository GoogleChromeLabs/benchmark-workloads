const fs = require("fs").promises;
const { resolve } = require("path");

async function deleteFile(src) {
    try {
        await fs.unlink(src);
        console.log(`File ${src} has been deleted.`);
    } catch (err) {
        console.error("No previous file exists, no need to delete!");
    }
}

async function copyAndUpdate({ meta, src, dest }) {
    let contents = await fs.readFile(`${src}`, "utf8");

    if (meta) {
        const metaData = await fs.readFile(resolve(meta));
        const { name, version } = JSON.parse(metaData);
        contents = `window.name = "${name}"; window.version = "${version}"; ${contents}`;
    }

    await fs.writeFile(`${dest}`, contents);
}

async function prepare() {
    await deleteFile("public/benchmark-connector.min.js");
    await copyAndUpdate({
        meta: "./package.json",
        src: "node_modules/benchmark-connector/dist/benchmark-connector.min.js",
        dest: "public/benchmark-connector.min.js",
    });
    console.log("Done with preparation!");
}

prepare();
