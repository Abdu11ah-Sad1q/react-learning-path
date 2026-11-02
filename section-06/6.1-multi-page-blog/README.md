# My Blog

A small blog built with React, Tailwind CSS and react-router-dom.
Data comes from https://dummyjson.com (posts, users, comments).

## Run it

npm install
npm run dev

## Pages

- `/` - latest 5 posts
- `/posts` - all posts
- `/posts/5` - one post with its comments
- `/authors/3` - one author with their posts
- anything else - "Page not found"

## My approach

**Pages:** I used react-router-dom. A `Layout` component holds the
header and footer once, and the current page is shown inside it using
`<Outlet />`. So every page, including the "not found" ones, has the
same header and footer. Dynamic pages use `:id` in the route and
`useParams()` to read the number.

**Shared data:** All API calls go through one function, `getJson`, in
`src/api.js`. It returns `null` when the item does not exist. Each page
fetches what it needs with `useEffect` and keeps it in `useState`.
`PostCard` is a shared component used on Home, All Posts and Author
pages.

**Not found:** If `getJson` returns `null` for a post or author, the page
shows "Post not found" or "Author not found" inside the normal layout.

**Refresh:** The Vite dev server sends all addresses to `index.html`, so
refreshing `/posts/5` still works. For Vercel I added `vercel.json`.
