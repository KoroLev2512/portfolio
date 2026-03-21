import { defineField, defineType } from "sanity";

export const blockTitleType = defineType({
  name: "blockTitle",
  title: "Block title",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Text",
      type: "localizedString",
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
        title: titleEn || titleRu || "Untitled block title",
        subtitle: "Block title",
      };
    },
  },
});