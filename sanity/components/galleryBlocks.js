
export const galleryBlock =  {
    name: 'galleryBlock',
    type: 'object',
    title: 'Gallery Block',
    fields: [
      {
        name: 'image',
        type: 'image',
        title: 'Image',
        options: {
          hotspot: true, // Enables image hotspot functionality
        },
      },
      {
        title: 'Type',
        name: 'type',
        type: 'string',
        options: {
          list: [
            { title: 'Fin fish', value: 'fin-fish' },
            { title: 'Reef life', value: 'reef-life' },
            { title: 'Kelp forests', value: 'kelp-forests' },
            { title: 'The New Zealand Sealion', value: 'the-new-zealand-sealion' },
          ],
        },
      },
    ],
    preview: {
      select: {
        imageUrl: 'image.asset.url',
        caption: 'caption',
      },
      prepare({ imageUrl, caption }) {
        return {
          title: 'Image Block',
          subtitle: caption || 'No caption',
          media: <img src={imageUrl} alt={caption || 'No caption'} />,
        };
      },
    },
  };