interface MapLayoutProps {
  children: React.ReactNode;
}

const MapItemLayout = ({ children }: MapLayoutProps) => {
  return <div className="block space-y-6 pb-16 pt-32 p-12">{children}</div>;
};

export default MapItemLayout;
