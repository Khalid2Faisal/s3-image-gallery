import { useEffect, useState } from "react";

import imageService from "../services/imageService";
import ImageCard from "../components/ImageCard";
import { Image } from "../lib/types";

function HomePage() {
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    async function getImages() {
      const images = await imageService.getImages();
      setImages(images);
    }
    getImages();
  }, []);

  const deleteImageClicked = async ({ id }: { id: string }) => {
    console.log(`deletePostClicked = (${id})`);
    await imageService.deleteImage(id);
    setImages(images.filter((image) => image.id !== id));
  };

  const postActions = {
    deleteImageClicked,
  };

  return (
    <div className="App">
      <div className="columns-1 sm:columns-2 xl:columns-3 2xl:px-40 2xl:mx-auto pt-10 xl:pt-14 gap-6">
        {images.map((image, i) => (
          <ImageCard key={i} image={image} {...postActions} index={i} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
