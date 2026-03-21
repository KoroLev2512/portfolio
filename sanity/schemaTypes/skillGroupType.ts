import { defineField, defineType } from "sanity";

const skillGroupKinds = [
  { title: "Hard skills", value: "hard-skills" },
  { title: "Soft skills", value: "soft-skills" },
  { title: "Languages", value: "languages" },
  { title: "Tools / Stack", value: "tools-stack" },
  { title: "Custom", value: "custom" },
];

function getKindLabel(kind?: string, customTitle?: string) {
  if (kind === "custom") {
    return customTitle || "Custom";
  }

  return (
    skillGroupKinds.find((item) => item.value === kind)?.title ?? "Custom"
  );
}

export const skillGroupType = defineType({
  name: "skillGroup",
  title: "Skill group",
  type: "object",
  fields: [
    defineField({
      name: "kind",
      title: "* Group type",
      type: "string",
      options: {
        list: skillGroupKinds,
      },
      initialValue: "custom",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Custom group title",
      description:
        'Visible only when "Custom" is selected above',
      type: "localizedString",
      hidden: ({ parent }) => parent?.kind !== "custom",
    }),
    defineField({
      name: "showTitle",
      title: "Show group title",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "items",
      title: "Skills",
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
  ],
  preview: {
    select: {
      kind: "kind",
      titleEn: "title.en",
      titleRu: "title.ru",
      showTitle: "showTitle",
      itemsEn: "items.en",
      itemsRu: "items.ru",
    },
    prepare({ kind, titleEn, titleRu, showTitle, itemsEn, itemsRu }) {
      const customTitle = titleEn || titleRu;
      const resolvedTitle = getKindLabel(kind, customTitle);
      const items = itemsEn || itemsRu || [];

      return {
        title: resolvedTitle || "Untitled skill group",
        subtitle: `${showTitle ? "Title visible" : "Title hidden"} · ${
          items.length || 0
        } skill(s)`,
      };
    },
  },
});