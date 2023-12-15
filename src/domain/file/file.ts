import { VirtualEntity } from '@/core';
import { appendFileSync } from 'fs';
import { FS_ERRS } from '../types';

/**
 * Виртуальный объект файл
 */
export class VirtualFile extends VirtualEntity {
  /**
   * Папка
   */
  folder?: VirtualEntity | null;

  /**
   * Данные файла
   */
  data?: string | number | boolean | null;

  constructor(name: string, folder?: VirtualEntity | null, data?: string | number | boolean | null) {
    const path = folder ? `${folder.path}/${name}` : name;
    super(name, path);
    this.folder = folder;
    this.data = data;
  }

  generate(target: string): void {
    let data: string;

    switch(typeof this.data) {
      case 'boolean': {
        data = '';
        break;
      }
      case 'function': {
        console.error('"function" handler not implemented');
      }
      default: {
        if (this.data === null || this.data === undefined) data = '';
        else data = String(this.data);
      }
    }

    try {
      appendFileSync(
        `${target}/${this.path}`,
        data,
        {
          flag: 'ax',
        },
      );
    } catch(err: any) {
      if (err.code !== FS_ERRS.EEXIST) throw err;
    }
  }
}
