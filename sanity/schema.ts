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
        } ,
        {
            title: "Home",
            name: "home",
            type: "document",
            fields: [
              {
                title: "Title",
                name: "title",
                type: "string"
              },
              {
                name: 'imagesGallery',
                title: 'Images gallery',
                type: 'array',
                of: [{ type: 'image' }]
               },
               {
                title: 'Content', 
                name: 'content',
                type: 'array', 
                of: [{type: 'block'}]
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
              },
              {
                title: "Featured Page Title",
                name: "pageTitle",
                type: "string"
              },
              {
                title: "Button Text",
                name: "buttonText",
                type: "string"
              }
            ]
          }  
      ]
}
