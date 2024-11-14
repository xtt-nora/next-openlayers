import { v } from "convex/values";
import { action, mutation, query } from "./_generated/server";

export const get = query({
  args: {
    mapId: v.id("map"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("routeplan")
      .withIndex("by_mapId", (q) => q.eq("mapId", args.mapId))
      .collect();
  },
});
export const addPlans = mutation({
  args: {
    mapId: v.id("map"),
    routeName: v.string(),
    isEdit: v.boolean(),
    isSelected: v.boolean(),
    routerColor: v.string(),
    routerGroup: v.array(
      // 接收 routerGroup 数组作为参数
      v.object({
        name: v.string(),
        point: v.optional(v.array(v.number())), // 可选的 point 数据
        order: v.number(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const { mapId, routeName, isEdit, isSelected, routerColor, routerGroup } = args;
    const routeplanId = await ctx.db.insert("routeplan", {
      mapId,
      routeName,
      isEdit,
      isSelected,
      routerColor,
      routerGroup,
    });
    return routeplanId;
  },
});
export const addSubRoute = mutation({
  args: {
    routeplanId: v.id("routeplan"),
    name: v.string(),
    point: v.optional(v.array(v.number())),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    const { routeplanId, name, point, order } = args;
    const allRouteplans = await ctx.db.query("routeplan").collect();
    const routeplan = allRouteplans.find((item) => String(item._id) === String(routeplanId));
    if (!routeplan) {
      throw new Error("Routeplan not found");
    }

    const newSubRoute = { name, point, order };
    const updatedRouterGroup = [...(routeplan.routerGroup || []), newSubRoute];

    const updatedRouteplan = await ctx.db.patch(routeplanId, {
      routerGroup: updatedRouterGroup,
    });
    return updatedRouteplan;
  },
});

export const editName = mutation({
  args: {
    routeplanId: v.id("routeplan"),
    routeName: v.string(),
  },
  handler: async (ctx, args) => {
    const { routeplanId, routeName } = args;
    const updatedRouteName = await ctx.db.patch(routeplanId, {
      routeName: routeName,
    });
    return updatedRouteName;
  },
});
