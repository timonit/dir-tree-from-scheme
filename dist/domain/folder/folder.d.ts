import { DirEnt } from '@/core';
import { DirFile } from '../file';
import { Scheme } from '@/core';
/**
 * Виртуальная папка
 */
export declare class Folder extends DirEnt {
    /**
     * Родительская папка
     */
    parent?: Folder | null;
    /**
     * Содержимое папки
     */
    contains: {
        [p: string]: Folder | DirFile;
    };
    constructor(name: string, parent?: Folder | null, content?: Scheme);
    /**
     * Залить виртуальными файлами и папками
     */
    fill(content: Scheme): void;
    generate(target: string): void;
}
