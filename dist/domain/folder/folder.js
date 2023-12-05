"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Folder = void 0;
const core_1 = require("@/core");
const file_1 = require("../file");
const fs_1 = require("fs");
/**
 * Виртуальная папка
 */
class Folder extends core_1.DirEnt {
    constructor(name, parent, content) {
        const path = parent ? `${parent?.path}/${name}` : name;
        super(name, path);
        /**
         * Содержимое папки
         */
        this.contains = {};
        this.parent = parent;
        console.log(`Folder ${this.path} created`);
        if (content)
            this.fill(content);
    }
    /**
     * Залить виртуальными файлами и папками
     */
    fill(content) {
        const entries = Object.entries(content);
        entries.forEach(([key, value]) => {
            if (value && typeof value === 'object')
                this.contains[key] = new Folder(key, this, value);
            else
                this.contains[key] = new file_1.DirFile(key, this, value);
        });
    }
    generate(target) {
        console.log(`Folder generating ${target}/${this.path}`);
        (0, fs_1.mkdirSync)(`${target}/${this.path}`);
        const entries = Object.entries(this.contains);
        entries.forEach(([key, ent]) => ent.generate(target));
    }
}
exports.Folder = Folder;
