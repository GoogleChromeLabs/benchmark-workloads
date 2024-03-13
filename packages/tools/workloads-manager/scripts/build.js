const fs = require("fs").promises;
const path = require("path");
const { execSync } = require("child_process");

const excludeList = ["packages", "node_modules", '.next'];

async function searchDir(dir, target) {
    const list = await fs.readdir(dir);
    for(const entry of list) {
        const file = path.resolve(dir, entry);
        const stat = await fs.stat(file);
        if (stat && stat.isDirectory()) {
            if (!excludeList.includes(entry)) {
                await searchDir(file, target)
            }
        } else {
            if (entry === target) {
                console.log("found one 🚀", file, "stat", path.basename(path.dirname(file)));
                if (path.basename(path.dirname(file)) !== "aurora-workloads") {
                    execSync("npm run build:static", { cwd: path.dirname(file), stdio: "inherit" });
                }
            }
        }
    }

    return;
}

async function build() {
    await (searchDir("../../../", "package.json"));
    console.log("done!");
}

build();