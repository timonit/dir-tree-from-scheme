import { Tree } from './app';
import schemeData from './test.json';

// const schemeData = {
//   timon: {
//     "index.ts": true,
//     "a": null,
//     src: {
//       'index.js': null,
//     }
//   },
//   demo: {},
// }


console.log('==== scheme ====\n');
console.log(schemeData);
console.log('\n==== scheme end ====\n\n');

const tree = Tree.create('./asd', schemeData);
tree.generateFiles();
