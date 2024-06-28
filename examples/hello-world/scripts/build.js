const { createDirectory, copyFiles } = require("app-build-scripts");

const filesToMove = [
    { src: "index.html", dest: "./dist/index.html" },
    { src: "favicon.ico", dest: "./dist/favicon.ico" },
    { src: "benchmark-connector.min.js", dest: "./dist/benchmark-connector.min.js" },
    { src: "styles.css", dest: "./dist/styles.css" },
    { src: "main.js", dest: "./dist/main.js" },
];

const build = async () => {
    // create dist folder
    await createDirectory("./dist");

    // copy files to Move
    await copyFiles(filesToMove);

    console.log("done!!");
};

build();
