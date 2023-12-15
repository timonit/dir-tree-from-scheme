import { VirtualFile } from './file';
import { appendFileSync } from 'fs';
jest.mock('fs');

describe('file', () => {
  const filename = 'test.file';
  const path = "./timon/test.file";
  const data = "file data";
  const folder = { path: './timon', contains: {}, fill(){}, generate(){}, name: '' };

  test('file name, data and path', () => {
    const file = new VirtualFile(filename, folder, data);
    expect(file.name).toEqual(filename);
    expect(file.path).toEqual(path);
    expect(file.data).toEqual(data);
  });

  test('Set root path, without folder', () => {
    const file = new VirtualFile(filename, folder, data);
    expect(file.path).toEqual(path);
  });

  test('Generate file with appendFileSync method', () => {
    const file = new VirtualFile(filename, null, data);
    const target = './target';

    file.generate(target);

    expect(appendFileSync).toHaveBeenCalledWith(`${target}/${filename}`, data);
  });
});
