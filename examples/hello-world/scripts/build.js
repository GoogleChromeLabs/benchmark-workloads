const { createDirectory, copyFiles, copyDirectory, updateImports } = require("app-build-scripts");

const filesToMove = [
    { src: "index.html", dest: "./dist/index.html" },
    { src: "favicon.ico", dest: "./dist/favicon.ico" },
    { src: "node_modules/workload-testing-utils/dist/test-invoker.mjs", dest: "./dist/src/test-invoker.mjs" },
    { src: "node_modules/workload-testing-utils/dist/test-runner.mjs", dest: "./dist/src/test-runner.mjs" },
    { src: "node_modules/workload-testing-utils/dist/params.mjs", dest: "./dist/src/params.mjs" },
    { src: "node_modules/workload-testing-utils/dist/benchmark.mjs", dest: "./dist/src/benchmark.mjs" },
    { src: "node_modules/workload-testing-utils/dist/helpers.mjs", dest: "./dist/src/helpers.mjs" },
];

const importsToRename = [
    {
        src: "/src/",
        dest: "./",
        files: [ "./dist/src/index.js" ]
    },
    {
        src: "/node_modules/workload-testing-utils/dist/",
        dest: "./",
        files: [
            "./dist/src/index.js",
            "./dist/src/workload-test.mjs"
        ]
    }
];

const build = async () => {
    // create dist folder
    await createDirectory("./dist");

    // copy files to Move
    await copyFiles(filesToMove);

    // copy src folder
    await copyDirectory("./src", "./dist/src");

    // copy styles folder
    await copyDirectory("./styles", "./dist/styles");

    // rename imports files
    for (const entry of importsToRename){
        const { files, src, dest } = entry;
        await updateImports({ files, src, dest });
    }

    console.log("Done with building!");
};

build();
