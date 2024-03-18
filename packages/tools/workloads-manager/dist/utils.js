const fs = require("fs").promises;
const path = require("path");
const { exec, execSync } = require("child_process");
const chalk = require("chalk");

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
                    /* console.log(
                        `Found a ${target} in the "${path.basename(
                            path.dirname(current)
                        )}" directory 🚀`
                    ); */
                    directories.push(path.dirname(current));
                }
            }
        }
    }

    return directories;
}

function executeScriptSync({ script, directory, env = {} }) {
    console.log(`Attempting to run the ${script} script, with env: ${env}.. ⚙️`);
    try {
        execSync(`npm run ${script}`, {
            cwd: directory,
            stdio: "inherit",
            env: { ...process.env, ...env }
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

async function executeScript({ script, directory, env = {} }) {
    // console.log(`Attempting to run the ${script} script, with env: ${env}.. ⚙️`);

    const currentHex = '#' + Math.floor(Math.random()*16777215).toString(16);

    const child = exec(`npm run ${script}`, {
        cwd: directory,
        stdio: "inherit",
        env: { ...process.env, ...env }
    });

    child.stdout.on('data', (data) => {
        console.log(chalk.hex(currentHex)(`${path.basename(directory)}: ${data}`));
    });

    child.stderr.on('data', (data) => {
        console.log(chalk.red(`${path.basename(directory)} Failure! 😔 - ${data}`));
    });

    function cleanup() {
        child.kill();
        process.exit();
    }

    process.once("SIGINT", cleanup);
    process.once("SIGTERM", cleanup);
    process.once("SIGQUIT", cleanup);
}

module.exports = {
    findDirectories,
    executeScript,
    executeScriptSync
}