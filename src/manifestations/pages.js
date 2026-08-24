import { manifest as auth } from "@/features/auth";
import { manifest as shared } from "@/features/shared";
import { manifest as superAdmin } from "@/features/super-admin";
import { manifest as schools } from "@/features/schools";
import { manifest as schoolAdmins } from "@/features/school-admins";
import { manifest as subscriptions } from "@/features/subscriptions";

const manifests = [
  auth,
  shared,
  superAdmin,
  schools,
  schoolAdmins,
  subscriptions,
];

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function createMatcher(path) {
  const pattern = path
    .split("/")
    .map((segment) =>
      segment.startsWith(":") ? "[^/]+" : escapeRegex(segment),
    )
    .join("/");

  return new RegExp(`^${pattern}$`);
}

export const ALL_PAGES = Object.freeze(
  manifests.flat().map((page) => ({
    ...page,
    matcher: createMatcher(page.path),
  })),
);

const EXACT_PAGE_MAP = new Map(ALL_PAGES.map((page) => [page.path, page]));

export function getPageByPath(pathname) {
  const exact = EXACT_PAGE_MAP.get(pathname);

  if (exact) {
    return exact;
  }

  return ALL_PAGES.find((page) => page.matcher.test(pathname)) ?? null;
}
