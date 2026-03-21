import { groq } from "next-sanity";

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    coverImage,
    shortDescription,
    heroDescription,
    client,
    domain,
    timeline,
    role,
    tags,
    "links": coalesce(links, [])[]{
      label,
      href
    },
    "sections": coalesce(sections, [])[]{
      title,
      "blocks": coalesce(blocks, [])[]{
        ...,
        _type == "imageBlock" => {
          ...,
          image
        }
      }
    }
  }
`;

export const projectMetadataBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0]{
    title,
    shortDescription
  }
`;

export const projectNavigationItemsQuery = groq`
  *[_type == "homepage"] | order(_updatedAt desc)[0]{
    "items": coalesce(homepageProjects[]->{ title, "slug": slug.current }, [])
  }.items
`;

export const projectsQuery = groq`
  *[_type == "homepage"] | order(_updatedAt desc)[0]{
    "items": coalesce(homepageProjects[]->{
      _id,
      title,
      "slug": slug.current,
      shortDescription,
      tags,
      coverImage
    }, [])
  }.items
`;

/**
 * Берём последний изменённый homepage (на случай дублей).
 * coalesce(x[]{ … }, []) — если поле null, проекция даёт null → подменяем на [].
 * Поле skillGroup.items — объект { ru: string[], en: string[] }, не массив: не оборачиваем в coalesce(..., []).
 */
export const homepageQuery = groq`
  *[_type == "homepage"] | order(_updatedAt desc)[0]{
    _id,
    title,
    "heroContacts": coalesce(heroContacts[]{ _key, label, href, variant }, []),
    heroAbout,
    "skillGroups": coalesce(skillGroups[]{ kind, title, showTitle, items }, []),
    "workExperienceItems": coalesce(workExperienceItems[]{ _key, company, position, period }, []),
    "educationItems": coalesce(educationItems[]{
      _key,
      institution,
      program,
      educationType,
      customEducationType,
      period
    }, []),
    "middleSectionsOrder": coalesce(middleSectionsOrder, []),
    "homepageProjects": coalesce(homepageProjects[]->{
      _id,
      title,
      "slug": slug.current,
      shortDescription,
      tags,
      coverImage
    }, [])
  }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    title,
    personName,
    personRole,
    personPhoto,
    seoTitle,
    seoDescription,
    contactsTitle,
    "contactsButtons": coalesce(contactsButtons, [])[]{
      label,
      href,
      variant
    },
    showFooterAside,
    footerAsideText,
    footerAsideLinkLabel,
    footerAsideLinkHref
  }
`;