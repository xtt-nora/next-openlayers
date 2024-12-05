interface MapLayoutProps {
  children: React.ReactNode;
}

const CollectItemLayout = ({ children }: MapLayoutProps) => {
  return <div className="h-full block space-y-6  w-full">{children}</div>;
};

export default CollectItemLayout;
