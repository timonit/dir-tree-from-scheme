import { Folder, DirFile } from '@/domain';
import { mkdirSync, existsSync } from 'fs';
import { Scheme } from './scheme';

type ParseReturn = {[p: string]: Folder | DirFile};

export class Tree {
  target = '.';

  contains: ParseReturn = {};

  private constructor() {}

  static create(target: string, scheme: {[p: string]: any}): Tree {
    const tree = new Tree();
    tree.target = target;
    tree.fill(scheme);

    return tree;
  }

  fill(scheme: Scheme): ParseReturn {
    const result: ParseReturn = {};
    const entries = Object.entries(scheme);
  
    entries.forEach(([key, value]) => {
      if (value && typeof value === 'object') result[key] = new Folder(key, null, value);
      else result[key] = new DirFile(key, null, value);
    });
  
    this.contains = result;

    return result;
  }

  generateFiles() {
    const entries = Object.entries(this.contains);

    const isTargetExist = existsSync(`${this.target}/`);
    if (!isTargetExist) mkdirSync(this.target);
  
    entries.forEach(([key, ent]) => ent.generate(this.target));
  }
}
