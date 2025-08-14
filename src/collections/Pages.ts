import type {CollectionConfig} from 'payload'

export const Pages: CollectionConfig = {
    slug: 'pages',
    access: {
        read: ({req}) => {
            const {user, locale} = req

            return user?.localeManager.includes(locale as any)
        },
    },
    fields: [
        {
            name: 'alt',
            type: 'text',
            required: true,
        },
    ],
}
