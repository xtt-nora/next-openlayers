import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import Image from "next/image";

interface ConvexImageProps {
  storageId?: string;
  title: string;
}

export const ConvexImage = ({ storageId, title }: ConvexImageProps) => {
  const imageUrl = useQuery(api.mapMedia.getImageUrl, { storageId: storageId as Id<"_storage"> });
  return (
    <div className="aspect-video relativew-full w-full h-full relative">
      <Image
        src={
          imageUrl ||
          "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/2560px-Placeholder_view_vector.svg.png"
        }
        alt={title}
        fill
        className="object-cover"
      />
    </div>
  );
};
