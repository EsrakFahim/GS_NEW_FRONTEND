"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, Button } from "react-bootstrap";

const Page = () => {
      const {
            register,
            handleSubmit,
            control,
            setValue,
            formState: { errors },
      } = useForm();

      const [showcaseImages, setShowcaseImages] = useState([]);
      const [includingServices, setIncludingServices] = useState([""]);

      const onSubmit = (data) => {
            // Prepare the form data for the API
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("subtitle", data.subtitle);
            formData.append("description", data.description);
            formData.append("serviceType", data.serviceType);
            formData.append("status", data.status);
            formData.append("isFeatured", data.isFeatured || false);

            // Append images
            formData.append("coverImage", data.coverImage[0]);
            showcaseImages.forEach((file, index) =>
                  formData.append(`showcaseImages[${index}]`, file)
            );

            // Append includingServices as JSON
            formData.append(
                  "includingServices",
                  JSON.stringify(data.includingServices)
            );

            console.log("Form data ready for submission:", formData);
            // Here you can call your API to submit the form data
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
            setValue("includingServices", updatedServices); // Update form value
      };

      const removeServiceField = (index) => {
            const updatedServices = includingServices.filter((_, i) => i !== index);
            setIncludingServices(updatedServices);
            setValue("includingServices", updatedServices); // Update form value
      };

      return (
            <Form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded">
                  <h3>Create Service</h3>

                  {/* Title */}
                  <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                              type="text"
                              placeholder="Enter title"
                              {...register("title", { required: "Title is required" })}
                        />
                        {errors.title && (
                              <small className="text-danger">{errors.title.message}</small>
                        )}
                  </Form.Group>

                  {/* Subtitle */}
                  <Form.Group className="mb-3">
                        <Form.Label>Subtitle</Form.Label>
                        <Form.Control
                              type="text"
                              placeholder="Enter subtitle"
                              {...register("subtitle", { required: "Subtitle is required" })}
                        />
                        {errors.subtitle && (
                              <small className="text-danger">{errors.subtitle.message}</small>
                        )}
                  </Form.Group>

                  {/* Description */}
                  <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                              as="textarea"
                              rows={3}
                              placeholder="Enter description"
                              {...register("description", {
                                    required: "Description is required",
                              })}
                        />
                        {errors.description && (
                              <small className="text-danger">{errors.description.message}</small>
                        )}
                  </Form.Group>

                  {/* Cover Image */}
                  <Form.Group className="mb-3">
                        <Form.Label>Cover Image</Form.Label>
                        <Form.Control
                              type="file"
                              {...register("coverImage", { required: "Cover image is required" })}
                        />
                        {errors.coverImage && (
                              <small className="text-danger">{errors.coverImage.message}</small>
                        )}
                  </Form.Group>

                  {/* Showcase Images */}
                  <Form.Group className="mb-3">
                        <Form.Label>Showcase Images (Max: 5)</Form.Label>
                        <Form.Control
                              type="file"
                              multiple
                              onChange={handleShowcaseImageChange}
                        />
                        {showcaseImages.length > 5 && (
                              <small className="text-danger">
                                    You can only upload up to 5 showcase images.
                              </small>
                        )}
                  </Form.Group>

                  {/* Service Type */}
                  <Form.Group className="mb-3">
                        <Form.Label>Service Type</Form.Label>
                        <Form.Select
                              {...register("serviceType", {
                                    required: "Please select a service type",
                              })}
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

                  {/* Status */}
                  <Form.Group className="mb-3">
                        <Form.Label>Status</Form.Label>
                        <Form.Select
                              {...register("status", {
                                    required: "Please select a status",
                              })}
                        >
                              <option value="">Select</option>
                              <option value="Active">Active</option>
                              <option value="Inactive">Inactive</option>
                        </Form.Select>
                        {errors.status && (
                              <small className="text-danger">{errors.status.message}</small>
                        )}
                  </Form.Group>

                  {/* Including Services */}
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
                                    />
                                    <Button
                                          variant="danger"
                                          onClick={() => removeServiceField(index)}
                                          disabled={includingServices.length === 1}
                                    >
                                          Remove
                                    </Button>
                              </div>
                        ))}
                        <Button variant="success" onClick={addServiceField}>
                              Add Service
                        </Button>
                  </Form.Group>

                  {/* Is Featured */}
                  <Form.Group className="mb-3">
                        <Form.Check
                              type="checkbox"
                              label="Is Featured"
                              {...register("isFeatured")}
                        />
                  </Form.Group>

                  <Button type="submit" variant="primary">
                        Submit
                  </Button>
            </Form>
      );
};

export default Page;
