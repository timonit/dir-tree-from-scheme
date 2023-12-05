import { Scheme } from './types';
import { VirtualFolder } from './folder';
import { VirtualFile } from '../file';
import { mkdirSync } from 'fs';
jest.mock('fs');

describe('Folder', () => {
  const foldername = 'test';
  const path = "test";

  test('folder has name and path', () => {
    const folder = new VirtualFolder(foldername, null);

    expect(folder.name).toEqual(foldername);
    expect(folder.path).toEqual(path);
  })

  test('set parent and assemble path', () => {
    const parent = new VirtualFolder('parent', null);
    const folder = new VirtualFolder(foldername, parent);

    expect(folder.parent === parent).toBeTruthy();
    expect(folder.path).toEqual(`${parent.path}/${folder.name}`);
  })

  test('folder fill content file and folder by scheme', () => {
    const scheme: Scheme = {
      'test.file': true,
      dir: {},
      arrdir: [],
    };
    const folder = new VirtualFolder(foldername, null, scheme);

    expect(folder.contains['test.file']).toBeInstanceOf(VirtualFile);
    expect(folder.contains['dir']).toBeInstanceOf(VirtualFolder);
    expect(folder.contains['arrdir']).toBeInstanceOf(VirtualFolder);
  });

  test('Generate folder with mkdirSync method', () => {
    const folder = new VirtualFolder(foldername);
    const target = './target';

    folder.generate(target);

    expect(mkdirSync).toHaveBeenCalledWith(`${target}/${folder.path}`);
  });
})
