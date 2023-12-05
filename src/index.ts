import { Tree } from './app';
import schemeData from './test.local.json';

console.log('==== scheme ====\n');
console.log(schemeData);
console.log('\n==== scheme end ====\n\n');

const tree = Tree.create('./asd', schemeData);
tree.clearable = true;
tree.generateFiles();
