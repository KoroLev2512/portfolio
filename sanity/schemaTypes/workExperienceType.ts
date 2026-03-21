import { defineField, defineType } from "sanity";

export const workExperienceType = defineType({
  name: "workExperience",
  title: "Work experience",
  type: "object",
  fields: [
    defineField({
      name: "company",
      title: "* Company",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "position",
      title: "* Position",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "period",
      title: "* Period",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      companyEn: "company.en",
      companyRu: "company.ru",
      positionEn: "position.en",
      positionRu: "position.ru",
      periodEn: "period.en",
      periodRu: "period.ru",
    },
    prepare({
      companyEn,
      companyRu,
      positionEn,
      positionRu,
      periodEn,
      periodRu,
    }) {
      const company = companyEn || companyRu;
      const position = positionEn || positionRu;
      const period = periodEn || periodRu;

      return {
        title: company || "Untitled company",
        subtitle: [position, period].filter(Boolean).join(" · "),
      };
    },
  },
});