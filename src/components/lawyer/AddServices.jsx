"use client";

import { useState } from "react";
import { ImagePlus, Plus, Scale, Upload } from "lucide-react";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { imageUpload } from "@/lib/imgUpload";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const specializations = [
  "Family Law",
  "Criminal Law",
  "Property Law",
  "Corporate Law",
  "Immigration Law",
  "Tax Law",
  "Civil Litigation",
];

export default function AddServices() {
  const [imagePreview, setImagePreview] = useState("");
  const [imageName, setImageName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { data: session } = authClient.useSession();
  const user = session?.user
  console.log(user)

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
      setImageName(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.target);

      const file = selectedFile;
      if (!file) throw new Error("Image required");

      const uploaded = await imageUpload(file);

      const product = {
        name: formData.get("name"),
        bio: formData.get("bio"),
        fee: formData.get("fee"),
        specialization: formData.get("specialization"),
        image: uploaded.url,
      };

      console.log("SERVICE:", product);

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/lawyer`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(product),
      });

      const lawyer = await res.json();

      if (lawyer) {
        toast.success("Successfully added Lawyer");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal>
      <Button color="primary" className="gap-2">
        <Plus size={18} />
        Add Service
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="center">
          <Modal.Dialog className="w-[95vw] max-w-5xl max-h-[90vh] overflow-hidden">
            <Modal.Header className="border-b px-4 py-4">
              <Modal.Icon className="bg-primary/10 text-primary">
                <Scale size={20} />
              </Modal.Icon>

              <div>
                <Modal.Heading>Add Legal Service</Modal.Heading>
                <p className="text-sm text-muted">
                  Add the service details clients will see.
                </p>
              </div>
            </Modal.Header>

            <Modal.Body className="overflow-y-auto p-0">
              <form
                id="service-form"
                onSubmit={handleSubmit}
                className="grid lg:grid-cols-[1fr_320px]"
              >
                {/* LEFT */}
                <Surface className="p-6">
                  <TextField name="name">
                    <Label>Service Name</Label>
                    <Input name="name" required />
                  </TextField>

                  <div className="mt-4">
                    <Label>Description</Label>
                    <textarea
                      name="bio"
                      required
                      rows={5}
                      className="w-full border rounded p-2"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <TextField name="fee">
                      <Label>Fee</Label>
                      <Input name="fee" type="number" required />
                    </TextField>

                    <div>
                      <Label>Specialization</Label>
                      <select
                        name="specialization"
                        required
                        className="w-full border p-2 rounded"
                      >
                        <option value="">Select</option>
                        {specializations.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </Surface>

                {/* RIGHT */}
                <aside className="p-6 border-l">
                  <Label>Image</Label>

                  <label className="block cursor-pointer border-dashed border p-4 rounded">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        className="w-full h-40 object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <ImagePlus />
                        <p>Upload Image</p>
                      </div>
                    )}

                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>

                  <p className="text-xs mt-2 flex gap-2 items-center">
                    <Upload size={12} />
                    {imageName || "No file selected"}
                  </p>
                </aside>
                <Modal.Footer className="flex justify-end gap-3">
                  <Button slot="close" variant="secondary">
                    Cancel
                  </Button>

                  <Button type="submit" form="service-form" disabled={loading}>
                    <Plus size={16} />
                    {loading ? "Saving..." : "Save Service"}
                  </Button>
                </Modal.Footer>
              </form>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
