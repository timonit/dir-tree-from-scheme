import { VirtualFile, VirtualFolder } from '..';

export type Scheme = { [p: string]: string | number | boolean | null | Scheme } | string[]

export type FolderContains = {[p: string]: VirtualFolder | VirtualFile};
