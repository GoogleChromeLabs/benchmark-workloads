const fs = require("fs").promises;
const path = require("path");
const { execSync } = require("child_process");

const excludeList = ["packages", "node_modules", ".angular", ".next", ".nuxt", ".output", ".dist", ".docs"];

const reports = [];

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
                if (path.basename(path.dirname(file)) !== "aurora-workloads") {
                    reports.push(path.basename(path.dirname(file)))
                    console.log("Found one 🚀", entry, "directory: ", path.basename(path.dirname(file)));
                    console.log("Attempting to build.. ⚙️");
                    execSync("npm run build:static", { cwd: path.dirname(file), stdio: "inherit" });
                    console.log("Build script completed! 👏");
                    console.log("*********************************")
                }
            }
        }
    }

    return;
}

async function build() {
    await (searchDir("../../../", "package.json"));
    console.log("The following apps have been built:")
    reports.forEach(report => console.log(`✅ ${report}`))
    console.log("*********************************")
    console.log("See you later! 👋");
    console.log("*********************************")
}

build();