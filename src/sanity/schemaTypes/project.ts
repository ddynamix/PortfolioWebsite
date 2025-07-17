import {defineArrayMember, defineField, defineType} from 'sanity'

export const project = defineType({
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'summary',
            title: 'Summary',
            type: 'string',
        }),
        defineField({
            name: 'award',
            title: 'Award',
            type: 'string',
        }),
        defineField({
            name: 'splashImage',
            title: 'Splash Image',
            type: 'image',
        }),
        defineField({
            name: 'wonAward',
            title: 'Won Award?',
            type: 'boolean',
        }),
        defineField({
            name: 'projectLogo',
            title: 'Project Logo',
            type: 'image',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'blockContent',
        }),
        defineField({
            name: 'context',
            title: 'Context',
            type: 'string',
        }),
        defineField({
            name: 'link',
            title: 'Link',
            type: 'url',
        }),
        defineField({
            name: 'github',
            title: 'GitHub',
            type: 'url',
        }),
        defineField({
            name: 'gallery',
            title: 'Gallery',
            type: 'array',
            of: [{type: 'image'}],
        }),
        defineField({
            name: 'collaborators',
            title: 'Collaborators',
            type: 'string',
        })
    ]
})