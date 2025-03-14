/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as RegisterImport } from './routes/register'
import { Route as OpretImport } from './routes/opret'
import { Route as LoginImport } from './routes/login'
import { Route as IndexImport } from './routes/index'
import { Route as ProductsIndexImport } from './routes/products/index'
import { Route as MeIndexImport } from './routes/me/index'
import { Route as ProductsViewSlugImport } from './routes/products/view/$slug'
import { Route as ProductsCategoryCategorySlugImport } from './routes/products/category/$categorySlug'

// Create/Update Routes

const RegisterRoute = RegisterImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => rootRoute,
} as any)

const OpretRoute = OpretImport.update({
  id: '/opret',
  path: '/opret',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const ProductsIndexRoute = ProductsIndexImport.update({
  id: '/products/',
  path: '/products/',
  getParentRoute: () => rootRoute,
} as any)

const MeIndexRoute = MeIndexImport.update({
  id: '/me/',
  path: '/me/',
  getParentRoute: () => rootRoute,
} as any)

const ProductsViewSlugRoute = ProductsViewSlugImport.update({
  id: '/products/view/$slug',
  path: '/products/view/$slug',
  getParentRoute: () => rootRoute,
} as any)

const ProductsCategoryCategorySlugRoute =
  ProductsCategoryCategorySlugImport.update({
    id: '/products/category/$categorySlug',
    path: '/products/category/$categorySlug',
    getParentRoute: () => rootRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/opret': {
      id: '/opret'
      path: '/opret'
      fullPath: '/opret'
      preLoaderRoute: typeof OpretImport
      parentRoute: typeof rootRoute
    }
    '/register': {
      id: '/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof RegisterImport
      parentRoute: typeof rootRoute
    }
    '/me/': {
      id: '/me/'
      path: '/me'
      fullPath: '/me'
      preLoaderRoute: typeof MeIndexImport
      parentRoute: typeof rootRoute
    }
    '/products/': {
      id: '/products/'
      path: '/products'
      fullPath: '/products'
      preLoaderRoute: typeof ProductsIndexImport
      parentRoute: typeof rootRoute
    }
    '/products/category/$categorySlug': {
      id: '/products/category/$categorySlug'
      path: '/products/category/$categorySlug'
      fullPath: '/products/category/$categorySlug'
      preLoaderRoute: typeof ProductsCategoryCategorySlugImport
      parentRoute: typeof rootRoute
    }
    '/products/view/$slug': {
      id: '/products/view/$slug'
      path: '/products/view/$slug'
      fullPath: '/products/view/$slug'
      preLoaderRoute: typeof ProductsViewSlugImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/login': typeof LoginRoute
  '/opret': typeof OpretRoute
  '/register': typeof RegisterRoute
  '/me': typeof MeIndexRoute
  '/products': typeof ProductsIndexRoute
  '/products/category/$categorySlug': typeof ProductsCategoryCategorySlugRoute
  '/products/view/$slug': typeof ProductsViewSlugRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/login': typeof LoginRoute
  '/opret': typeof OpretRoute
  '/register': typeof RegisterRoute
  '/me': typeof MeIndexRoute
  '/products': typeof ProductsIndexRoute
  '/products/category/$categorySlug': typeof ProductsCategoryCategorySlugRoute
  '/products/view/$slug': typeof ProductsViewSlugRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/login': typeof LoginRoute
  '/opret': typeof OpretRoute
  '/register': typeof RegisterRoute
  '/me/': typeof MeIndexRoute
  '/products/': typeof ProductsIndexRoute
  '/products/category/$categorySlug': typeof ProductsCategoryCategorySlugRoute
  '/products/view/$slug': typeof ProductsViewSlugRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/login'
    | '/opret'
    | '/register'
    | '/me'
    | '/products'
    | '/products/category/$categorySlug'
    | '/products/view/$slug'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/login'
    | '/opret'
    | '/register'
    | '/me'
    | '/products'
    | '/products/category/$categorySlug'
    | '/products/view/$slug'
  id:
    | '__root__'
    | '/'
    | '/login'
    | '/opret'
    | '/register'
    | '/me/'
    | '/products/'
    | '/products/category/$categorySlug'
    | '/products/view/$slug'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  LoginRoute: typeof LoginRoute
  OpretRoute: typeof OpretRoute
  RegisterRoute: typeof RegisterRoute
  MeIndexRoute: typeof MeIndexRoute
  ProductsIndexRoute: typeof ProductsIndexRoute
  ProductsCategoryCategorySlugRoute: typeof ProductsCategoryCategorySlugRoute
  ProductsViewSlugRoute: typeof ProductsViewSlugRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  LoginRoute: LoginRoute,
  OpretRoute: OpretRoute,
  RegisterRoute: RegisterRoute,
  MeIndexRoute: MeIndexRoute,
  ProductsIndexRoute: ProductsIndexRoute,
  ProductsCategoryCategorySlugRoute: ProductsCategoryCategorySlugRoute,
  ProductsViewSlugRoute: ProductsViewSlugRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/login",
        "/opret",
        "/register",
        "/me/",
        "/products/",
        "/products/category/$categorySlug",
        "/products/view/$slug"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/opret": {
      "filePath": "opret.tsx"
    },
    "/register": {
      "filePath": "register.tsx"
    },
    "/me/": {
      "filePath": "me/index.tsx"
    },
    "/products/": {
      "filePath": "products/index.tsx"
    },
    "/products/category/$categorySlug": {
      "filePath": "products/category/$categorySlug.tsx"
    },
    "/products/view/$slug": {
      "filePath": "products/view/$slug.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
