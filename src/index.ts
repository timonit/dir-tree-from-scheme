import { Tree } from './app';
import schemeData from './test.local.json';

const tree = Tree.create('./asd', schemeData);
// tree.clearable = true;
tree.generateFiles();
