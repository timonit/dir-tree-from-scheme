"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const test_local_json_1 = __importDefault(require("./test.local.json"));
console.log('==== scheme ====\n');
console.log(test_local_json_1.default);
console.log('\n==== scheme end ====\n\n');
const tree = app_1.Tree.create('./asd', test_local_json_1.default);
tree.clearable = true;
tree.generateFiles();
