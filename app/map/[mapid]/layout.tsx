interface MapLayoutProps {
  children: React.ReactNode;
}

const MapLayout = ({ children }: MapLayoutProps) => {
  return <main className="h-full  px-0 2xl:px-56 overflow-hidden">{children}</main>;
};

export default MapLayout;
