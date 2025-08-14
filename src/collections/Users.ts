import type {CollectionConfig} from 'payload'

export const Users: CollectionConfig = {
    slug: 'users',
    admin: {
        useAsTitle: 'email',
    },
    auth: true,
    fields: [
        {
            name: 'localeManager',
            type: 'select',
            defaultValue: ["sl", "en", "hr"],
            required: true,
            hasMany: true,
            options: [
                {value: "sl", label: "Slovenian"},
                {value: "en", label: "English"},
                {value: "hr", label: "Croatian"}
            ]
        },
    ],
}
