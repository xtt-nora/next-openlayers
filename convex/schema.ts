import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";

export default defineSchema({
  user: defineTable({
    fullName: v.string(),
    username: v.string(),
    title: v.string(),
    about: v.string(),
    portfolioUrls: v.optional(v.array(v.string())),
    profileImageUrl: v.optional(v.string()),
    favoriteSellerIds: v.optional(v.array(v.string())),
    tokenIdentifier: v.string(),
    customTag: v.optional(v.string()),
  })
    .index("by_token", ["tokenIdentifier"])
    .index("by_username", ["username"]),
  map: defineTable({
    userId: v.id("user"),
    title: v.string(),
    description: v.string(),
    badge: v.string(),
    img: v.string(),
    bgImg: v.string(),
    isLocked: v.boolean(),
  })
    .index("by_userId", ["userId"])
    .index("by_title", ["title"])
    .searchIndex("search_title", {
      searchField: "title",
    }),
});
