import { Scheme } from '@/core';
import { Folder } from './folder';
import { DirFile } from '../file';
import { mkdirSync } from 'fs';
jest.mock('fs');

describe('Folder', () => {
  const foldername = 'test';
  const path = "test";

  test('folder has name and path', () => {
    const folder = new Folder(foldername, null);

    expect(folder.name).toEqual(foldername);
    expect(folder.path).toEqual(path);
  })

  test('set parent and assemble path', () => {
    const parent = new Folder('parent', null);
    const folder = new Folder(foldername, parent);

    expect(folder.parent === parent).toBeTruthy();
    expect(folder.path).toEqual(`${parent.path}/${folder.name}`);
  })

  test('folder fill content file and folder by scheme', () => {
    const scheme: Scheme = {
      'test.file': true,
      testdir: {},
    };
    const folder = new Folder(foldername, null, scheme);

    expect(folder.contains['test.file']).toBeInstanceOf(DirFile);
    expect(folder.contains['testdir']).toBeInstanceOf(Folder);
  });

  test('Generate folder with mkdirSync method', () => {
    const folder = new Folder(foldername);
    const target = './target';

    folder.generate(target);

    expect(mkdirSync).toHaveBeenCalledWith(`${target}/${folder.path}`);
  });
})
