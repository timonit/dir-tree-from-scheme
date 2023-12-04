import { DirEnt } from '@/core';
import { Folder } from '../folder/folder';
import { appendFileSync } from 'fs';

export class DirFile extends DirEnt {
  folder?: Folder | null;
  data?: string | number | boolean | null;

  constructor(name: string, folder?: Folder | null, data?: string | number | boolean | null) {
    const path = folder ? `${folder.path}/${name}` : name;
    super(name, path);
    this.folder = folder;
    this.data = data;

    console.log(`File ${this.path} created`);
  }

  generate(target: string): void {
    console.log(`File generating ${target}/${this.path}`);
    let data: string;

    switch(typeof this.data) {
      case 'boolean': {
        data = '';
        break;
      }
      case 'function': {
        console.log('function handler not implemented');
      }
      default: {
        if (this.data === null || this.data === undefined) data = '';
        else data = String(this.data);
      }
    }

    appendFileSync(`${target}/${this.path}`, data);
  }
}
