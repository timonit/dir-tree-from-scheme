import { DirEnt } from '@/core';
import { Folder } from '../folder/folder';
import { appendFileSync } from 'fs';

export class DirFile extends DirEnt {
  folder?: Folder;

  constructor(name: string, folder?: Folder) {
    const path = folder ? `${folder.path}/${name}` : name;
    super(name, path);
    this.folder = folder;

    console.log(`File ${this.path} created`);
  }

  generate(target: string): void {
    console.log(`File generating ${target}/${this.path}`);
    appendFileSync(`${target}/${this.path}`, '');
  }
}
