/**
 * Page component for managing the "About" page in the admin panel.
 *
 * This component fetches data from the database, allows the user to edit the content,
 * and handles image uploads and form submissions.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 *
 * @example
 * <Page />
 */

"use client";

import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { set, useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { useFetchDataFromDB } from "@/API/FetchData";
import axios from "axios";
import Image from "next/image";
import toast from "react-hot-toast";
import { AiOutlineCloseCircle } from "react-icons/ai";
import updatePageData from "@/API/updatePageData.api";
import Loader from "@/app/ui/Loader/Loader";
import { createAboutPage } from "@/API/admin.api";
import TextEditor from "@/app/admin_componensts/Components/TextEditor/TextEditor";

const Page = () => {
      const { data: aboutData, isLoading } = useFetchDataFromDB("about-page");

      const [formData, setFormData] = useState({
            benefits: [],
            images: [],
            title: "",
            description: "",
            whyWeTitle: "",
            whyWeDescription: "",
            isActive: false,
            whyWeImage: "",
      });

      const [whyWeImageSrc, setWhyWeImageSrc] = useState("");
      const [loadImage, setLoadImage] = useState(false);
      const [description, setDescription] = useState("");
      const fileInputRef = useRef();
      const { register, handleSubmit, setValue, formState: { errors } } = useForm();

      useEffect(() => {
            if (aboutData) {
                  const {
                        title,
                        description,
                        whyWeTitle,
                        whyWeDescription,
                        isActive,
                        benefits,
                        images,
                        whyWeImage,
                  } = aboutData?.data[0] || {};

                  setFormData({
                        benefits: benefits || [],
                        images: images || [],
                        title: title || "",
                        description: description || "",
                        whyWeTitle: whyWeTitle || "",
                        whyWeDescription: whyWeDescription || "",
                        isActive: isActive || false,
                        whyWeImage: whyWeImage || "",
                  });
                  setDescription(description || "");

                  setValue("title", title);
                  setValue("description", description);
                  setValue("whyWeTitle", whyWeTitle);
                  setValue("whyWeDescription", whyWeDescription);
                  setValue("isActive", isActive);
                  setValue("whyWeImage", whyWeImage?.secure_url);
            }
      }, [aboutData, setValue]);

      const handleBenefitChange = (index, value) => {
            setFormData((prevState) => {
                  const updatedBenefits = [...prevState.benefits];
                  updatedBenefits[index] = value;
                  return { ...prevState, benefits: updatedBenefits };
            });
      };

      const handleAddBenefit = () => {
            setFormData((prevState) => ({
                  ...prevState,
                  benefits: [...prevState.benefits, ""],
            }));
      };

      const handleRemoveBenefit = (index) => {
            setFormData((prevState) => ({
                  ...prevState,
                  benefits: prevState.benefits.filter((_, i) => i !== index),
            }));
      };

      const handleImageUpload = async (file, tempImageIndex, field) => {
            setLoadImage(true); // Start loading
            const formData = new FormData();
            formData.append("media", file);

            console.log("Uploading image...", loadImage);

            try {
                  const { data: response } = await axios.post(
                        `${process.env.NEXT_PUBLIC_PRODUCTION_SERVER_API}/media/upload`,
                        formData
                  );

                  if (field === "whyWeImage") {
                        setFormData((prevState) => ({ ...prevState, whyWeImage: response.data }));
                  } else {
                        setFormData((prevState) => {
                              const updatedImages = [...prevState.images];
                              updatedImages[tempImageIndex] = { imageUrl: response.data.url };
                              return { ...prevState, images: updatedImages };
                        });
                  }

                  toast.success(response.message);
            } catch (error) {
                  console.error("Image upload failed:", error);
                  toast.error("Image upload failed. Please try again.");
            } finally {
                  setLoadImage(false); // Always reset loading state
            }
      };


      const handleFileChange = (event) => {
            const file = event.target.files?.[0];
            if (file) {
                  const tempImageUrl = URL.createObjectURL(file);

                  setFormData((prevState) => ({
                        ...prevState,
                        images: [...prevState.images, { imageUrl: tempImageUrl }],
                  }));

                  const tempImageIndex = formData.images.length;
                  handleImageUpload(file, tempImageIndex);
            }
      };

      const handleRemoveImage = (index) => {
            setFormData((prevState) => ({
                  ...prevState,
                  images: prevState.images.filter((_, imgIndex) => imgIndex !== index),
            }));
      };

      // Why We Image handlers
      const handleWhyWeFileChange = (event) => {
            const file = event.target.files?.[0];
            if (file) {
                  const reader = new FileReader();
                  reader.onload = (e) => setWhyWeImageSrc(e.target.result);
                  reader.readAsDataURL(file);
                  handleImageUpload(file, 0, "whyWeImage");	// found problem here for why we image need to fix
            }
      };

      const handleWhyWeRemoveImage = () => {
            setWhyWeImageSrc("");
            setFormData((prevState) => ({ ...prevState, whyWeImage: "" }));
      };

      // Memoized render functions for benefits fields
      const renderBenefitsFields = useMemo(() => (
            <Form.Group className="mb-3">
                  <Form.Label>Benefits</Form.Label>
                  {formData.benefits.map((benefit, index) => (
                        <div key={index} className="mb-3 border p-3 rounded">
                              <Form.Group className="mb-2">
                                    <Form.Label>{`Benefit ${index + 1} Title`}</Form.Label>
                                    <Form.Control
                                          type="text"
                                          value={benefit.title || ""}
                                          onChange={(e) =>
                                                handleBenefitChange(index, {
                                                      ...benefit,
                                                      title: e.target.value,
                                                })
                                          }
                                          placeholder={`Enter Benefit ${index + 1} Title`}
                                          className="me-2"
                                    />
                              </Form.Group>

                              <Form.Group className="mb-2">
                                    <Form.Label>{`Benefit ${index + 1} Details`}</Form.Label>
                                    <Form.Control
                                          as="textarea"
                                          rows={3}
                                          value={benefit.description || ""}
                                          onChange={(e) =>
                                                handleBenefitChange(index, {
                                                      ...benefit,
                                                      details: e.target.value,
                                                })
                                          }
                                          placeholder={`Enter Benefit ${index + 1} Details`}
                                    />
                              </Form.Group>

                              <Button
                                    variant="danger"
                                    onClick={() => handleRemoveBenefit(index)}
                                    disabled={formData.benefits.length === 1}
                                    className="mt-2"
                              >
                                    Remove
                              </Button>
                        </div>
                  ))}

                  <Button
                        variant="secondary"
                        onClick={handleAddBenefit}
                        className="mt-3"
                  >
                        Add Benefit
                  </Button>
            </Form.Group>
      ), [formData.benefits, handleBenefitChange, handleRemoveBenefit, handleAddBenefit]);


      const renderImageField = useMemo(() => (
            <Form.Group className="mb-3">
                  <Form.Label>About Images (Max 3)</Form.Label>
                  {formData.images.map((image, index) => (
                        <div key={index} className="mb-2 d-flex align-items-center gap-3">
                              <Image src={image.imageUrl} alt={`Image ${index + 1}`} width={500} height={320} />
                              <Button
                                    variant="danger"
                                    onClick={() => handleRemoveImage(index)}
                              >
                                    Remove
                              </Button>
                        </div>
                  ))}
                  <Button
                        variant="outline-secondary"
                        onClick={() => fileInputRef.current.click()}
                        disabled={formData.images.length >= 3}
                  >
                        Add Image
                  </Button>
                  <Form.Control
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="d-none"
                  />
            </Form.Group>
      ), [formData.images]);


      const onSubmit = (data) => {

            // Merge data from the form and formData, prioritizing `formData` for properties like images and benefits
            const finalData = {
                  ...data,
                  description,
                  benefits: formData.benefits,
                  images: formData.images,
                  whyWeImage: formData.whyWeImage,
                  isActive: formData.isActive,
            };

            console.log("Final data:", finalData);

            // Validation for images
            if (!finalData.images || finalData.images.length < 3) {
                  return toast.error("At least 3 images are required.");
            }

            // Update or create the about page based on the presence of `aboutData`
            if (aboutData?.data?.length > 0) {
                  const id = aboutData?.data[0]._id;
                  console.log("Updating about page with ID:", id, "updatedFields:", finalData);
                  updatePageData(finalData, "about-page");
            } else {
                  console.log("Creating about page with data:", finalData);
                  createAboutPage(finalData);
            }
      };


      if (isLoading) {
            console.log("Loading...");
            return (
                  <Loader />
            )
      }

      return (
            <Form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded">
                  <h3>{aboutData ? "Update About Page" : "Create About Page"}</h3>

                  <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                              type="text"
                              {...register("title", { required: "Title is required" })}
                              placeholder="Enter title"
                        />
                        {errors.title && <small className="text-danger">{errors.title.message}</small>}
                  </Form.Group>

                  {/* <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                              as="textarea"
                              rows={3}
                              {...register("description", { required: "Description is required" })}
                              placeholder="Enter description"
                        />
                        {errors.description && <small className="text-danger">{errors.description.message}</small>}
                  </Form.Group> */}

                  <TextEditor
                        placeholder="Enter description"
                        content={description}
                        setContent={setDescription}
                  />

                  {renderImageField}

                  <Form.Group className="mb-3">
                        <Form.Label>Why We Title</Form.Label>
                        <Form.Control
                              type="text"
                              {...register("whyWeTitle", { required: "This field is required" })}
                              placeholder="Why choose us title"
                        />
                        {errors.whyWeTitle && <small className="text-danger">{errors.whyWeTitle.message}</small>}
                  </Form.Group>

                  <Form.Group className="mb-3">
                        <Form.Label>Why We Description</Form.Label>
                        <Form.Control
                              as="textarea"
                              rows={3}
                              {...register("whyWeDescription", { required: "Description is required" })}
                              placeholder="Enter description"
                        />
                        {errors.whyWeDescription && <small className="text-danger">{errors.whyWeDescription.message}</small>}
                  </Form.Group>

                  <div className="mb-5 py-5">
                        <Form.Label>Why We Image</Form.Label>
                        <div className={`rounded border-dashed border-2 border-secondary p-3 d-flex justify-content-center align-items-center ${loadImage ? "opacity-50" : "opacity-100"}`}>
                              <div className="position-relative d-flex flex-column align-items-center">
                                    {whyWeImageSrc ? (
                                          <div className="position-relative">
                                                <Image
                                                      src={whyWeImageSrc}
                                                      alt="Uploaded Image"
                                                      width={500}
                                                      height={400}
                                                      style={{ aspectRatio: "16/9" }}
                                                />
                                                <AiOutlineCloseCircle
                                                      onClick={handleWhyWeRemoveImage}
                                                      className="position-absolute top-0 end-0 text-danger cursor-pointer"
                                                      style={{ fontSize: "1.5rem" }}
                                                />
                                          </div>
                                    ) : (
                                          <Button
                                                variant="outline-secondary"
                                                onClick={() => document.getElementById("file-upload").click()}
                                          >
                                                Upload your photo
                                          </Button>
                                    )}
                                    <Form.Control
                                          type="file"
                                          id="file-upload"
                                          accept="image/*"
                                          onChange={handleWhyWeFileChange}
                                          className="d-none"
                                    />
                              </div>
                        </div>
                  </div>

                  {renderBenefitsFields}

                  <Form.Group className="mb-3">
                        <Form.Check
                              type="checkbox"
                              label="Is Active"
                              {...register("isActive")}
                        />
                  </Form.Group>

                  <Button variant="primary" type="submit" disabled={isLoading}>
                        {isLoading ? "Loading..." : "Submit"}
                  </Button>
            </Form>
      );
};

export default Page;
