import { VirtualEntity } from '@/core';
import { appendFileSync } from 'fs';

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
        console.error('function handler not implemented');
      }
      default: {
        if (this.data === null || this.data === undefined) data = '';
        else data = String(this.data);
      }
    }

    appendFileSync(`${target}/${this.path}`, data);
  }
}
