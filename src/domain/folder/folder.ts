import { DirEnt } from '@/core';
import { DirFile } from '../file';
import { mkdirSync } from 'fs';

export class Folder extends DirEnt {
  parent?: Folder | null;

  contains: {[p: string]: Folder | DirFile} = {};

  constructor(name: string, parent?: Folder | null, content?: {[p: string]: any}) {
    const path = parent ? `${parent?.path}/${name}` : name;
    super(name, path);
    this.parent = parent;

    console.log(`Folder ${this.path} created`);

    if (content) this.fill(content);
  }

  fill(content: {[p: string]: any}) {
    const entries = Object.entries(content);
    
    entries.forEach(([key, value]) => {
      if (value && typeof value === 'object') this.contains[key] = new Folder(key, this, value);
      else this.contains[key] = new DirFile(key, this);
    });
  }

  generate(target: string): void {
    console.log(`Folder generating ${target}/${this.path}`);

    mkdirSync(`${target}/${this.path}`);

    const entries = Object.entries(this.contains);
  
    entries.forEach(([key, ent]) => ent.generate(target));
  }
}
