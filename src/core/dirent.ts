export type Generator = (path: string) => void;

export abstract class DirEnt {
  name: string;

  path: string;

  constructor(name: string, path: string) {
    this.name = name;
    this.path = path;
  }

  abstract generate(target: string): void;
}
