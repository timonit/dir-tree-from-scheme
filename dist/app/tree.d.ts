import { Folder, DirFile } from '@/domain';
import { Scheme } from '../core';
import { TreeConfig } from './types';
type ParseReturn = {
    [p: string]: Folder | DirFile;
};
export declare const defaultConfig: TreeConfig;
/**
 * Дерево файлов и папок
 */
export declare class Tree {
    /**
     * Целевая локация
     */
    target: string;
    config: TreeConfig;
    set clearable(value: boolean);
    /**
     * Виртуальное содержимое дерева
     */
    contains: ParseReturn;
    private constructor();
    /**
     * Создать дерево в целевой локации по схеме
     */
    static create(target: string, scheme: Scheme): Tree;
    /**
     * Залить дерево виртуальными файлами и папками
     */
    fill(scheme: Scheme): ParseReturn;
    /**
     * Сгенерировать файлы и папки в целевой локации
     */
    generateFiles(): void;
}
export {};
