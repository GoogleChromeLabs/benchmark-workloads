const fs = require("fs").promises;
const { resolve } = require("path");

async function updateVariables({ meta, src }) {
  let contents = await fs.readFile(`${src}`, "utf8");

  if (meta) {
    const metaData = await fs.readFile(resolve(meta));
    const { name, version } = JSON.parse(metaData);
    const nameRegex = new RegExp(`appName = .*`);
    contents = contents.replace(nameRegex, `appName = "${name}";`);
    const versionRegex = new RegExp(`appVersion = .*`);
    contents = contents.replace(versionRegex, `appVersion = "${version}";`);
  }

  await fs.writeFile(`${src}`, contents);
}
/**
 * prepare
 *
 * Function that reads the package.json file and updates the appName and appVersion variables in the src/workload-tests.mjs file.
 *
 */
async function prepare() {
  await updateVariables({
    meta: "./package.json",
    src: `src/workload-test.mjs`,
  })

  console.log("Done with preparation!");
}

prepare();
