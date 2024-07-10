const { createDirectory, copyFiles, copyDirectory } = require("app-build-scripts");

const filesToMove = [
    { src: "index.html", dest: "./dist/index.html" },
    { src: "favicon.ico", dest: "./dist/favicon.ico" },
    { src: "benchmark-connector.min.js", dest: "./dist/benchmark-connector.min.js" },
];

const build = async () => {
    // create dist folder
    await createDirectory("./dist");

    // copy files to Move
    await copyFiles(filesToMove);

    // copy styles folder
    await copyDirectory("./assets", "./dist/assets");

    // copy src folder
    await copyDirectory("./src", "./dist/src");

    // copy styles folder
    await copyDirectory("./styles", "./dist/styles");

    console.log("done!!");
};

build();
