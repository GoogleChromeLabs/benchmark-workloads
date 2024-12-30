const { createDirectory, copyDirectory, copyFiles, updateImports } = require("app-build-scripts");

const filesToMove = [
    { src: "index.html", dest: "./dist/index.html" },
    { src: "favicon.ico", dest: "./dist/favicon.ico" },
    { src: "node_modules/todomvc-css/dist/global.css", dest: "./dist/styles/global.css" },
    { src: "node_modules/todomvc-css/dist/header.css", dest: "./dist/styles/header.css" },
    { src: "node_modules/todomvc-css/dist/footer.css", dest: "./dist/styles/footer.css" },
    { src: "node_modules/todomvc-css/dist/global.constructable.js", dest: "./dist/styles/global.constructable.js" },
    { src: "node_modules/todomvc-css/dist/app.constructable.js", dest: "./dist/styles/app.constructable.js" },
    { src: "node_modules/todomvc-css/dist/topbar.constructable.js", dest: "./dist/styles/topbar.constructable.js" },
    { src: "node_modules/todomvc-css/dist/main.constructable.js", dest: "./dist/styles/main.constructable.js" },
    { src: "node_modules/todomvc-css/dist/bottombar.constructable.js", dest: "./dist/styles/bottombar.constructable.js" },
    { src: "node_modules/todomvc-css/dist/todo-list.constructable.js", dest: "./dist/styles/todo-list.constructable.js" },
    { src: "node_modules/todomvc-css/dist/todo-item.constructable.js", dest: "./dist/styles/todo-item.constructable.js" },
    { src: "node_modules/workload-testing-utils/dist/test-invoker.mjs", dest: "./dist/src/test-invoker.mjs" },
    { src: "node_modules/workload-testing-utils/dist/test-runner.mjs", dest: "./dist/src/test-runner.mjs" },
    { src: "node_modules/workload-testing-utils/dist/params.mjs", dest: "./dist/src/params.mjs" },
    { src: "node_modules/workload-testing-utils/dist/benchmark.mjs", dest: "./dist/src/benchmark.mjs" },
    { src: "node_modules/workload-testing-utils/dist/helpers.mjs", dest: "./dist/src/helpers.mjs" },
    { src: "node_modules/workload-testing-utils/dist/todomvc-testing-utils.min.js", dest: "./dist/src/todomvc-testing-utils.min.js" },
];

const importsToRename = [
    {
        src: "node_modules/todomvc-css/dist/",
        dest: "styles/",
        files: [ "./dist/index.html" ]
    },
    {
        src: "../../../node_modules/todomvc-css/dist/",
        dest: "../../../styles/",
        files: [
            "./dist/src/components/todo-app/todo-app.component.js",
            "./dist/src/components/todo-bottombar/todo-bottombar.component.js",
            "./dist/src/components/todo-item/todo-item.component.js",
            "./dist/src/components/todo-list/todo-list.component.js",
            "./dist/src/components/todo-topbar/todo-topbar.component.js",
        ],
    },
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

    // copy src folder
    await copyDirectory("./src", "./dist/src");

    // copy files to Move
    await copyFiles(filesToMove);

    // rename imports files
    for (const entry of importsToRename){
        const { files, src, dest } = entry;
        await updateImports({ files, src, dest });
    }

    console.log("Done with building!");
};

build();
