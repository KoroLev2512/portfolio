import { defineArrayMember, defineField, defineType } from "sanity";

const middleSectionOptions = [
  { title: "Skills", value: "skills" },
  { title: "Projects", value: "projects" },
  { title: "Work Experience", value: "workExperience" },
  { title: "Education", value: "education" },
];

function validateMiddleSections(value: unknown) {
  if (!Array.isArray(value)) {
    return "Section order is required";
  }

  const values = value
    .filter((item): item is string => typeof item === "string")
    .filter(Boolean);

  const required = [
    "skills",
    "projects",
    "workExperience",
    "education",
  ];

  const missing = required.filter((item) => !values.includes(item));
  if (missing.length > 0) {
    return `Missing sections: ${missing.join(", ")}`;
  }

  const duplicates = values.filter(
    (item, index) => values.indexOf(item) !== index
  );
  if (duplicates.length > 0) {
    return `Duplicate sections are not allowed: ${duplicates.join(", ")}`;
  }

  return true;
}

export const homepageType = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "* Internal title",
      type: "string",
      initialValue: "Homepage",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "heroAbout",
      title: "* About text",
      type: "localizedText",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "heroContacts",
      title: "Hero contacts",
      type: "array",
      of: [{ type: "homepageContactLink" }],
      initialValue: [
        {
          _type: "homepageContactLink",
          label: { ru: "icestorm2512@gmail.com", en: "icestorm2512@gmail.com" },
          href: "mailto:icestorm2512@gmail.com",
          variant: "secondary",
        },
        {
          _type: "homepageContactLink",
          label: { ru: "t.me/korolev_2512", en: "t.me/korolev_2512" },
          href: "https://t.me/korolev_2512",
          variant: "secondary",
        },
      ],
    }),

    defineField({
      name: "skillGroups",
      title: "Skill groups",
      description:
        "Groups with empty skill lists will not be rendered on the website.",
      type: "array",
      of: [{ type: "skillGroup" }],
    }),

    defineField({
      name: "workExperienceItems",
      title: "Work experience items",
      type: "array",
      of: [{ type: "workExperience" }],
    }),

    defineField({
      name: "educationItems",
      title: "Education items",
      type: "array",
      of: [{ type: "educationItem" }],
    }),


    defineField({
      name: "middleSectionsOrder",
      title: "* Middle sections order",
      description:
        "Hero is always first and Contacts is always last. Drag these sections to change only the middle order.",
      type: "array",
      of: [
        defineArrayMember({
          type: "string",
          options: {
            list: middleSectionOptions,
          },
        }),
      ],
      validation: (Rule) => Rule.required().custom(validateMiddleSections),
      initialValue: [
        "skills",
        "projects",
        "workExperience",
        "education",
      ],
    }),

    defineField({
      name: "homepageProjects",
      title: "Projects on homepage",
      description:
        "Add project documents here to control which projects are visible on the homepage and in what order.",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "project" }],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});