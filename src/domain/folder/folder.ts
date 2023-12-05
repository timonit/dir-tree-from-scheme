import { DirEnt } from '@/core';
import { DirFile } from '../file';
import { mkdirSync } from 'fs';
import { Scheme } from '@/core';

/**
 * Виртуальная папка
 */
export class Folder extends DirEnt {
  /**
   * Родительская папка
   */
  parent?: Folder | null;

  /**
   * Содержимое папки
   */
  contains: {[p: string]: Folder | DirFile} = {};

  constructor(name: string, parent?: Folder | null, content?: Scheme) {
    const path = parent ? `${parent?.path}/${name}` : name;
    super(name, path);
    this.parent = parent;

    console.log(`Folder ${this.path} created`);

    if (content) this.fill(content);
  }

  /**
   * Залить виртуальными файлами и папками
   */
  fill(content: Scheme) {
    const entries = Object.entries(content);
    
    entries.forEach(([key, value]) => {
      if (value && typeof value === 'object') this.contains[key] = new Folder(key, this, value);
      else this.contains[key] = new DirFile(key, this, value);
    });
  }

  generate(target: string): void {
    console.log(`Folder generating ${target}/${this.path}`);

    mkdirSync(`${target}/${this.path}`);

    const entries = Object.entries(this.contains);
  
    entries.forEach(([key, ent]) => ent.generate(target));
  }
}
