import { defineField, defineType } from "sanity";

function validateHref(value: unknown) {
  if (value === undefined || value === null || value === "") {
    return true;
  }

  if (typeof value !== "string") {
    return "Link must be a string";
  }

  const normalized = value.trim();

  const isAllowed =
    normalized.startsWith("https://") ||
    normalized.startsWith("http://") ||
    normalized.startsWith("mailto:") ||
    normalized.startsWith("tel:") ||
    normalized.startsWith("/") ||
    normalized.startsWith("#");

  return isAllowed
    ? true
    : 'Use https://, http://, mailto:, tel:, "/" or "#"';
}

export const experimentType = defineType({
  name: "experiment",
  title: "Experiment",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      description: "For Studio list and image alt text (optional)",
      type: "localizedString",
    }),
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
      name: "href",
      title: "Link",
      description: "Page or external URL",
      type: "string",
      validation: (Rule) => Rule.required().custom(validateHref),
    }),
  ],
  preview: {
    select: {
      titleEn: "title.en",
      titleRu: "title.ru",
      media: "image",
      subtitle: "href",
    },
    prepare({ titleEn, titleRu, media, subtitle }) {
      return {
        title: titleEn || titleRu || "Experiment",
        subtitle,
        media,
      };
    },
  },
});
