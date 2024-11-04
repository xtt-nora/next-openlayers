interface MapLayoutProps {
  children: React.ReactNode;
}

const MapLayout = ({ children }: MapLayoutProps) => {
  return <div className="h-full">{children}</div>;
};

export default MapLayout;
