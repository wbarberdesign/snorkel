
export const imageBlock =  {
    name: 'imageBlock',
    type: 'object',
    title: 'Image Block',
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
        name: 'caption',
        type: 'string',
        title: 'Caption',
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