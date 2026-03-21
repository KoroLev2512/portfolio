import { defineField, defineType } from "sanity";

export const imageBlockType = defineType({
  name: "imageBlock",
  title: "Image block",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Alt text",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "localizedString",
    }),
  ],
  preview: {
    select: {
      captionEn: "caption.en",
      captionRu: "caption.ru",
      media: "image",
    },
    prepare({ captionEn, captionRu, media }) {
      return {
        title: captionEn || captionRu || "Image block",
        subtitle: "Image block",
        media,
      };
    },
  },
});