import { resolve, dirname } from 'path'

import fileLoader from './file-loader'

export default async (dirname: string) => fileLoader(
    resolve(
        dirname,
        './routes',
        '*.+(ts|js)'
    )
)