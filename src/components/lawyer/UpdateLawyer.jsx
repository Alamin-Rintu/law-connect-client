"use client";

import { useState } from "react";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { FaPen } from "react-icons/fa";
import { ImagePlus, Upload, Plus } from "lucide-react"; // Assuming you use lucide-react like in AddServices
import { imageUpload } from "@/lib/imgUpload";
import toast from "react-hot-toast";

const specializations = [
  "Family Law",
  "Criminal Law",
  "Property Law",
  "Corporate Law",
  "Immigration Law",
  "Tax Law",
  "Civil Litigation",
];

export function UpdateLawyer({ service, onSuccess }) {
  // Pre-fill the image preview with the existing image
  const [imagePreview, setImagePreview] = useState(service.image);
  const [imageName, setImageName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

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

      // Default to the existing image URL
      let imageUrl = service.image;

      // If the user selected a NEW image, upload it to imgBB first
      if (selectedFile) {
        const uploaded = await imageUpload(selectedFile);
        imageUrl = uploaded.url;
      }

      // Gather the updated data
      const updateData = {
        name: formData.get("name"),
        bio: formData.get("bio"),
        fee: formData.get("fee"),
        specialization: formData.get("specialization"),
        image: imageUrl,
      };

      // Send the PATCH request WITH the body
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/lawyer/${service._id}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(updateData),
        },
        console.log(service._id)
      );

      const data = await res.json();

      // MongoDB returns modifiedCount when a document is updated
      if (data.modifiedCount > 0 || data.matchedCount > 0) {
        toast.success("Service updated successfully!");

        // Trigger the parent component to refresh the table data
        if (onSuccess) {
          onSuccess();
        }
      } else {
        throw new Error("No changes made or update failed.");
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
      <Button className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition min-w-0 h-auto">
        <FaPen size={14} />
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="center">
          <Modal.Dialog className="w-[95vw] max-w-5xl max-h-[90vh] overflow-hidden">
            <Modal.CloseTrigger />
            <Modal.Header className="border-b px-4 py-4">
              <Modal.Icon className="bg-primary/10 text-primary">
                <FaPen size={14} />
              </Modal.Icon>

              <div>
                <Modal.Heading>Edit Legal Service</Modal.Heading>
                <p className="text-sm text-muted mt-1">
                  Update the details for {service.name}
                </p>
              </div>
            </Modal.Header>

            <Modal.Body className="overflow-y-auto p-0">
              <form
                id={`update-form-${service._id}`}
                onSubmit={handleSubmit}
                className="grid lg:grid-cols-[1fr_320px]"
              >
                {/* LEFT */}
                <Surface className="p-6">
                  <TextField name="name">
                    <Label>Service Name</Label>
                    <Input name="name" defaultValue={service.name} required />
                  </TextField>

                  <div className="mt-4">
                    <Label>Description</Label>
                    <textarea
                      name="bio"
                      defaultValue={service.bio}
                      required
                      rows={5}
                      className="w-full border rounded p-2"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <TextField name="fee">
                      <Label>Fee</Label>
                      <Input
                        name="fee"
                        type="number"
                        defaultValue={service.fee}
                        required
                      />
                    </TextField>

                    <div>
                      <Label>Specialization</Label>
                      <select
                        name="specialization"
                        defaultValue={service.specialization}
                        required
                        className="w-full border p-2 rounded h-10"
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

                  <label className="block cursor-pointer border-dashed border p-4 rounded mt-2">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        className="w-full h-40 object-cover rounded"
                        alt="Preview"
                      />
                    ) : (
                      <div className="text-center">
                        <ImagePlus className="mx-auto" />
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

                  <p className="text-xs mt-2 flex gap-2 items-center text-gray-500">
                    <Upload size={12} />
                    {imageName || "Click image to change"}
                  </p>
                </aside>

                {/* FOOTER */}
                <Modal.Footer className="flex justify-end gap-3 col-span-1 lg:col-span-2 border-t p-4">
                  <Button slot="close" variant="secondary" disabled={loading}>
                    Cancel
                  </Button>

                  {/* Note the form attribute matches the form ID! */}
                  <Button
                    type="submit"
                    form={`update-form-${service._id}`}
                    disabled={loading}
                    color="primary"
                  >
                    <FaPen size={14} className="mr-2" />
                    {loading ? "Updating..." : "Update Service"}
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
