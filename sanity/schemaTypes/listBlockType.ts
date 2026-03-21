import { defineField, defineType } from "sanity";

export const listBlockType = defineType({
  name: "listBlock",
  title: "List block",
  type: "object",
  fields: [
    defineField({
      name: "items",
      title: "Items",
      type: "object",
      fields: [
        {
          name: "ru",
          title: "RU",
          type: "array",
          of: [{ type: "string" }],
        },
        {
          name: "en",
          title: "EN",
          type: "array",
          of: [{ type: "string" }],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      itemsEn: "items.en",
      itemsRu: "items.ru",
    },
    prepare({ itemsEn, itemsRu }) {
      const items = itemsEn || itemsRu || [];
      return {
        title: items?.[0] || "Untitled list",
        subtitle: `List block · ${items?.length || 0} item(s)`,
      };
    },
  },
});