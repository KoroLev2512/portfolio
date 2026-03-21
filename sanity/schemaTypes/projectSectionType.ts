import { defineField, defineType } from "sanity";

export const projectSectionType = defineType({
  name: "projectSection",
  title: "Project section",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Section title",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "blocks",
      title: "Blocks",
      type: "array",
      of: [
        { type: "blockTitle" },
        { type: "textBlock" },
        { type: "listBlock" },
        { type: "imageBlock" },
        { type: "quoteBlock" },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      titleEn: "title.en",
      titleRu: "title.ru",
      blocks: "blocks",
    },
    prepare({ titleEn, titleRu, blocks }) {
      return {
        title: titleEn || titleRu || "Untitled section",
        subtitle: `Section · ${blocks?.length || 0} block(s)`,
      };
    },
  },
});