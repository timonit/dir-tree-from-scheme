import { Folder, DirFile } from '@/domain';
import { mkdirSync, existsSync, rmSync } from 'fs';
import { Scheme } from '../core';
import { TreeConfig } from './types';

type ParseReturn = {[p: string]: Folder | DirFile};

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
  contains: ParseReturn = {};

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
    const entries = Object.entries(scheme);
  
    entries.forEach(([key, value]) => {
      if (value && typeof value === 'object') result[key] = new Folder(key, null, value);
      else result[key] = new DirFile(key, null, value);
    });
  
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
