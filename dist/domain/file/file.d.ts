import { DirEnt } from '@/core';
import { Folder } from '../folder/folder';
/**
 * Виртуальный объект файл
 */
export declare class DirFile extends DirEnt {
    /**
     * Папка
     */
    folder?: Folder | null;
    /**
     * Данные файла
     */
    data?: string | number | boolean | null;
    constructor(name: string, folder?: Folder | null, data?: string | number | boolean | null);
    generate(target: string): void;
}
