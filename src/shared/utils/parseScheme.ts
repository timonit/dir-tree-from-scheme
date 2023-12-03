function parseScheme(scheme: any): ParseReturn {
  const result: ParseReturn = {};
  const entries = Object.entries(scheme);

  entries.forEach(([key, value]) => {
    console.log(key, value);
    if (value && typeof value === 'object') result[key] = new Folder(key);
    else result[key] = new DirFile(key);
  })

  return result;
}
