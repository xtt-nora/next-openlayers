import { v } from "convex/values";
import { action, internalMutation, internalQuery, mutation, query } from "./_generated/server";
import { api, internal } from "./_generated/api";

export const store = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called storeUser without authentication present");
    }

    // Check if we've already stored this identity before.
    const user = await ctx.db
      .query("user")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();
    if (user !== null) {
      // If we've seen this identity before but the name has changed, patch the value.
      if (user.username !== identity.givenName) {
        await ctx.db.patch(user._id, { username: identity.givenName });
      }
      return user._id;
    }

    // If it's a new identity, create a new `User`.
    const userId = await ctx.db.insert("user", {
      fullName: identity.name!,
      tokenIdentifier: identity.tokenIdentifier,
      title: "",
      about: "",
      username: identity.givenName!,
      profileImageUrl: identity.pictureUrl,
    });

    return userId;
  },
});
