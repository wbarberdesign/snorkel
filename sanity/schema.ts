import { SchemaTypeDefinition } from 'sanity'

import { galleryBlock } from './components/galleryBlocks';
import { imageBlock } from './components/ImageBlocks';
import { tourDetails } from './components/tourDetails';

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [
        {
            title: "Site Settings",
            name: "siteSettings",
            type: "document",
            fields: [
              {
                title: "Contact Email",
                name: "email",
                type: "string"
              },
              {
                title: "Contact Phone",
                name: "phone",
                type: "string"
              },
              {
                title: "Instagram",
                name: "instagram",
                type: "url"
              },
              {
                title: "Facebook",
                name: "facebook",
                type: "url"
              },
              {
                title: "Meta Title",
                name: "metaTitle",
                type: "string"
              },
              {
                title: "Meta Description",
                name: "metaDescription",
                type: "string"
              },
            ],
          },
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
                title: "Button Url",
                name: "buttonUrl",
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
                title: "Secondary Button Url",
                name: "secondaryButtonUrl",
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
                {
                    title: 'Section three image',
                    name: 'sThreeImage',
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
                {
                    title: "Locations",
                    name: "locations",
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
                        {
                            title: 'Section three image',
                            name: 'sThreeImage',
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
                    ]
                },
                {
                    title: "Blog",
                    name: "blog",
                    type: "document",
                    fields: [
                        {
                            title: "Publication Date",
                            name: "publicationDate",
                            type: "datetime", // Use the datetime type for date input
                            options: {
                                dateFormat: "YYYY-MM-DD", // Customize the date format if needed
                                timeFormat: "HH:mm", // Optionally include time format
                                timeStep: 15, // Optionally set the time step
                            },
                        },
                        {
                            title: "Title",
                            name: "title",
                            type: "string",
                        },
                        {
                            title: 'Slug',
                            name: 'slug',
                            type: 'slug',
                            options: {
                              source: 'title',
                              maxLength: 200, // will be ignored if slugify is set
                              slugify: input => input
                                                   .toLowerCase()
                                                   .replace(/\s+/g, '-')
                                                   .slice(0, 200)
                            }
                          },
                          {
                            title: 'Content', 
                            name: 'content',
                            type: 'array', 
                            of: [{type: 'block'}]
                        },
                        {
                            name: 'galleryBlocks',
                            type: 'array',
                            title: 'Gallery Blocks',
                            of: [{ type: 'galleryBlock' }],
                        }
                    ],
                },       
          imageBlock, tourDetails, galleryBlock
      ],
}
