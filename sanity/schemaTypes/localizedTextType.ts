import { defineField, defineType } from "sanity";

export const localizedTextType = defineType({
  name: "localizedText",
  title: "Localized text",
  type: "object",
  fields: [
    defineField({
      name: "ru",
      title: "RU",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "en",
      title: "EN",
      type: "text",
      rows: 4,
    }),
  ],
  preview: {
    select: {
      ru: "ru",
      en: "en",
    },
    prepare({ ru, en }) {
      return {
        title: ru || en || "Empty localized text",
        subtitle: [ru ? "RU" : null, en ? "EN" : null]
          .filter(Boolean)
          .join(" · "),
      };
    },
  },
});
