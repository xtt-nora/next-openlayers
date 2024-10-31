"use client";

import { Loading } from "@/components/auth/loading";
import { ClerkProvider, UserButton } from "@clerk/nextjs";
import { AuthLoading, Authenticated, Unauthenticated, ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { RedirectToSignIn, useAuth } from "@clerk/nextjs";
interface ConvexClientProviderProps {
  children: React.ReactNode;
}

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;
const convex = new ConvexReactClient(convexUrl);

export const ConvexClientProvider: React.FC<ConvexClientProviderProps> = ({ children }) => {
  return (
    <ClerkProvider dynamic>
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        <AuthWrapper>{children}</AuthWrapper>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};

// 创建一个 AuthWrapper 组件来处理授权逻辑
const AuthWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth();

  // 当 auth 数据还在加载时，显示 loading 状态
  if (!isLoaded) {
    return <Loading />;
  }

  // 确保在加载后处理重定向
  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  return <div className=" w-full h-full">{children}</div>; // 登录后渲染子组件
};
