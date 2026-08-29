import { ALL_PAGES } from "./pages";
import { GROUPS } from "../constants/group";

export function getStandalonePages() {
  return ALL_PAGES.filter(
    ({ sidebar, group }) => !sidebar && group === GROUPS.SHARED,
  );
}

export const STANDALONE_PAGES = Object.freeze(getStandalonePages());
