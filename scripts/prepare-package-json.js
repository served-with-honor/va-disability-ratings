import fs from 'fs';
import path from 'path';

const buildDir = './build';

function createPackage(dir, contents) {
  const packageJsonFile = path.join(buildDir, dir, '/package.json');
  if (!fs.existsSync(packageJsonFile)) {
    fs.writeFile(
      packageJsonFile,
      new Uint8Array(Buffer.from(contents)),
      (error) => {
        if (error) throw error;
      },
    );
  }
}

function createEsmModulePackageJson() {
  fs.readdir(buildDir, (error, directories) => {
    if (error) throw error;

    directories.forEach((directory) => {
      if (directory === 'esm') createPackage(directory, '{"type": "module"}');
      if (directory === 'cjs') createPackage(directory, '{}');
    });
  });
}

createEsmModulePackageJson();
