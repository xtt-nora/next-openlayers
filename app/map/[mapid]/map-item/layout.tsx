interface MapLayoutProps {
  children: React.ReactNode;
}

const MapItemLayout = ({ children }: MapLayoutProps) => {
  return <div className="h-full block space-y-6 p-12">{children}</div>;
};

export default MapItemLayout;
