import { useEffect, useState } from "react";
import axios from "axios";

import SingleImage from "../components/SingleImage";
import { Image } from "../lib/types";

function HomePage() {
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    async function getImages() {
      const result = await axios.get("http://localhost:8000/api/images");
      setImages(result.data);
    }
    getImages();
  }, []);

  const deleteImageClicked = async ({ id }: { id: string }) => {
    console.log(`deletePostClicked = (${id})`);
    await axios.delete("http://localhost:8000/api/images/" + id);
    setImages(images.filter((image) => image.id !== id));
  };

  const postActions = {
    deleteImageClicked,
  };

  return (
    <div className="App">
      <div className="flex flex-col space-y-100 items-center divide-y">
        {images.map((image, i) => (
          <div key={i} className="px-5 py-14">
            <SingleImage className="relative" image={image} {...postActions} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
