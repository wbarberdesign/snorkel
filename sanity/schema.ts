import { SchemaTypeDefinition } from 'sanity'

import { imageBlock } from './components/ImageBlocks';
import { tourDetails } from './components/tourDetails';
import { galleryBlock } from './components/galleryBlocks';

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [
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
              },
              {
                title: "Secondary Title",
                name: "secondaryTitle",
                type: "string"
              },
              {
                title: 'Secondary Content', 
                name: 'secondaryContent',
                type: 'array', 
                of: [{type: 'block'}]
              },
              {
                title: "Secondary Button Text",
                name: "secondaryButtonText",
                type: "string"
              },
              {
                name: 'imageBlocks',
                type: 'array',
                title: 'Image Blocks',
                of: [{ type: 'imageBlock' }],
              },
            ],
          },
            {
            title: "Tours",
            name: "tours",
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
                },
                {
                    title: "Section one title",
                    name: "sOneTitle",
                    type: "string"
                },
                {
                    title: 'Section one content', 
                    name: 'content',
                    type: 'array', 
                    of: [{type: 'block'}]
                },
                {
                    name: 'tourDetails',
                    type: 'array',
                    title: 'Tour Details',
                    of: [{ type: 'tourDetails' }],
                  },
                {
                    title: "Section two title",
                    name: "sTwoTitle",
                    type: "string"
                },
                {
                    title: 'Section two content', 
                    name: 'sTwoContent',
                    type: 'array', 
                    of: [{type: 'block'}]
                },
                {
                    title: 'Section two image',
                    name: 'sTwoImage',
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
                    title: "Section three title",
                    name: "sThreeTitle",
                    type: "string"
                },
                {
                    title: 'Section three content', 
                    name: 'sThreeContent',
                    type: 'array', 
                    of: [{type: 'block'}]
                },
            ]
            },
            {
                title: "Gallery",
                name: "gallery",
                type: "document",
                fields: [
                    {
                        title: "Title",
                        name: "title",
                        type: "string"
                    },
                    {
                        name: 'galleryBlocks',
                        type: 'array',
                        title: 'Gallery Blocks',
                        of: [{ type: 'galleryBlock' }],
                    }
                ]
                },
          imageBlock, tourDetails, galleryBlock
      ],
}
