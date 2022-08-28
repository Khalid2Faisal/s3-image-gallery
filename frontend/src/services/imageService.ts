import appAxios from "./appAxios";
import { Image } from "../lib/types";

const getImages = async (): Promise<Image[]> => {
  const response = await appAxios.get("/images");
  return response.data;
};

const deleteImage = async (id: string): Promise<void> => {
  await appAxios.delete(`/images/${id}`);
};

const uploadImage = async (formData: FormData): Promise<Image> => {
  const response = await appAxios.post("/images", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

const imageService = { getImages, deleteImage, uploadImage };

export default imageService;
