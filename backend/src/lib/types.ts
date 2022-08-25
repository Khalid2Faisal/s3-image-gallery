import { Collection, ObjectId } from "mongodb";

export type Image = {
  _id: ObjectId;
  id?: string;
  name: string;
  url?: string;
  signedUrl?: string;
  mimeType: string;
};

/* Defining the shape of the database. */
export interface Database {
  images: Collection<Image>;
}
