import { createBrowserRouter } from "react-router"

export const router = createBrowserRouter([
  {
    path: "/",
    Component: () => <div>hi bitchezzz</div>,
    children: [
      {
        path: "shows/:showId",
        Component: () => <div>show</div>,
      },
    ],
  },
])
