import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UploadImagePage() {
  const [file, setFile] = useState<File>();

  const navigate = useNavigate();

  const submit = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", file as File);
    await axios.post("http://localhost:8000/api/images", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    navigate("/");
  };

  const fileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) {
      return;
    }
    const file = event.target.files[0];
    setFile(file);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <form
        onSubmit={submit}
        style={{ width: 650 }}
        className="flex flex-col space-y-5 px-5 py-14"
      >
        <input onChange={fileSelected} type="file" accept="image/*"></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
