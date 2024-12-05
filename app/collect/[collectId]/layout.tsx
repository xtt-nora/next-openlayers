interface MapLayoutProps {
  children: React.ReactNode;
}

const CollectLayout = ({ children }: MapLayoutProps) => {
  return <div className="h-full">{children}</div>;
};

export default CollectLayout;
