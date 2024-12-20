import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("map").collect();
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    badge: v.string(),
    img: v.string(),
    bgImg: v.id("_storage"),
    isLocked: v.boolean(),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    console.log(ctx, "ctx");
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    const user = await ctx.db
      .query("user")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();
    console.log(user, "user");
    if (user === null) {
      return;
    }
    const mapId = await ctx.db.insert("map", {
      title: args.title,
      badge: args.badge,
      img: identity.pictureUrl || "https://default-image-url.com/default.png",
      bgImg: args.bgImg,
      description: args.description,
      userId: user._id!,
      isLocked: args.isLocked,
    });

    return mapId;
  },
});
export const del = mutation({
  args: {
    mapId: v.id("map"),
  },
  handler: async (ctx, args) => {
    const { mapId } = args;
    await ctx.db.delete(mapId);
  },
});

export const updateLocked = mutation({
  args: {
    mapId: v.id("map"),
  },
  handler: async (ctx, args) => {
    const { mapId } = args;
    const data = await ctx.db.get(mapId);
    const isLocked = data?.isLocked;
    await ctx.db.patch(mapId, {
      isLocked: !isLocked,
    });
  },
});
