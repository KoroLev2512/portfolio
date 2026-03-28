import { groq } from "next-sanity";

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current in $slugs][0]{
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
        _type,
        _key,
        _type == "blockTitle" => { "text": text },
        _type == "textBlock" => { "text": text },
        _type == "listBlock" => { "items": items },
        _type == "imageBlock" => { image, alt, caption },
        _type == "quoteBlock" => { "quoteHeading": title, text }
      }
    }
  }
`;

export const projectMetadataBySlugQuery = groq`
  *[_type == "project" && slug.current in $slugs][0]{
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

export const homepageProjectSlugsQuery = groq`
  *[_type == "homepage"] | order(_updatedAt desc)[0]{
    "slugs": coalesce(homepageProjects[]->slug.current, [])
  }.slugs
`;

export const allProjectSlugsQuery = groq`
  array::unique(coalesce(*[_type == "project" && defined(slug.current)].slug.current, []))
`;

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

export const experimentsQuery = groq`
  *[_type == "experiment"] | order(_createdAt desc){
    _id,
    title,
    image,
    href
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