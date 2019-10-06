import * as fs from "fs";
import * as util from "util";
import * as path from "path";
import GenProtoInterfaces from "./genProtoInterfaces";

const readdir = util.promisify(fs.readdir);
const fsStat = util.promisify(fs.stat);
const mkdir = util.promisify(fs.mkdir);
const writeFile = util.promisify(fs.writeFile);
const exists = util.promisify(fs.exists);

const traversalDir = async (sourcePath: string, destPath: string) => {

    if (!(await exists(destPath))) {
        await mkdir(destPath, { recursive: true });
    }

    const files = await readdir(sourcePath);
    const tasks = files.map(async (fileName) => {
        const filePath = path.join(sourcePath, fileName);
        if (fileName.endsWith(".proto")) {
            const interfaces = GenProtoInterfaces(filePath);

            await writeFile(path.join(destPath, fileName.replace(/.proto$/, ".ts")), interfaces);
        } else {
            const stat = await fsStat(filePath);
            if (stat.isDirectory()) {

                await traversalDir(filePath, path.join(destPath, fileName));
            }
        }
    });

    await Promise.all(tasks);
};

const sourcePath = process.argv[2];
const destPath = process.argv[3];

if (!sourcePath) {
    console.error("Proto path can not be empty.");
    process.exit(1);
}

if (!destPath) {
    console.error("Ts path that generated ts file in can not be empty.");
    process.exit(1);
}

if (!fs.existsSync(sourcePath)) {
    console.error("Invalid proto path");
    process.exit(1);
}

traversalDir(sourcePath, destPath);
