"use client";

import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { createHomepage } from "../../../API/admin.api";
import { useFetchDataFromDB } from "@/API/FetchData";
import updatePageData from "@/API/updatePageData.api";
import { Form, Button } from "react-bootstrap";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Image from "next/image";
import axios from "axios";

const HomePageForm = () => {
  const { data, isLoading, isError } = useFetchDataFromDB("home-page");
  const [loadImage, setLoadImage] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [imgLiveUrl, setImgLiveUrl] = useState("");

  useEffect(() => {
    if (data?.data[0]?.bannerImage) {
      setImageSrc(data.data[0].bannerImage);
      setImgLiveUrl(data.data[0].bannerImage);
    }
  }, [data]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const createHomepageEntry = async (formData) => {
    try {
      await createHomepage(formData);
      toast.success("Home page entry created successfully!");
      reset();
    } catch (error) {
      console.error("Error creating home page entry:", error);
      toast.error("Failed to create home page entry. Please try again.");
    }
  };

  const editHomepageEntry = async (formData) => {
    try {
      await updatePageData(formData, "home-page");
      toast.success("Home page entry updated successfully!");
      reset();
    } catch (error) {
      console.error("Error updating home page entry:", error);
      toast.error("Failed to update home page entry. Please try again.");
    }
  };

  const onSubmit = async (formData) => {
    const updatedFormData = { ...formData, bannerImage: imgLiveUrl };
    const action = data ? editHomepageEntry : createHomepageEntry;
    await action(updatedFormData);
  };

  // Upload image to server and get the image URL
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

  const handleFileChange = (event) => {
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

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {isError.message}</div>;

  return (
    <div>
      <Toaster position="bottom-center" reverseOrder={false} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="panel-body p-4">
          <div className="row">
            <div className="col-xl-8">
              {/* Title */}
              <div className="row mb-3">
                <label htmlFor="title" className="col-form-label col-lg-3">
                  Title <span className="text-danger">*</span>
                </label>
                <div className="col-lg-9">
                  <input
                    type="text"
                    id="title"
                    defaultValue={data?.data[0]?.title}
                    className="form-control"
                    placeholder="Title"
                    {...register("title", {
                      required: "Title is required",
                      maxLength: 120,
                    })}
                  />
                  {errors.title && (
                    <p className="text-danger">{errors.title.message}</p>
                  )}
                </div>
              </div>

              {/* SubTitle */}
              <div className="row mb-3">
                <label htmlFor="subTitle" className="col-form-label col-lg-3">
                  SubTitle <span className="text-danger">*</span>
                </label>
                <div className="col-lg-9">
                  <input
                    type="text"
                    id="subTitle"
                    defaultValue={data?.data[0]?.subTitle}
                    className="form-control"
                    placeholder="SubTitle"
                    {...register("subTitle", {
                      required: "SubTitle is required",
                      maxLength: 200,
                    })}
                  />
                  {errors.subTitle && (
                    <p className="text-danger">{errors.subTitle.message}</p>
                  )}
                </div>
              </div>

              {/* Video Text */}
              <div className="row mb-3">
                <label htmlFor="videoText" className="col-form-label col-lg-3">
                  Video Text <span className="text-danger">*</span>
                </label>
                <div className="col-lg-9">
                  <input
                    type="text"
                    id="videoText"
                    defaultValue={data?.data[0]?.videoText}
                    className="form-control"
                    placeholder="Video Text"
                    {...register("videoText", {
                      required: "Video Text is required",
                      maxLength: 200,
                    })}
                  />
                  {errors.videoText && (
                    <p className="text-danger">{errors.videoText.message}</p>
                  )}
                </div>
              </div>

              {/* Video File */}
              <div className="row mb-3">
                <label htmlFor="videoFile" className="col-form-label col-lg-3">
                  Video URL <span className="text-danger">*</span>
                </label>
                <div className="col-lg-9">
                  <input
                    type="url"
                    id="videoFile"
                    defaultValue={data?.data[0]?.video}
                    className="form-control"
                    {...register("videoFile", {
                      required: "Video file is required",
                    })}
                  />
                  {errors.videoFile && (
                    <p className="text-danger">{errors.videoFile.message}</p>
                  )}
                </div>
              </div>

              {/* Banner Image */}
              <div className="mb-5 py-5">
                <Form.Label>Banner or Hero Background Image</Form.Label>
                <div
                  className={`rounded border-dashed border-2 border-secondary p-3 d-flex justify-content-center align-items-center ${loadImage ? "opacity-50" : "opacity-100"
                    }`}
                >
                  <div className="position-relative d-flex flex-column align-items-center">
                    {imageSrc ? (
                      <div className="position-relative">
                        <Image
                          src={imageSrc}
                          alt="Uploaded Image"
                          width={500}
                          height={400}
                          style={{ aspectRatio: "16/9" }}
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
                      >
                        Upload your photo
                      </Button>
                    )}
                    <Form.Control
                      type="file"
                      id="file-upload"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="d-none"
                    />
                  </div>
                </div>
              </div>

              {/* Call To Action Text */}
              <div className="row mb-3">
                <label
                  htmlFor="callToActionText"
                  className="col-form-label col-lg-3"
                >
                  Call to Action Text
                </label>
                <div className="col-lg-9">
                  <input
                    type="text"
                    id="callToActionText"
                    defaultValue={data?.data[0]?.callToAction?.text}
                    className="form-control"
                    placeholder="Call to Action Text"
                    {...register("callToActionText", { maxLength: 50 })}
                  />
                  {errors.callToActionText && (
                    <p className="text-danger">
                      {errors.callToActionText.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Call To Action URL */}
              <div className="row mb-3">
                <label
                  htmlFor="callToActionUrl"
                  className="col-form-label col-lg-3"
                >
                  Call to Action URL
                </label>
                <div className="col-lg-9">
                  <input
                    type="url"
                    id="callToActionUrl"
                    className="form-control"
                    defaultValue={data?.data[0]?.callToAction?.url}
                    placeholder="https://example.com"
                    {...register("callToActionUrl", {
                      pattern: {
                        value: /^https?:\/\/[^\s]+$/,
                        message: "Invalid URL format",
                      },
                    })}
                  />
                  {errors.callToActionUrl && (
                    <p className="text-danger">
                      {errors.callToActionUrl.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Is Active */}
              <div className="row mb-3">
                <label htmlFor="isActive" className="col-form-label col-lg-3">
                  Active
                </label>
                <div className="col-lg-9">
                  <input
                    type="checkbox"
                    defaultChecked={data?.isActive}
                    id="isActive"
                    {...register("isActive")}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="row mb-3">
                <div className="col-lg-9 offset-lg-3">
                  <button type="submit" className="btn btn-primary">
                    {data ? "Update Home Page Entry" : "Create Home Page Entry"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default HomePageForm;
