import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const sendImage = mutation({
  args: { storageId: v.id("_storage"), format: v.string(), userId: v.id("user") },
  handler: async (ctx, args) => {
    const mediaId = await ctx.db.insert("mapMedia", {
      storageId: args.storageId,
      format: "image",
      userId: args.userId,
    });
    return mediaId;
  },
});
export const getImageUrl = query({
  args: { storageId: v.optional(v.id("_storage")) },
  handler: async (ctx, args) => {
    if (!args.storageId) return null;
    return await ctx.storage.getUrl(args.storageId);
  },
});
