import { defineField, defineType } from "sanity";

export const localizedStringType = defineType({
  name: "localizedString",
  title: "Localized string",
  type: "object",
  fields: [
    defineField({
      name: "ru",
      title: "RU",
      type: "string",
    }),
    defineField({
      name: "en",
      title: "EN",
      type: "string",
    }),
  ],
  preview: {
    select: {
      ru: "ru",
      en: "en",
    },
    prepare({ ru, en }) {
      return {
        title: ru || en || "Empty localized string",
        subtitle: [ru ? "RU" : null, en ? "EN" : null]
          .filter(Boolean)
          .join(" · "),
      };
    },
  },
});
