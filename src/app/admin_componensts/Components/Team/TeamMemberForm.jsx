"use client";

import React from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { addTeamMember } from "../../../../API/admin.api";

const TeamMemberForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Create FormData for file uploads
      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("jobTitle", data.jobTitle);
      formData.append("bio", data.bio);
      formData.append("description", data.description);
      formData.append("experience", data.experience || "0 years");

      // Append social links if provided
      [
        "facebook",
        "instagram",
        "twitter",
        "linkedin",
        "pinterest",
        "upwork",
        "behance",
        "github",
        "fiverr",
      ].forEach((platform) => {
        if (data[platform]) {
          formData.append(`socialLinks.${platform}`, data[platform]);
        }
      });

      // Append avatar file if uploaded
      if (data.avatar.length > 0) {
        formData.append("avatar", data.avatar[0]);
      }

      await addTeamMember(formData);
      toast.success("Team member added successfully!");
      reset();
    } catch (error) {
      console.error("Error adding team member:", error);
      toast.error("Failed to add team member. Please try again.");
    }
  };

  return (
    <div>
      <Toaster position="bottom-center" reverseOrder={false} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="panel-body p-4">
          <div className="row">
            <div className="col-xl-8">
              {/* Full Name */}
              <div className="row mb-3">
                <label htmlFor="fullName" className="col-form-label col-lg-3">
                  Full Name <span style={{ color: "red" }}>*</span>
                </label>
                <div className="col-lg-9">
                  <input
                    type="text"
                    id="fullName"
                    className="form-control"
                    placeholder="Full Name"
                    {...register("fullName", {
                      required: "Full Name is required",
                      maxLength: 100,
                    })}
                  />
                  {errors.fullName && (
                    <p style={{ color: "red" }}>{errors.fullName.message}</p>
                  )}
                </div>
              </div>

              {/* Job Title */}
              <div className="row mb-3">
                <label htmlFor="jobTitle" className="col-form-label col-lg-3">
                  Job Title <span style={{ color: "red" }}>*</span>
                </label>
                <div className="col-lg-9">
                  <input
                    type="text"
                    id="jobTitle"
                    className="form-control"
                    placeholder="Job Title"
                    {...register("jobTitle", {
                      required: "Job Title is required",
                      maxLength: 100,
                    })}
                  />
                  {errors.jobTitle && (
                    <p style={{ color: "red" }}>{errors.jobTitle.message}</p>
                  )}
                </div>
              </div>

              {/* Bio */}
              <div className="row mb-3">
                <label htmlFor="bio" className="col-form-label col-lg-3">
                  Bio <span style={{ color: "red" }}>*</span>
                </label>
                <div className="col-lg-9">
                  <textarea
                    id="bio"
                    className="form-control"
                    placeholder="Bio"
                    {...register("bio", {
                      required: "Bio is required",
                      maxLength: 500,
                    })}
                  />
                  {errors.bio && (
                    <p style={{ color: "red" }}>{errors.bio.message}</p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="row mb-3">
                <label
                  htmlFor="description"
                  className="col-form-label col-lg-3"
                >
                  Description <span style={{ color: "red" }}>*</span>
                </label>
                <div className="col-lg-9">
                  <textarea
                    id="description"
                    className="form-control"
                    placeholder="Description"
                    {...register("description", {
                      required: "Description is required",
                      maxLength: 500,
                    })}
                  />
                  {errors.description && (
                    <p style={{ color: "red" }}>{errors.description.message}</p>
                  )}
                </div>
              </div>

              {/* Avatar */}
              <div className="row mb-3">
                <label htmlFor="avatar" className="col-form-label col-lg-3">
                  Avatar <span style={{ color: "red" }}>*</span>
                </label>
                <div className="col-lg-9">
                  <input
                    type="file"
                    id="avatar"
                    className="form-control"
                    {...register("avatar", { required: "Avatar is required" })}
                  />
                  {errors.avatar && (
                    <p style={{ color: "red" }}>{errors.avatar.message}</p>
                  )}
                </div>
              </div>

              {/* Social Links */}
              {[
                "facebook",
                "instagram",
                "twitter",
                "linkedin",
                "pinterest",
                "upwork",
                "behance",
                "github",
                "fiverr",
              ].map((platform) => (
                <div className="row mb-3" key={platform}>
                  <label htmlFor={platform} className="col-form-label col-lg-3">
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </label>
                  <div className="col-lg-9">
                    <input
                      type="url"
                      id={platform}
                      className="form-control"
                      placeholder={`https://www.${platform}.com/username`}
                      {...register(platform, {
                        pattern: {
                          value: /^https?:\/\/[^\s]+$/,
                          message: "Invalid URL format",
                        },
                      })}
                    />
                    {errors[platform] && (
                      <p style={{ color: "red" }}>{errors[platform].message}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* Experience */}
              <div className="row mb-3">
                <label htmlFor="experience" className="col-form-label col-lg-3">
                  Experience
                </label>
                <div className="col-lg-9">
                  <input
                    type="text"
                    id="experience"
                    className="form-control"
                    placeholder="Experience (e.g., 5 years)"
                    {...register("experience")}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="row mb-3">
                <div className="col-lg-9 offset-lg-3">
                  <button type="submit" className="btn btn-primary">
                    Add Team Member
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

export default TeamMemberForm;
