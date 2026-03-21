import { defineField, defineType } from "sanity";

function validateHref(value: unknown) {
  if (typeof value !== "string" || value.trim().length === 0) {
    return "Link is required";
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

export const homepageContactLinkType = defineType({
  name: "homepageContactLink",
  title: "Homepage contact link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "* Label",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "href",
      title: "* Link target",
      description:
        'Supports https://, http://, mailto:, tel:, "/" and "#"',
      type: "string",
      validation: (Rule) => Rule.required().custom(validateHref),
    }),
    defineField({
      name: "variant",
      title: "Button variant",
      description:
        "Used in the Contacts section. Hero contacts can ignore this field.",
      type: "string",
      options: {
        list: [
          { title: "Primary", value: "primary" },
          { title: "Secondary", value: "secondary" },
        ],
        layout: "radio",
      },
      initialValue: "secondary",
    }),
  ],
  preview: {
    select: {
      title: "label.en",
      subtitle: "href",
    },
  },
});