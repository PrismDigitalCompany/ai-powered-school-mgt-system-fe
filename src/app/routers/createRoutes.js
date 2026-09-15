import { createElement } from "react";
import { Navigate } from "react-router-dom";

import { ROUTES } from "../../constants/route";
import { LAYOUTS } from "../../constants/layouts";
import { ALL_PAGES } from "../../manifestations/pages";

import RouterLoader from "./RouterLoader";
import ProtectedRoute from "./ProtectedRoute";
import PermissionGuard from "./PermissionGuard";
import ErrorPage from "../../errors/ErrorPage";
import NotFoundPage from "../../components/feedback/NotFoundPage";

import AuthLayout from "../../components/layouts/AuthLayout";
import SuperAdminLayout from "../../components/layouts/SuperAdminLayout";

const LAYOUT_COMPONENTS = Object.freeze({
  [LAYOUTS.AUTH]: AuthLayout,
  [LAYOUTS.SUPER_ADMIN]: SuperAdminLayout,
});

const PROTECTED_LAYOUTS = Object.freeze([LAYOUTS.SUPER_ADMIN]);

function lazyElement(Component) {
  return createElement(RouterLoader, { component: Component });
}

function buildRoutes(pages = []) {
  return pages.map(({ path, component, permission }) => {
    const element = lazyElement(component);
    return {
      path,
      element: permission
        ? createElement(PermissionGuard, { allowed: [permission] }, element)
        : element,
    };
  });
}

function groupPagesByLayout() {
  const groups = {};
  Object.values(LAYOUTS).forEach((layout) => {
    groups[layout] = [];
  });

  for (const page of ALL_PAGES) {
    if (!page.layout) {
      throw new Error(
        `Page "${page.path}" is missing the required "layout" property.`,
      );
    }
    if (!(page.layout in groups)) {
      throw new Error(
        `Page "${page.path}" uses unknown layout "${page.layout}".`,
      );
    }
    groups[page.layout].push(page);
  }

  return groups;
}

function buildLayoutGroup(layout, groupedPages) {
  return {
    element: createElement(LAYOUT_COMPONENTS[layout]),
    errorElement: createElement(ErrorPage),
    children: buildRoutes(groupedPages[layout]),
  };
}

export function createRoutes() {
  const groupedPages = groupPagesByLayout();

  const publicLayouts = Object.values(LAYOUTS).filter(
    (layout) => !PROTECTED_LAYOUTS.includes(layout),
  );

  return [
    {
      path: ROUTES.APP.PATH,
      element: createElement(Navigate, {
        to: ROUTES.AUTH.LOGIN,
        replace: true,
      }),
    },

    ...publicLayouts.map((layout) => buildLayoutGroup(layout, groupedPages)),

  
    {
      element: createElement(ProtectedRoute),
      children: PROTECTED_LAYOUTS.map((layout) =>
        buildLayoutGroup(layout, groupedPages),
      ),
    },

    {
      path: ROUTES.ERROR.NOT_FOUND,
      element: createElement(NotFoundPage),
    },
    {
      path: "*",
      element: createElement(Navigate, {
        to: ROUTES.ERROR.NOT_FOUND,
        replace: true,
      }),
    },
  ];
}
