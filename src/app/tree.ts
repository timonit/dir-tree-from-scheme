import { VirtualFolder, VirtualFile, FolderContains, Scheme } from '@/domain';
import { mkdirSync, existsSync, rmSync } from 'fs';
import { TreeConfig } from './types';

type ParseReturn = {[p: string]: VirtualFolder | VirtualFile};

export const defaultConfig: TreeConfig = {
  clearable: false,
};

/**
 * Дерево файлов и папок
 */
export class Tree {
  /**
   * Целевая локация
   */
  target = '.';

  config: TreeConfig = defaultConfig;

  set clearable(value: boolean) {
    this.config.clearable = value;
  }

  /**
   * Виртуальное содержимое дерева
   */
  contains: FolderContains = {};

  private constructor() {}

  /**
   * Создать дерево в целевой локации по схеме
   */
  static create(target: string, scheme: Scheme): Tree {
    const tree = new Tree();
    tree.target = target;
    tree.fill(scheme);

    return tree;
  }

  /**
   * Залить дерево виртуальными файлами и папками
   */
  fill(scheme: Scheme): ParseReturn {
    const result: ParseReturn = {};
    
    if (Array.isArray(scheme)) scheme.forEach(val => result[val] = new VirtualFile(val, null));
    else {
      const entries = Object.entries(scheme);  
      entries.forEach(([key, value]) => {
        if (value && typeof value === 'object') result[key] = new VirtualFolder(key, null, value);
        else result[key] = new VirtualFile(key, null, value);
      });
    }
  
    this.contains = result;

    return result;
  }

  /**
   * Сгенерировать файлы и папки в целевой локации
   */
  generateFiles() {
    const isTargetExist = existsSync(`${this.target}/`);
    
    if (!isTargetExist) mkdirSync(this.target);

    if (isTargetExist && this.config.clearable) {
      rmSync(this.target, {recursive: true});
      mkdirSync(this.target);
    }
  
    const entries = Object.entries(this.contains);

    entries.forEach(([key, ent]) => ent.generate(this.target));
  }
}
