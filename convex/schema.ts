import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";
import { title } from "process";

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
  routeplan: defineTable({
    mapId: v.id("map"),
    routeName: v.string(),
    isEdit: v.boolean(),
    isSelected: v.boolean(),
    routerColor: v.string(),
    routerGroup: v.array(
      v.object({
        name: v.string(),
        point: v.optional(v.array(v.number())), // 点信息，可选
        order: v.number(),
      })
    ),
  }).index("by_mapId", ["mapId"]),

  mapMedia: defineTable({
    storageId: v.id("_storage"),
    format: v.string(),
    userId: v.id("user"),
  })
    .index("by_userId", ["userId"])
    .index("by_storageId", ["storageId"]),
  collect: defineTable({
    userId: v.id("user"),
    collectName: v.string(),
    badge: v.string(),
    collectList: v.optional(
      v.array(
        v.object({
          name: v.string(),
          point: v.optional(v.array(v.number())),
        })
      )
    ),
  }).index("by_userId", ["userId"]),
});
