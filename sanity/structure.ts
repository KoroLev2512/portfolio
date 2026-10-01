import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Content")
    .items([
      S.documentTypeListItem("siteSettings"),
      S.documentTypeListItem("homepage"),
      S.documentTypeListItem("project"),
      orderableDocumentListDeskItem({
        type: "experiment",
        title: "Experiments",
        S,
        context,
      }),
    ]);
