"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Image as BootstrapImage } from "react-bootstrap";
import axios from "axios";
import { AiOutlineCloseCircle } from "react-icons/ai";
import toast from "react-hot-toast";
import { createServicesPage } from "@/API/admin.api";
import updateData from "@/API/updateData.api";
import TextEditor from "../Components/TextEditor/TextEditor";

const ServiceForm = ({
      initialData,
      operationType,
      serviceDataLoading,
      serviceDataError,
}) => {
      const {
            register,
            handleSubmit,
            setValue,
            formState: { errors },
      } = useForm();

      const [showcaseImages, setShowcaseImages] = useState([]);
      const [includingServices, setIncludingServices] = useState([""]);
      const [imageSrc, setImageSrc] = useState("");
      const [imgLiveUrl, setImgLiveUrl] = useState("");
      const [loadImage, setLoadImage] = useState(false);
      const [serviceShowCaseImage, setServiceShowCaseImage] = useState([]);
      const [description, setDescription] = useState("");

      const fileInputRef = useRef(null);


      useEffect(() => {
            if (initialData) {
                  setValue("title", initialData.title);
                  setValue("subtitle", initialData.subTitle);
                  setValue("description", initialData.description);
                  setValue("serviceType", initialData.serviceType);
                  setValue("status", initialData.status);
                  setValue("isFeatured", initialData.isFeatured);
                  setServiceShowCaseImage(initialData.showcaseImages);
                  setImgLiveUrl(initialData.coverImage);
                  setImageSrc(initialData.coverImage);
                  setIncludingServices(initialData.includingServices);
                  setDescription(initialData.description);
            }
      }, [initialData, setValue]);

      // Edit service
      const handleServiceEdit = async (formData) => {
            try {
                  await updateData(initialData._id, formData, "service");
                  toast.success("Service edited successfully!");

            } catch (error) {
                  console.error("Service edit failed:", error);
                  toast.error("Service edit failed. Please try again.");

            }
      }

      // Create service
      const handleServiceCreate = async (formData) => {
            try {
                  await createServicesPage(formData);
                  toast.success("Service created successfully!");
            } catch (error) {
                  console.error("Service creation failed:", error);
                  toast.error("Service creation failed. Please try again.");
            }
      }



      const onSubmit = (data) => {


            const formData = {
                  title: data.title || initialData?.title,
                  subtitle: data.subtitle || initialData?.subtitle,
                  description: description || initialData?.description,
                  serviceType: data.serviceType || initialData?.serviceType,
                  status: data.status || initialData?.status,
                  isFeatured: data.isFeatured || initialData?.isFeatured,
                  coverImage: imgLiveUrl || initialData?.coverImage,
                  showcaseImages: serviceShowCaseImage || initialData?.showcaseImages,
                  includingServices: includingServices || initialData?.includingServices,
            }


            if (operationType === "edit" || initialData?._id) {
                  handleServiceEdit(formData);
            } else {
                  handleServiceCreate(formData);
            }
      };

      const handleShowcaseImageChange = (event) => {
            setShowcaseImages([...event.target.files]);
      };

      const addServiceField = () => {
            setIncludingServices([...includingServices, ""]);
      };

      const handleServiceChange = (index, value) => {
            const updatedServices = [...includingServices];
            updatedServices[index] = value;
            setIncludingServices(updatedServices);
            setValue("includingServices", updatedServices);
      };

      const removeServiceField = (index) => {
            const updatedServices = includingServices.filter((_, i) => i !== index);
            setIncludingServices(updatedServices);
            setValue("includingServices", updatedServices);
      };

      const handleImageUrl = async (file) => {
            setLoadImage(true);
            const formData = new FormData();
            formData.append("media", file);

            try {
                  const { data: response } = await axios.post(
                        `${process.env.NEXT_PUBLIC_PRODUCTION_SERVER_API}/media/upload`,
                        formData
                  );

                  setImgLiveUrl(response.data.url);
                  toast.success(response.message);
            } catch (error) {
                  console.error("Image upload failed:", error);
                  toast.error("Image upload failed. Please try again.");
            } finally {
                  setLoadImage(false);
            }
      };

      const handleCoverImageFileChange = (event) => {
            const file = event.target.files?.[0];
            if (file) {
                  const reader = new FileReader();
                  reader.onload = (e) => setImageSrc(e.target.result);
                  reader.readAsDataURL(file);
                  handleImageUrl(file);
            }
      };

      const handleRemoveImage = () => {
            setImageSrc("");
            setImgLiveUrl("");
      };

      const serviceCoverImageRender = () => (
            <div className="mb-5 py-5">
                  <Form.Label>Banner or Hero Background Image</Form.Label>
                  <div
                        className={`rounded border-dashed border-2 border-secondary p-3 d-flex justify-content-center align-items-center ${loadImage ? "opacity-50" : "opacity-100"
                              }`}
                  >
                        <div className="position-relative d-flex flex-column align-items-center">
                              {imageSrc ? (
                                    <div className="position-relative">
                                          <img
                                                src={imageSrc}
                                                alt="Uploaded Image"
                                                width={500}
                                                height={400}
                                                style={{ aspectRatio: "16/9" }}
                                                className="img-fluid"
                                          />
                                          <AiOutlineCloseCircle
                                                onClick={handleRemoveImage}
                                                className="position-absolute top-0 end-0 text-danger cursor-pointer"
                                                style={{ fontSize: "1.5rem" }}
                                          />
                                    </div>
                              ) : (
                                    <Button
                                          variant="outline-secondary"
                                          onClick={() => document.getElementById("file-upload").click()}
                                          disabled={loadImage}
                                    >
                                          Upload your photo
                                    </Button>
                              )}
                              <Form.Control
                                    type="file"
                                    id="file-upload"
                                    accept="image/*"
                                    onChange={handleCoverImageFileChange}
                                    className="d-none"
                              />
                        </div>
                  </div>
            </div>
      );

      const handleFileChange = (event) => {
            const file = event.target.files?.[0];
            if (file) {
                  const tempImageUrl = URL.createObjectURL(file);

                  setServiceShowCaseImage((prevState) => [
                        ...prevState,
                        { url: tempImageUrl },
                  ]);

                  const tempImageIndex = serviceShowCaseImage.length;
                  handleImageUpload(file, tempImageIndex);
            }
      };

      const handleImageUpload = async (file, tempImageIndex) => {
            setLoadImage(true);
            const formData = new FormData();
            formData.append("media", file);

            try {
                  const { data: response } = await axios.post(
                        `${process.env.NEXT_PUBLIC_PRODUCTION_SERVER_API}/media/upload`,
                        formData
                  );
                  if (response.data.url) {
                        setLoadImage(false);
                  }

                  setServiceShowCaseImage((prevState) => {
                        const updatedImages = [...prevState];
                        if (tempImageIndex < updatedImages.length) {
                              updatedImages[tempImageIndex] = { url: response.data.url };
                        } else {
                              updatedImages.push({ url: response.data.url });
                        }
                        return updatedImages;
                  });

                  toast.success("Image uploaded successfully!");
            } catch (error) {
                  toast.error("Image upload failed. Please try again.");
            }
      };

      const handleRemoveImageField = (index) => {
            setServiceShowCaseImage((prevState) =>
                  prevState.filter((_, imgIndex) => imgIndex !== index)
            );
      };

      const renderImageField = useMemo(
            () => (
                  <Form.Group className="mb-3">
                        <Form.Label>About Images (Max 3)</Form.Label>
                        {serviceShowCaseImage.map((image, index) => (
                              <div
                                    key={index}
                                    className={`rounded border-dashed border-2 border-secondary p-3 d-flex justify-content-center align-items-center ${loadImage ? "opacity-50" : "opacity-100"
                                          }`}
                              >
                                    <BootstrapImage
                                          src={image?.url}
                                          alt={`Image ${index + 1}`}
                                          width={500}
                                          height={320}
                                    />
                                    <Button
                                          variant="danger"
                                          onClick={() => handleRemoveImageField(index)}
                                          disabled={loadImage}
                                    >
                                          Remove
                                    </Button>
                              </div>
                        ))}
                        <Button
                              variant="outline-secondary"
                              onClick={() => fileInputRef.current.click()}
                              disabled={loadImage || serviceShowCaseImage?.length >= 3}
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
            ),
            [serviceShowCaseImage, loadImage]
      );


      if (serviceDataLoading) {
            return <p>Loading...</p>;
      }

      if (serviceDataError) {
            return <p>Error: {serviceDataError.message}</p>
      }

      return (
            <Form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded">
                  <h3>Create Service</h3>

                  <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                              type="text"
                              placeholder="Enter title"
                              {...register("title", { required: "Title is required" })}
                              disabled={loadImage}
                        />
                        {errors.title && (
                              <small className="text-danger">{errors.title.message}</small>
                        )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                        <Form.Label>Subtitle</Form.Label>
                        <Form.Control
                              type="text"
                              placeholder="Enter subtitle"
                              {...register("subtitle", { required: "Subtitle is required" })}
                              disabled={loadImage}
                        />
                        {errors.subtitle && (
                              <small className="text-danger">{errors.subtitle.message}</small>
                        )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <TextEditor
                              placeholder="Enter description"
                              content={description}
                              setContent={setDescription}
                        />
                  </Form.Group>

                  {serviceCoverImageRender()}

                  {renderImageField}

                  <Form.Group className="mb-3">
                        <Form.Label>Service Type</Form.Label>
                        <Form.Select
                              {...register("serviceType", {
                                    required: "Please select a service type",
                              })}
                              disabled={loadImage}
                        >
                              <option value="">Select</option>
                              <option value="Development">Development</option>
                              <option value="Design">Design</option>
                              <option value="Marketing">Marketing</option>
                              <option value="Consulting">Consulting</option>
                              <option value="Other">Other</option>
                        </Form.Select>
                        {errors.serviceType && (
                              <small className="text-danger">{errors.serviceType.message}</small>
                        )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                        <Form.Label>Status</Form.Label>
                        <Form.Select
                              {...register("status", {
                                    required: "Please select a status",
                              })}
                              disabled={loadImage}
                        >
                              <option value="">Select</option>
                              <option value="Active">Active</option>
                              <option value="Inactive">Inactive</option>
                        </Form.Select>
                        {errors.status && (
                              <small className="text-danger">{errors.status.message}</small>
                        )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                        <Form.Label>Including Services</Form.Label>
                        {includingServices.map((service, index) => (
                              <div key={index} className="d-flex align-items-center mb-2">
                                    <Form.Control
                                          type="text"
                                          placeholder={`Service ${index + 1}`}
                                          value={service}
                                          onChange={(e) => handleServiceChange(index, e.target.value)}
                                          className="me-2"
                                          disabled={loadImage}
                                    />
                                    <Button
                                          variant="danger"
                                          onClick={() => removeServiceField(index)}
                                          disabled={loadImage || includingServices.length === 1}
                                    >
                                          Remove
                                    </Button>
                              </div>
                        ))}
                        <Button
                              variant="success"
                              onClick={addServiceField}
                              disabled={loadImage}
                        >
                              Add Service
                        </Button>
                  </Form.Group>

                  <Form.Group className="mb-3">
                        <Form.Check
                              type="checkbox"
                              label="Is Featured"
                              {...register("isFeatured")}
                              disabled={loadImage}
                        />
                  </Form.Group>

                  <Button type="submit" variant="primary" disabled={loadImage}>
                        Submit
                  </Button>
            </Form>
      );
};

export default ServiceForm;
