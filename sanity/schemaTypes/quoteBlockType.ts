import { defineField, defineType } from "sanity";

export const quoteBlockType = defineType({
  name: "quoteBlock",
  title: "Quote block",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "localizedText",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      titleEn: "title.en",
      titleRu: "title.ru",
      textEn: "text.en",
      textRu: "text.ru",
    },
    prepare({ titleEn, titleRu, textEn, textRu }) {
      const title = titleEn || titleRu || "Quote block";
      const subtitle = textEn || textRu || "Quote block";
      return {
        title,
        subtitle,
      };
    },
  },
});