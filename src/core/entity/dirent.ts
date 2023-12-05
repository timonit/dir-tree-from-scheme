export type Generator = (path: string) => void;

/**
 * Базовая сущность
 */
export abstract class DirEnt {
  /**
   * Название объекта
   */
  name: string;

  /**
   * Путь к объекту
   */
  path: string;

  constructor(name: string, path: string) {
    this.name = name;
    this.path = path;
  }

  /**
   * Генерация объекта в файловой системе
   */
  abstract generate(target: string): void;
}
