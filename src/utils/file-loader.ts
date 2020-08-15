import glob from 'fast-glob'

export default async (path: string, deep?: number | undefined) => {
    path = path.replace(/\\/g, '/')

    
    const files = await glob(path, {
        absolute: false,
        deep: deep
    })

    const importedFiles = []

  for (const file of files) {
    const imported = await import(file)

    importedFiles.push(imported.default)
  }

  return importedFiles
}