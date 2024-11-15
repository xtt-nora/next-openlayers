This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# 旅行路线规划项目

该项目使用 **Next.js**、**Convex**、**Clerk** 和 **OpenLayers** 开发，旨在为用户提供一个便捷的旅行路线规划工具，用户可以创建、保存并查看自己的旅行路线，同时享受流畅的地图交互体验。

## Getting Started

First, run the development server:

```bash
npm run dev && npx convex dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## 技术栈

- **Next.js**：用于构建 React 应用，支持 SSR 和静态站点生成。
- **Convex**：用于简化与数据库的交互，提供后端服务。
- **Clerk**：用于用户身份验证和授权。
- **OpenLayers**：提供强大的地图功能和地理空间数据可视化支持。

## 功能

- 用户可以创建并保存自己的旅行路线。
- 支持动态显示地图及路线规划。
- 提供用户认证功能，通过 Clerk 管理用户登录。
- 使用 Convex 实现后端存储，方便用户保存和加载旅行路线。

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
