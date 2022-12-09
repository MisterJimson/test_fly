import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { flowRouter } from "./flow";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  flow: flowRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
