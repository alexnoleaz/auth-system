import fs from 'fs';
import path from 'path';

export class ContentDirectoryFinder {
  static calculateContentRootDirectory(presentationDir: string) {
    let currentDirectory = path.resolve(__dirname);

    while (!this.directoryContains(currentDirectory, 'package.json')) {
      const parentDirectory = path.resolve(currentDirectory, '..');
      if (parentDirectory === currentDirectory) throw new Error('Could not find content root directory!');

      currentDirectory = parentDirectory;
    }

    const entryProjectDirectory = path.join(currentDirectory, 'src', presentationDir);
    if (fs.existsSync(entryProjectDirectory)) return entryProjectDirectory;

    throw new Error('Could not find root folder of the presentation project!');
  }

  private static directoryContains(directory: string, filename: string) {
    return fs.readdirSync(directory).some((file) => path.basename(file) === filename);
  }
}
