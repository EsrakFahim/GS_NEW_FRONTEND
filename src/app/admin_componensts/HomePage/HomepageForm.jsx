"use client";

import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from 'react-hook-form';
import { createHomepage } from "../../../API/admin.api";


const HomePageForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Creating FormData instance
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("subTitle", data.subTitle);
      formData.append("videoText", data.videoText);
      formData.append("isActive", data.isActive || false);

      // Appending call to action fields
      formData.append("callToAction.text", data.callToActionText || "");
      formData.append("callToAction.url", data.callToActionUrl || "");

      // Appending file uploads
      if (data.videoFile.length > 0) {
        formData.append("video", data.videoFile[0]);
      }
      if (data.bannerImageFile.length > 0) {
        formData.append("bannerImage", data.bannerImageFile[0]);
      }
      
      await createHomepage(formData);
      toast.success("Home page entry created successfully!");
      reset();
    } catch (error) {
      console.log("Error creating home page entry:", error);
      toast.error("Failed to create home page entry. Please try again.");
    }
  };

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
                  Title <span style={{ color: "red" }}>*</span>
                </label>
                <div className="col-lg-9">
                  <input
                    type="text"
                    id="title"
                    className="form-control"
                    placeholder="Title"
                    {...register("title", {
                      required: "Title is required",
                      maxLength: 120,
                    })}
                  />
                  {errors.title && (
                    <p style={{ color: "red" }}>{errors.title.message}</p>
                  )}
                </div>
              </div>

              {/* SubTitle */}
              <div className="row mb-3">
                <label htmlFor="subTitle" className="col-form-label col-lg-3">
                  SubTitle <span style={{ color: "red" }}>*</span>
                </label>
                <div className="col-lg-9">
                  <input
                    type="text"
                    id="subTitle"
                    className="form-control"
                    placeholder="SubTitle"
                    {...register("subTitle", {
                      required: "SubTitle is required",
                      maxLength: 200,
                    })}
                  />
                  {errors.subTitle && (
                    <p style={{ color: "red" }}>{errors.subTitle.message}</p>
                  )}
                </div>
              </div>

              {/* Video Text */}
              <div className="row mb-3">
                <label htmlFor="videoText" className="col-form-label col-lg-3">
                  Video Text <span style={{ color: "red" }}>*</span>
                </label>
                <div className="col-lg-9">
                  <input
                    type="text"
                    id="videoText"
                    className="form-control"
                    placeholder="Video Text"
                    {...register("videoText", {
                      required: "Video Text is required",
                      maxLength: 200,
                    })}
                  />
                  {errors.videoText && (
                    <p style={{ color: "red" }}>{errors.videoText.message}</p>
                  )}
                </div>
              </div>

              {/* Video File */}
              <div className="row mb-3">
                <label htmlFor="videoFile" className="col-form-label col-lg-3">
                  Video File <span style={{ color: "red" }}>*</span>
                </label>
                <div className="col-lg-9">
                  <input
                    type="file"
                    id="videoFile"
                    className="form-control"
                    {...register("videoFile", {
                      required: "Video file is required",
                    })}
                  />
                  {errors.videoFile && (
                    <p style={{ color: "red" }}>{errors.videoFile.message}</p>
                  )}
                </div>
              </div>

              {/* Banner Image */}
              <div className="row mb-3">
                <label
                  htmlFor="bannerImageFile"
                  className="col-form-label col-lg-3"
                >
                  Banner Image <span style={{ color: "red" }}>*</span>
                </label>
                <div className="col-lg-9">
                  <input
                    type="file"
                    id="bannerImageFile"
                    className="form-control"
                    {...register("bannerImageFile", {
                      required: "Banner image is required",
                    })}
                  />
                  {errors.bannerImageFile && (
                    <p style={{ color: "red" }}>
                      {errors.bannerImageFile.message}
                    </p>
                  )}
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
                    className="form-control"
                    placeholder="Call to Action Text"
                    {...register("callToActionText", { maxLength: 50 })}
                  />
                  {errors.callToActionText && (
                    <p style={{ color: "red" }}>
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
                    placeholder="https://example.com"
                    {...register("callToActionUrl", {
                      pattern: {
                        value: /^https?:\/\/[^\s]+$/,
                        message: "Invalid URL format",
                      },
                    })}
                  />
                  {errors.callToActionUrl && (
                    <p style={{ color: "red" }}>
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
                    id="isActive"
                    {...register("isActive")}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="row mb-3">
                <div className="col-lg-9 offset-lg-3">
                  <button type="submit" className="btn btn-primary">
                    Create Home Page Entry
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
