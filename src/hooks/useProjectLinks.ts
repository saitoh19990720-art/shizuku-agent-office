import { useCallback } from "react";
import type { ProjectLink } from "../types";
import { useLocalStorage } from "./useLocalStorage";
import { makeId } from "../lib/ids";
import { nowISO } from "../lib/dates";

export type NewProjectLinkInput = Omit<
  ProjectLink,
  "id" | "createdAt" | "updatedAt"
>;

const KEY = "shizuku-office.links.v1";

export function useProjectLinks() {
  const [links, setLinks] = useLocalStorage<ProjectLink[]>(KEY, []);

  const add = useCallback(
    (input: NewProjectLinkInput) => {
      const ts = nowISO();
      const link: ProjectLink = {
        ...input,
        title: input.title.trim(),
        id: makeId(),
        createdAt: ts,
        updatedAt: ts,
      };
      setLinks((prev) => [link, ...prev]);
    },
    [setLinks],
  );

  const remove = useCallback(
    (id: string) => setLinks((prev) => prev.filter((l) => l.id !== id)),
    [setLinks],
  );

  return { links, add, remove };
}
