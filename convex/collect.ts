import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("collect").collect();
  },
});

export const create = mutation({
  args: {
    collectName: v.string(),
    badge: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    const user = await ctx.db
      .query("user")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();
    if (user === null) {
      return;
    }
    const collectId = await ctx.db.insert("collect", {
      userId: user._id!,
      collectName: args.collectName,
      badge: args.badge,
    });
    return collectId;
  },
});
