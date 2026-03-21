import { defineField, defineType } from "sanity";

export const projectLinkType = defineType({
  name: "projectLink",
  title: "Project link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "href",
      title: "URL",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      labelEn: "label.en",
      labelRu: "label.ru",
      subtitle: "href",
    },
    prepare({ labelEn, labelRu, subtitle }) {
      return {
        title: labelEn || labelRu || "Link",
        subtitle,
      };
    },
  },
});