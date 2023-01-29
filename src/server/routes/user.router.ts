import {
  createUserOutputSchema,
  createUserSchema,
} from "./../../schema/user.schema";
import { createRouter } from "../createRouter";
import { PrismaClientKnownRequestError } from "../../../generated/client/runtime";
import { TRPCError } from "@trpc/server";

export const userRouter = createRouter().mutation("register-user", {
  input: createUserSchema,
  async resolve({ ctx, input }) {
    const { email, name } = input;

    try {
      const user = ctx.prisma.user.create({
        data: {
          email,
          name,
        },
      });

      return user;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          throw new TRPCError({
            code: "CONFLICT",
            message: "User already exists",
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong.",
        });
      }
    }
  },
});

export type UserRouter = typeof userRouter;
