import { HiTrash } from "react-icons/hi";
import { Image } from "../lib/types";

interface SingleImageProps {
  className?: string;
  image: Image;
  deleteImageClicked: ({ id }: { id: string }) => void;
}

export default function SingleImage({
  className,
  image,
  deleteImageClicked,
}: SingleImageProps) {
  const { id, signedUrl } = image;

  return (
    <div className={className + " outline-1"} style={{ width: 650 }}>
      <div className="flex flex-col space-y-2">
        <div className="flex flex-row items-end space-x-4 justify-center">
          <img
            className="rounded"
            alt={id}
            width="430"
            height="768"
            src={signedUrl}
          ></img>

          {/* Actions */}
          <div className="flex flex-col space-y-4">
            <div
              className="flex flex-col items-center"
              onClick={() => deleteImageClicked({ id })}
            >
              <HiTrash className="cursor-pointer hover:text-gray-900 active:text-gray-700 h-14 w-14 text-gray-700" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
