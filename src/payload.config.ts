// storage-adapter-import-placeholder
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import {Pages} from "@/collections/Pages";

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  localization:{
    locales:[
      {label: 'Slovenščina', code: 'sl'},
      {label: 'Angleščina', code: 'en'},
      {label: 'Hrvaščina', code: 'hr'},
    ],
    defaultLocale:"en",
    filterAvailableLocales: async ({req, locales}) => {
      const {user, locale: currentLocale} = req;
      if (!user) return locales;


      const userManagedLocales:any = user?.localeManager;

      return locales.filter((locale) => {
        // @ts-ignore
        return userManagedLocales?.includes(locale.code)
      })
    }
  },
  collections: [Pages,Users, Media],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
