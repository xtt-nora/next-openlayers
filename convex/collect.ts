import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("collect").collect();
  },
});
export const getById = query({
  args: {
    id: v.id("collect"),
  },
  handler: async (ctx, args) => {
    const data = await ctx.db.get(args.id);
    if (data === null) return;
    return data;
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
export const addCollectData = mutation({
  args: {
    collectId: v.id("collect"),
    name: v.string(),
    point: v.optional(v.array(v.number())),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { collectId, name, point } = args;
    const allCollect = await ctx.db.query("collect").collect();
    const collectById = allCollect.find((item) => String(item._id) === String(collectId));
    const maxOrder = Math.max(0, ...(collectById?.collectList ?? []).map((item) => item.order));
    const findName = collectById?.collectList?.find((item) => String(item.name) === String(name));
    let newcollect = { name, point, order: maxOrder + 1 };
    if (!collectById) {
      throw new Error("CollectData not found");
    }

    newcollect = findName
      ? { name: name + maxOrder, point, order: maxOrder + 1 }
      : { name, point, order: maxOrder + 1 };
    const updatedCollectGroup = [...(collectById.collectList || []), newcollect];

    const updatedCollectList = await ctx.db.patch(collectId, {
      collectList: updatedCollectGroup,
    });
    return updatedCollectList;
  },
});
