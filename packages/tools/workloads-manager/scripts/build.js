const fs = require("fs").promises;
const path = require("path");
const { execSync } = require("child_process");

const excludeList = [
    ".angular",
    ".git",
    ".github",
    ".next",
    ".nuxt",
    ".output",
    ".rollup.cache",
    ".wireit",
    "dist",
    "docs",
    "node_modules",
    "packages",
    "public",
];
const reports = [];

async function searchDir(dir, target) {
    const list = await fs.readdir(dir);
    for (const entry of list) {
        const file = path.resolve(dir, entry);
        const stat = await fs.stat(file);
        if (stat && stat.isDirectory()) {
            if (!excludeList.includes(entry)) {
                await searchDir(file, target);
            }
        } else {
            if (entry === target) {
                if (path.basename(path.dirname(file)) !== "aurora-workloads") {
                    console.log(
                        `Found a ${target} in the "${path.basename(
                            path.dirname(file)
                        )}" directory 🚀`
                    );
                    console.log("Attempting to run the build script.. ⚙️");
                    try {
                        execSync("npm run build:static", {
                            cwd: path.dirname(file),
                            stdio: "inherit",
                        });
                        reports.push({dir: path.basename(path.dirname(file)), status: "success"});
                        console.log("Success! 👏");
                    } catch(e) {
                        reports.push({dir: path.basename(path.dirname(file)), status: "failure"});
                        console.log("Failure! 😔");
                    }
                    console.log("*********************************");
                }
            }
        }
    }

    return;
}

async function build() {
    const target = "package.json";
    const dir = "../../../";

    console.log(`Looking for ${target} files, starting from root 👀`);
    await searchDir(dir, target);

    console.log("The following apps have been attempted to build:");
    reports.forEach(({dir, status}) => {
        status === "success" ? console.log(`🟢 ${dir}`) : console.log(`🔴 ${dir}`);
    });
    console.log("*********************************");
    console.log("Bye! 👋");
    console.log("*********************************");
}

build();
