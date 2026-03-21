import { defineField, defineType } from "sanity";

export const textBlockType = defineType({
  name: "textBlock",
  title: "Text block",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Text",
      type: "localizedText",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      titleEn: "text.en",
      titleRu: "text.ru",
    },
    prepare({ titleEn, titleRu }) {
      return {
        title: titleEn || titleRu || "Untitled text block",
        subtitle: "Text block",
      };
    },
  },
});