import { VirtualEntity } from '@/core';
import { VirtualFile } from '@/domain';
import { mkdirSync } from 'fs';
import { FolderContains, Scheme } from './types';

/**
 * Виртуальная папка
 */
export class VirtualFolder extends VirtualEntity {
  /**
   * Родительская папка
   */
  parent?: VirtualFolder | null;

  /**
   * Содержимое папки
   */
  contains: FolderContains = {};

  constructor(name: string, parent?: VirtualFolder | null, content?: Scheme) {
    const path = parent ? `${parent?.path}/${name}` : name;
    super(name, path);
    this.parent = parent;

    if (content) this.fill(content);
  }

  /**
   * Залить виртуальными файлами и папками
   */
  fill(content: Scheme) {
    if (Array.isArray(content)) return content.forEach(val => this.contains[val] = new VirtualFile(val, this));

    const entries = Object.entries(content);
    return entries.forEach(([key, value]) => {
      if (value && typeof value === 'object') this.contains[key] = new VirtualFolder(key, this, value);
      else this.contains[key] = new VirtualFile(key, this, value);
    });
  }

  generate(target: string): void {
    mkdirSync(`${target}/${this.path}`);

    const entries = Object.entries(this.contains);
  
    entries.forEach(([key, ent]) => ent.generate(target));
  }
}
