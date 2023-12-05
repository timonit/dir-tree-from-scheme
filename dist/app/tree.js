"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tree = exports.defaultConfig = void 0;
const domain_1 = require("@/domain");
const fs_1 = require("fs");
exports.defaultConfig = {
    clearable: false,
};
/**
 * Дерево файлов и папок
 */
class Tree {
    set clearable(value) {
        this.config.clearable = value;
    }
    constructor() {
        /**
         * Целевая локация
         */
        this.target = '.';
        this.config = exports.defaultConfig;
        /**
         * Виртуальное содержимое дерева
         */
        this.contains = {};
    }
    /**
     * Создать дерево в целевой локации по схеме
     */
    static create(target, scheme) {
        const tree = new Tree();
        tree.target = target;
        tree.fill(scheme);
        return tree;
    }
    /**
     * Залить дерево виртуальными файлами и папками
     */
    fill(scheme) {
        const result = {};
        const entries = Object.entries(scheme);
        entries.forEach(([key, value]) => {
            if (value && typeof value === 'object')
                result[key] = new domain_1.Folder(key, null, value);
            else
                result[key] = new domain_1.DirFile(key, null, value);
        });
        this.contains = result;
        return result;
    }
    /**
     * Сгенерировать файлы и папки в целевой локации
     */
    generateFiles() {
        const isTargetExist = (0, fs_1.existsSync)(`${this.target}/`);
        if (!isTargetExist)
            (0, fs_1.mkdirSync)(this.target);
        if (isTargetExist && this.config.clearable) {
            (0, fs_1.rmSync)(this.target, { recursive: true });
            (0, fs_1.mkdirSync)(this.target);
        }
        const entries = Object.entries(this.contains);
        entries.forEach(([key, ent]) => ent.generate(this.target));
    }
}
exports.Tree = Tree;
