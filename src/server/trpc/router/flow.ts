import { z } from "zod";
import { runFlow } from "../../../playrunner";

import { router, publicProcedure } from "../trpc";

export const flowRouter = router({
  run: publicProcedure
    .input(z.object({ flow: z.string() }))
    .mutation(async ({ input }) => {
      await runFlow(input.flow)
    }),
});
