import { type SchemaTypeDefinition } from "sanity";
import { blockTitleType } from "./blockTitleType";
import { educationItemType } from "./educationItemType";
import { homepageContactLinkType } from "./homepageContactLinkType";
import { homepageType } from "./homepageType";
import { imageBlockType } from "./imageBlockType";
import { listBlockType } from "./listBlockType";
import { projectLinkType } from "./projectLinkType";
import { projectSectionType } from "./projectSectionType";
import { projectType } from "./projectType";
import { quoteBlockType } from "./quoteBlockType";
import { siteSettingsType } from "./siteSettingsType";
import { skillGroupType } from "./skillGroupType";
import { textBlockType } from "./textBlockType";
import { workExperienceType } from "./workExperienceType";
import { localizedStringType } from "./localizedStringType";
import { localizedTextType } from "./localizedTextType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    localizedStringType,
    localizedTextType,
    siteSettingsType,
    homepageType,
    projectType,
    projectLinkType,
    projectSectionType,
    homepageContactLinkType,
    skillGroupType,
    workExperienceType,
    educationItemType,
    blockTitleType,
    textBlockType,
    listBlockType,
    imageBlockType,
    quoteBlockType,
  ],
};