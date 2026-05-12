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

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "* Internal title",
      type: "string",
      initialValue: "Site settings",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "personName",
      title: "* Person name",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "personRole",
      title: "* Person role",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "personPhoto",
      title: "* Person photo",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "seoTitle",
      title: "* Default SEO title",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "seoDescription",
      title: "* Default SEO description",
      type: "localizedText",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "contactsTitle",
      title: "* Contacts CTA title",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "contactsButtons",
      title: "Contacts CTA buttons",
      type: "array",
      of: [{ type: "homepageContactLink" }],
      initialValue: [
        {
          _type: "homepageContactLink",
          label: { ru: "icestorm2512@gmail.com", en: "icestorm2512@gmail.com" },
          href: { ru: "mailto:icestorm2512@gmail.com", en: "mailto:icestorm2512@gmail.com" },
          variant: "primary",
        },
        {
          _type: "homepageContactLink",
          label: { ru: "t.me/korolev_2512", en: "t.me/korolev_2512" },
          href: { ru: "https://t.me/korolev_2512", en: "https://t.me/korolev_2512" },
          variant: "secondary",
        },
      ],
    }),

    defineField({
      name: "showFooterAside",
      title: "Show footer right block",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "footerAsideText",
      title: "Footer right text",
      type: "localizedString",
      hidden: ({ parent }) => parent?.showFooterAside === false,
    }),
    defineField({
      name: "footerAsideLinkLabel",
      title: "Footer right link label",
      type: "localizedString",
      hidden: ({ parent }) => parent?.showFooterAside === false,
    }),
    defineField({
      name: "footerAsideLinkHref",
      title: "Footer right link target",
      type: "string",
      validation: (Rule) => Rule.custom(validateHref),
      hidden: ({ parent }) => parent?.showFooterAside === false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      personNameRu: "personName.ru",
      personNameEn: "personName.en",
      media: "personPhoto",
    },
    prepare({ title, personNameRu, personNameEn, media }) {
      return {
        title: title || "Site settings",
        subtitle: personNameRu || personNameEn || "",
        media,
      };
    },
  },
});