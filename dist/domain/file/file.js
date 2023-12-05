"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirFile = void 0;
const core_1 = require("@/core");
const fs_1 = require("fs");
/**
 * Виртуальный объект файл
 */
class DirFile extends core_1.DirEnt {
    constructor(name, folder, data) {
        const path = folder ? `${folder.path}/${name}` : name;
        super(name, path);
        this.folder = folder;
        this.data = data;
        console.log(`File ${this.path} created`);
    }
    generate(target) {
        console.log(`File generating ${target}/${this.path}`);
        let data;
        switch (typeof this.data) {
            case 'boolean': {
                data = '';
                break;
            }
            case 'function': {
                console.log('function handler not implemented');
            }
            default: {
                if (this.data === null || this.data === undefined)
                    data = '';
                else
                    data = String(this.data);
            }
        }
        (0, fs_1.appendFileSync)(`${target}/${this.path}`, data);
    }
}
exports.DirFile = DirFile;
