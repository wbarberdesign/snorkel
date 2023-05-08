import { SchemaTypeDefinition } from 'sanity'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [
        {
          title: "Page",
          name: "page",
          type: "document",
          fields: [
            {
              title: "Title",
              name: "title",
              type: "string"
            },
            {
                title: 'Poster',
                name: 'poster',
                type: 'image',
                options: {
                  hotspot: true // <-- Defaults to false
                },
                fields: [
                  {
                    name: 'caption',
                    type: 'string',
                    title: 'Caption',
                  },
                  {
                    name: 'attribution',
                    type: 'string',
                    title: 'Attribution',
                  }
                ]
              }
          ]
        }  
      ]
}
