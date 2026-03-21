import { defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title.en",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Short description",
      description: "Used in the project card on the homepage",
      type: "localizedText",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroDescription",
      title: "Hero description",
      description: "Used in the hero section on the project page",
      type: "localizedText",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      description: "Used in the project card on the homepage",
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
    }),
    defineField({
      name: "client",
      title: "Client",
      type: "localizedString",
    }),
    defineField({
      name: "domain",
      title: "Domain",
      type: "localizedString",
    }),
    defineField({
      name: "timeline",
      title: "Timeline",
      type: "localizedString",
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "localizedString",
    }),
    defineField({
      name: "links",
      title: "Links",
      type: "array",
      of: [{ type: "projectLink" }],
    }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [{ type: "projectSection" }],
    }),
  ],
  preview: {
    select: {
      titleEn: "title.en",
      titleRu: "title.ru",
      subtitle: "slug.current",
      media: "coverImage",
    },
    prepare({ titleEn, titleRu, subtitle, media }) {
      return {
        title: titleEn || titleRu || "Untitled project",
        subtitle,
        media,
      };
    },
  },
});