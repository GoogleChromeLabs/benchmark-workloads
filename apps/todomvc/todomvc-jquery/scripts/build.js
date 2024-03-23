const fs = require("fs").promises;
const { dirname } = require("path");

const filesToMove = [
    { src: "index.html", dest: "./dist/index.html" },
    { src: "favicon.ico", dest: "./dist/favicon.ico" },
    { src: "benchmark-connector.min.js", dest: "./dist/benchmark-connector.min.js" },
    { src: "node_modules/todomvc-app-css/index.css", dest: "./dist/index.css" },
    { src: "node_modules/jquery/dist/jquery.min.js", dest: "./dist/jquery.min.js" },
    { src: "node_modules/handlebars/dist/handlebars.min.js", dest: "./dist/handlebars.min.js" },
    { src: "node_modules/director/build/director.min.js", dest: "./dist/director.min.js" }
];

const importsToRename = [
    {
        src: "node_modules/todomvc-app-css/",
        dest: "",
        files: [ "./dist/index.html" ]
    },
    {
        src: "src/",
        dest: "",
        files: [ "./dist/index.html" ]
    },
    {
        src: "node_modules/jquery/dist/",
        dest: "",
        files: [ "./dist/index.html" ]
    },
    {
        src: "node_modules/handlebars/dist/",
        dest: "",
        files: [ "./dist/index.html" ]
    },
    {
        src: "node_modules/director/build/",
        dest: "",
        files: [ "./dist/index.html" ]
    },
]

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

const build = async () => {
    // create dist folder
    await createDirectory("./dist");

    // copy src folder
    await copyDirectory("./src", "./dist");

    // copy files to Move
    await copyFiles(filesToMove);

    // rename imports files
    for (const entry of importsToRename){
        const { files, src, dest } = entry;
        await updateImports({ files, src, dest });
    }

    console.log("done!!");
};

build();
