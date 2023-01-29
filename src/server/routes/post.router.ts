import { createRouter } from "../createRouter";

export const postRouter = createRouter().query("hello", {
  resolve: () => {
    return "Hello from trpc server";
  },
});

export type PostRouter = typeof postRouter;
