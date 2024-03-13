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

async function searchDir({ dir, target, root, script }) {
    const list = await fs.readdir(dir);
    for (const entry of list) {
        const current = path.resolve(dir, entry);
        const stat = await fs.stat(current);
        if (stat && stat.isDirectory()) {
            if (!excludeList.includes(entry)) {
                await searchDir({ dir: current, target, root, script });
            }
        } else {
            if (entry === target) {
                if (path.basename(path.dirname(current)) !== root) {
                    console.log(
                        `Found a ${target} in the "${path.basename(
                            path.dirname(current)
                        )}" directory 🚀`
                    );
                    console.log("Attempting to run the build script.. ⚙️");
                    try {
                        execSync(`npm run ${script}`, {
                            cwd: path.dirname(current),
                            stdio: "inherit",
                        });
                        reports.push({
                            dir: path.basename(path.dirname(current)),
                            status: "success",
                        });
                        console.log("Success! 👏");
                    } catch (e) {
                        reports.push({
                            dir: path.basename(path.dirname(current)),
                            status: "failure",
                        });
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
    // We're looking for package.json files, to know what directory we should run the build script in.
    const target = "package.json";
    // We're starting from the root directory of the monorepo.
    const dir = "../../../";
    // Name of the root directory - "aurora-workloads".
    const root = path.basename(path.resolve(dir));
    // build to run (build, build:static, build:gh).
    const script = "build:static";

    console.log(`Looking for ${target} files, starting from root 👀`);
    await searchDir({ dir, target, root, script });

    console.log("The following apps have been attempted to build:");
    reports.forEach(({ dir, status }) => {
        status === "success"
            ? console.log(`🟢 ${dir}`)
            : console.log(`🔴 ${dir}`);
    });
    console.log("*********************************");
    console.log("Bye! 👋");
    console.log("*********************************");
}

build();
