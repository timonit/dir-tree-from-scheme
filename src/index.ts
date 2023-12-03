import { Tree } from './app';
import { DirFile, Folder } from './domain';

const schemeData = {
  timon: {
    "index.ts": true,
    "f": undefined,
    "a": null,
    src: {
      'index.js': null,
      dist: {
        'index.html': null,
      }
    }
  },
  demo: {},
}

console.log('==== scheme ====\n');
console.log(schemeData);
console.log('\n==== scheme end ====\n\n');

const tree = Tree.create('./asd', schemeData);
tree.generateFiles();
