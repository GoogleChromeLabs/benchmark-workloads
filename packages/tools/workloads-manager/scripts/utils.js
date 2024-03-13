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

async function findDirectories({ start, target, root, directories = [] }) {
    const list = await fs.readdir(start);
    for (const entry of list) {
        const current = path.resolve(start, entry);
        const stat = await fs.stat(current);
        if (stat && stat.isDirectory()) {
            if (!excludeList.includes(entry)) {
                await findDirectories({ start: current, target, root, directories });
            }
        } else {
            if (entry === target) {
                if (path.basename(path.dirname(current)) !== root) {
                    console.log(
                        `Found a ${target} in the "${path.basename(
                            path.dirname(current)
                        )}" directory 🚀`
                    );
                    console.log("Adding directory to result.")
                    directories.push(path.dirname(current));
                }
            }
        }
    }

    return directories;
}

function executeScript({ script, directory }) {
    console.log(`Attempting to run the ${script} script.. ⚙️`);
    try {
        execSync(`npm run ${script}`, {
            cwd: directory,
            stdio: "inherit",
        });
        console.log("Success! 👏");
        return ({
            dir: path.basename(directory),
            status: "success",
        });
    } catch (e) {
        console.log("Failure! 😔");
        return ({
            dir: path.basename(directory),
            status: "failure",
        });
    }
}

module.exports = {
    findDirectories,
    executeScript
}