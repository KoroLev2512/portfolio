import { defineField, defineType } from "sanity";

const educationTypes = [
  { title: "Incomplete higher education", value: "incomplete-higher" },
  { title: "Higher education", value: "higher" },
  { title: "Professional development", value: "professional-development" },
  { title: "Course", value: "course" },
  { title: "Secondary vocational education", value: "secondary-vocational" },
  { title: "Custom", value: "custom" },
];

function getEducationTypeLabel(
  type?: string,
  customTypeLabel?: string
) {
  if (type === "custom") {
    return customTypeLabel || "Custom";
  }

  return (
    educationTypes.find((item) => item.value === type)?.title ?? ""
  );
}

export const educationItemType = defineType({
  name: "educationItem",
  title: "Education item",
  type: "object",
  fields: [
    defineField({
      name: "institution",
      title: "* Institution",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "program",
      title: "* Program",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "educationType",
      title: "Education type",
      type: "string",
      options: {
        list: educationTypes,
      },
    }),
    defineField({
      name: "customEducationType",
      title: "Custom education type",
      description:
        'Visible only when "Custom" is selected above',
      type: "localizedString",
      hidden: ({ parent }) => parent?.educationType !== "custom",
    }),
    defineField({
      name: "period",
      title: "Period",
      type: "localizedString",
    }),
  ],
  preview: {
    select: {
      institutionEn: "institution.en",
      institutionRu: "institution.ru",
      programEn: "program.en",
      programRu: "program.ru",
      educationType: "educationType",
      customTypeEn: "customEducationType.en",
      customTypeRu: "customEducationType.ru",
      periodEn: "period.en",
      periodRu: "period.ru",
    },
    prepare({
      institutionEn,
      institutionRu,
      programEn,
      programRu,
      educationType,
      customTypeEn,
      customTypeRu,
      periodEn,
      periodRu,
    }) {
      const institution = institutionEn || institutionRu;
      const program = programEn || programRu;
      const period = periodEn || periodRu;
      const customType = customTypeEn || customTypeRu;

      const typeLabel = getEducationTypeLabel(
        educationType,
        customType
      );

      return {
        title: institution || "Untitled institution",
        subtitle: [program, typeLabel, period]
          .filter(Boolean)
          .join(" · "),
      };
    },
  },
});