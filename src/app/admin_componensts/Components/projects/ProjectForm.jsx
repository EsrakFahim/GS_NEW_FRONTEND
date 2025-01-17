"use client";

// eslint-disable-next-line no-unused-vars
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { createProject } from "../../../../API/admin.api";
import { Form, Button, Image as BootstrapImage } from "react-bootstrap";
import axios from "axios";
import updateData from "@/API/updateData.api";


const ProjectForm = ({ initialData, operation }) => {
  // const [projectManager, setProjectManager] = useState([]);
  const [team, setTeam] = useState([]);
  const [tech, setTech] = useState([]);
  const [projectImages, setProjectImages] = useState([]);
  const [loadImage, setLoadImage] = useState(false);

  const fileInputRef = useRef(null);

  console.log("projectImages:", projectImages);

  // console.log("Initial Data:", initialData);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  useEffect(() => {
    if (initialData) {
      Object.entries(initialData).forEach(([key, value]) => {
        // Format date fields to "YYYY-MM-DD"
        if (key === "startDate" || key === "endDate") {
          const formattedDate = value ? new Date(value).toISOString().split("T")[0] : "";
          setValue(key, formattedDate);
        } else {
          setValue(key, value);
        }
      });

      // if (initialData.projectManager) setProjectManager(initialData.projectManager);
      if (initialData.team) setTeam(initialData.team);
      if (initialData.tech) setTech(initialData.tech);
      if (initialData.files) setProjectImages(initialData.files);
    }
  }, [initialData, setValue]);


  // console.log("projectImages:", projectImages);


  // Add Project Manager Field
  // const addProjectManagerField = () => {
  //   setProjectManager([...projectManager, ""]);
  // };

  // const handleProjectManagerChange = (index, value) => {
  //   const updatedProjectManager = [...projectManager];
  //   updatedProjectManager[index] = value;
  //   setProjectManager(updatedProjectManager);
  //   setValue("projectManager", updatedProjectManager); // Update form value
  // };

  // const removeProjectManager = (index) => {
  //   const updatedProjectManager = projectManager.filter((_, i) => i !== index);
  //   setProjectManager(updatedProjectManager);
  //   setValue("projectManager", updatedProjectManager); // Update form value
  // };

  // Add Team Member Field
  const addTeamMemberField = () => {
    setTeam([...team, ""]);
  };

  const handleTeamMemberChange = (index, value) => {
    const updatedTeam = [...team];
    updatedTeam[index] = value;
    setTeam(updatedTeam);
    setValue("includingServices", updatedTeam); // Update form value
  };

  const removeTeamMemberField = (index) => {
    const updatedTeam = team.filter((_, i) => i !== index);
    setTeam(updatedTeam);
    setValue("includingServices", updatedTeam); // Update form value
  };

  // Add Tech Field
  const addTechField = () => {
    setTech([...tech, ""]);
  };

  const handleTechChange = (index, value) => {
    const updatedTech = [...tech];
    updatedTech[index] = value;
    setTech(updatedTech);
    setValue("tech", updatedTech); // Update form value
  };

  const removeTechField = (index) => {
    const updatedTech = tech.filter((_, i) => i !== index);
    setTech(updatedTech);
    setValue("tech", updatedTech); // Update form value
  };

  // Image Field
  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const tempImageUrl = URL.createObjectURL(file);

      setProjectImages((prevState) => [
        ...prevState,
        { url: tempImageUrl },
      ]);

      const tempImageIndex = projectImages.length;
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

      setProjectImages((prevState) => {
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

  const handleRemoveImage = (index) => {
    setProjectImages((prevState) =>
      prevState.filter((_, imgIndex) => imgIndex !== index)
    );
  };

  const renderImageField = useMemo(() => (
    <Form.Group className="mb-3">
      <Form.Label>About Images (Max 3)</Form.Label>
      {projectImages.map((image, index) => (
        <div key={index} className="mb-2 d-flex align-items-center gap-3">
          <BootstrapImage
            src={image?.url}
            alt={`Image ${index + 1}`}
            width={500}
            height={320}
          />
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
        disabled={projectImages?.length >= 3}
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
  ), [projectImages]);


  const handleCreateProject = async (data) => {

    console.table(
      "Creating project with data:",
      data,
    )

    try {
      // const formData = new FormData();
      const formData = {
        name: data.name,
        description: data.description,
        client: data.client,
        projectType: data.projectType,
        status: data.status,
        startDate: data.startDate || null,
        endDate: data.endDate || null,
        projectManager: data.projectManager || "",
        budget: data.budget || 0,
        spent: data.spent || 0,
        livePreview: data.livePreview || "",
        sourceFile: data.sourceFile || "",
        isActive: data.isActive || false,
        team: JSON.stringify(team || []), // Serialize arrays
        tech: JSON.stringify(tech || []), // Serialize arrays
        notes: data.notes || "",
        projectImages: projectImages || [],
      };

      // Append fields to FormData
      // Object.entries(fields).forEach(([key, value]) => {
      //   if (value !== null && value !== undefined) {
      //     formData.append(key, value);
      //   }
      // });

      // Append project images
      // if (projectImages.length > 0) {
      //   projectImages.forEach((image, index) => {
      //     if (image.url) {
      //       // If `image` contains a `File` or `Blob` object
      //       formData.append(`files[${index}]`, image.file);
      //     } else {
      //       console.warn("Skipping invalid image:", image);
      //     }
      //   });
      // };

      console.log("projectImages:", projectImages);

      // Uncomment to make API call
      await createProject(formData);

      toast.success("Project created successfully!");
      reset();
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("Failed to create project. Please try again.");
    }
  };


  const handleEditProject = async (data) => {
    try {
      // Create FormData instance
      const formData = {
        name: data.name,
        description: data.description,
        client: data.client,
        projectType: data.projectType,
        status: data.status,
        startDate: data.startDate || null,
        endDate: data.endDate || null,
        projectManager: data.projectManager || "",
        budget: data.budget || 0,
        spent: data.spent || 0,
        livePreview: data.livePreview || "",
        sourceFile: data.sourceFile || "",
        isActive: data.isActive || false,
        team: JSON.stringify(team || []), // Serialize arrays
        tech: JSON.stringify(tech || []), // Serialize arrays
        notes: data.notes || "",
        projectImages: projectImages || [],
      };

      await updateData(initialData._id, formData, "projects");


    } catch (error) {
      console.error("Error editing project:", error);
      toast.error("Failed to edit project. Please try again.");
    }
  };



  const handleEditingOptions = async (data) => {
    if (operation === "edit") {
      await handleEditProject(data);
    } else {
      await handleCreateProject(data);
    }
  }




  return (
    <div>
      <Toaster position="bottom-center" reverseOrder={false} />
      <form onSubmit={handleSubmit(handleEditingOptions)}>
        <div className="panel-body p-4">
          <div className="row">
            <div className="col-xl-8">
              {/* Project Name */}
              <div className="row mb-3">
                <label htmlFor="name" className="col-form-label col-lg-3 ">
                  Project Name <span style={{ color: "red" }}>*</span>
                </label>
                <div className="col-lg-9">
                  <input
                    autoComplete="off"
                    type="text"
                    id="name"
                    defaultValue={initialData?.name}
                    className="form-control"
                    placeholder="Project Name"
                    {...register("name", {
                      required: "Project name is required",
                      maxLength: 100,
                    })}
                  />
                  {errors.name && (
                    <p style={{ color: "red" }}>{errors.name.message}</p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="row mb-3">
                <label
                  htmlFor="description"
                  className="col-form-label col-lg-3 "
                >
                  Description <span style={{ color: "red" }}>*</span>
                </label>
                <div className="col-lg-9">
                  <textarea
                    id="description"
                    defaultValue={initialData?.description}
                    className="form-control"
                    placeholder="Project Description"
                    {...register("description", {
                      required: "Description is required",
                      maxLength: 500,
                    })}
                  ></textarea>
                  {errors.description && (
                    <p style={{ color: "red" }}>{errors.description.message}</p>
                  )}
                </div>
              </div>

              {/* Client */}
              <div className="row mb-3">
                <label htmlFor="client" className="col-form-label col-lg-3 ">
                  Client
                </label>
                <div className="col-lg-9">
                  <input
                    type="text"
                    defaultValue={initialData?.client}
                    autoComplete="off"
                    id="client"
                    className="form-control"
                    placeholder="Client Name"
                    {...register("client", { maxLength: 100 })}
                  />
                  {errors.client && (
                    <p style={{ color: "red" }}>{errors.client.message}</p>
                  )}
                </div>
              </div>

              {/* Project Type */}
              <div className="row mb-3">
                <label
                  htmlFor="projectType"
                  className="col-form-label col-lg-3 "
                >
                  Project Type <span style={{ color: "red" }}>*</span>
                </label>
                <div className="col-lg-9">
                  <select
                    id="projectType"
                    defaultValue={initialData?.projectType}
                    className="form-select"
                    {...register("projectType", {
                      required: "Project type is required",
                    })}
                  >
                    <option value="">Select Project Type</option>
                    <option value="Website">Website</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="Software">Software</option>
                    <option value="Consulting">Consulting</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.projectType && (
                    <p style={{ color: "red" }}>{errors.projectType.message}</p>
                  )}
                </div>
              </div>

              {/* Status */}
              <div className="row mb-3">
                <label htmlFor="status" className="col-form-label col-lg-3 ">
                  Status <span style={{ color: "red" }}>*</span>
                </label>
                <div className="col-lg-9">
                  <select
                    id="status"
                    defaultValue={initialData?.status}
                    className="form-select"
                    {...register("status", { required: "Status is required" })}
                  >
                    <option value="">Select Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                  {errors.status && (
                    <p style={{ color: "red" }}>{errors.status.message}</p>
                  )}
                </div>
              </div>

              {/* Start Date */}
              <div className="row mb-3">
                <label htmlFor="startDate" className="col-form-label col-lg-3">
                  Start Date
                </label>
                <div className="col-lg-9">
                  <input
                    type="date"
                    id="startDate"
                    defaultValue={initialData?.startDate ? new Date(initialData.startDate).toISOString().split("T")[0] : ""}
                    className="form-control"
                    {...register("startDate")}
                  />
                </div>
              </div>


              {/* End Date */}
              <div className="row mb-3">
                <label htmlFor="endDate" className="col-form-label col-lg-3 ">
                  End Date
                </label>
                <div className="col-lg-9">
                  <input
                    type="date"
                    id="endDate"
                    defaultValue={initialData?.endDate}
                    className="form-control"
                    {...register("endDate")}
                  />
                </div>
              </div>

              {/* Project Manager */}
              <div className="row mb-3">
                <label htmlFor="endDate" className="col-form-label col-lg-3 ">
                  Project Manager
                </label>
                <div className="col-lg-9">
                  <input
                    type="text"
                    id="projectManager"
                    defaultValue={initialData?.projectManager}
                    className="form-control"
                    {...register("projectManager")}
                  />
                </div>
              </div>

              {/* Team */}
              <Form.Group className="mb-3">
                <Form.Label>Team Member</Form.Label>
                {team?.map((service, index) => (
                  <div key={index} className="d-flex align-items-center mb-2">
                    <Form.Control
                      type="text"
                      autoComplete="off"
                      placeholder={`Team Member ${index + 1}`}
                      value={service}
                      onChange={(e) => handleTeamMemberChange(index, e.target.value)}
                      className="me-2"
                    />
                    <Button
                      variant="danger"
                      onClick={() => removeTeamMemberField(index)}
                      disabled={team.length === 1}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button variant="success" onClick={addTeamMemberField}>
                  Add more
                </Button>
              </Form.Group>

              {/* Budget */}
              <div className="row mb-3">
                <label htmlFor="budget" className="col-form-label col-lg-3 ">
                  Budget
                </label>
                <div className="col-lg-9">
                  <input
                    type="number"
                    id="budget"
                    defaultValue={initialData?.budget}
                    className="form-control"
                    placeholder="0"
                    min="0"
                    {...register("budget", { valueAsNumber: true })}
                  />
                </div>
              </div>

              {/* Spent */}
              <div className="row mb-3">
                <label htmlFor="spent" className="col-form-label col-lg-3 ">
                  Spent
                </label>
                <div className="col-lg-9">
                  <input
                    type="number"
                    id="spent"
                    defaultValue={initialData?.spent}
                    className="form-control"
                    placeholder="0"
                    min="0"
                    {...register("spent", { valueAsNumber: true })}
                  />
                </div>
              </div>

              {/* Technologies */}
              <Form.Group className="mb-3">
                <Form.Label>Tech uses</Form.Label>
                {tech?.map((service, index) => (
                  <div key={index} className="d-flex align-items-center mb-2">
                    <Form.Control
                      type="text"
                      autoComplete="off"
                      placeholder={`Tech ${index + 1}`}
                      value={service}
                      onChange={(e) => handleTechChange(index, e.target.value)}
                      className="me-2"
                    />
                    <Button
                      variant="danger"
                      onClick={() => removeTechField(index)}
                      disabled={tech.length === 1}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button variant="success" onClick={addTechField}>
                  Add more
                </Button>
              </Form.Group>

              {/* Notes */}
              <div className="row mb-3">
                <label htmlFor="notes" className="col-form-label col-lg-3 ">
                  Notes
                </label>
                <div className="col-lg-9">
                  <textarea
                    id="notes"
                    defaultValue={initialData?.notes}
                    className="form-control"
                    {...register("notes")}
                  ></textarea>
                </div>
              </div>

              {/* Live Preview */}
              <div className="row mb-3">
                <label
                  htmlFor="livePreview"
                  className="col-form-label col-lg-3 "
                >
                  Live Preview URL
                </label>
                <div className="col-lg-9">
                  <input
                    type="url"
                    defaultValue={initialData?.livePreview}
                    autoComplete="off"
                    id="livePreview"
                    className="form-control"
                    placeholder="https://example.com"
                    {...register("livePreview", {
                      pattern: {
                        value: /^https?:\/\/[^\s]+$/,
                        message: "Invalid URL format",
                      },
                    })}
                  />
                  {errors.livePreview && (
                    <p style={{ color: "red" }}>{errors.livePreview.message}</p>
                  )}
                </div>
              </div>

              {/* Source File */}
              <div className="row mb-3">
                <label
                  htmlFor="sourceFile"
                  className="col-form-label col-lg-3 "
                >
                  Source File URL
                </label>
                <div className="col-lg-9">
                  <input
                    type="url"
                    autoComplete="off"
                    id="sourceFile"
                    className="form-control"
                    defaultValue={initialData?.sourceFile}
                    placeholder="https://example.com"
                    {...register("sourceFile", {
                      pattern: {
                        value: /^https?:\/\/[^\s]+$/,
                        message: "Invalid URL format",
                      },
                    })}
                  />
                  {errors.sourceFile && (
                    <p style={{ color: "red" }}>{errors.sourceFile.message}</p>
                  )}
                </div>
              </div>

              {/* Is Active */}
              <div className="row mb-3">
                <label htmlFor="isActive" className="col-form-label col-lg-3 ">
                  Active
                </label>
                <div className="col-lg-9">
                  <input
                    type="checkbox"
                    defaultChecked={initialData?.isActive}
                    id="isActive"
                    {...register("isActive")}
                  />
                </div>
              </div>

              {/* Files */}
              {/* <div className="row mb-3">
                <label htmlFor="files" className="col-form-label col-lg-3 ">
                  Files
                </label>
                <div className="col-lg-9">
                  <input
                    type="file"
                    id="files"
                    multiple
                    {...register("files")}
                  />
                </div>
              </div> */}
              {renderImageField}

              {/* Submit Button */}
              <div className="row mb-3">
                <div className="col-lg-9 offset-lg-3">
                  <button type="submit" className="btn btn-primary">
                    {
                      operation === "edit" ? "Edit Project" : "Create Project"
                    }
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

export default ProjectForm;
