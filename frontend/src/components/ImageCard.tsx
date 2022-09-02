// import { HiTrash } from "react-icons/hi";
import { Image } from "../lib/types";

interface ImageCardProps {
  className?: string;
  image: Image;
  deleteImageClicked: ({ id }: { id: string }) => void;
  index: number;
}

export default function ImageCard({
  className,
  image,
  deleteImageClicked,
  index,
}: ImageCardProps) {
  const { id, signedUrl } = image;
  return (
    <div className={`mb-6 lg:mb-10 `}>
      <img src={signedUrl} alt="gallery-item" className="cursor-pointer" />
    </div>
  );
}
