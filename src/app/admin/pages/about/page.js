"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { useFetchDataFromDB } from "@/API/FetchData";

const Page = () => {
      const [benefits, setBenefits] = useState([""]);
      const {
            register,
            handleSubmit,
            setValue,
            reset,
            formState: { errors },
      } = useForm();

      const { data, isError, isLoading } = useFetchDataFromDB("about-page");

      useEffect(() => {
            if (data) {
                  const {
                        title,
                        description,
                        whyWeTitle,
                        whyWeDescription,
                        isActive,
                        benefits,
                  } = data.data[0];

                  // Populate form fields with existing data
                  setValue("title", title);
                  setValue("description", description);
                  setValue("whyWeTitle", whyWeTitle);
                  setValue("whyWeDescription", whyWeDescription);
                  setValue("isActive", isActive);
                  setBenefits(benefits);
            }
      }, [data, setValue]);

      const handleAddBenefit = () => setBenefits([...benefits, ""]);

      const handleRemoveBenefit = (index) => {
            const updatedBenefits = benefits.filter((_, i) => i !== index);
            setBenefits(updatedBenefits);
      };

      const handleBenefitChange = (index, value) => {
            const updatedBenefits = [...benefits];
            updatedBenefits[index] = value;
            setBenefits(updatedBenefits);
      };

      const onSubmit = (formData) => {
            formData.benefits = benefits;
            console.log("Form submitted:", formData);
            // Handle create or update logic here (e.g., API calls)
      };

      const renderBenefitsFields = () => (
            <Form.Group className="mb-3">
                  <Form.Label>Benefits</Form.Label>
                  {benefits.map((benefit, index) => (
                        <div key={index} className="d-flex align-items-center mb-2">
                              <Form.Control
                                    type="text"
                                    value={benefit}
                                    onChange={(e) => handleBenefitChange(index, e.target.value)}
                                    placeholder={`Benefit ${index + 1}`}
                                    className="me-2"
                              />
                              <Button
                                    variant="danger"
                                    onClick={() => handleRemoveBenefit(index)}
                                    disabled={benefits.length === 1}
                              >
                                    Remove
                              </Button>
                        </div>
                  ))}
                  <Button variant="secondary" onClick={handleAddBenefit} className="mt-2">
                        Add Benefit
                  </Button>
            </Form.Group>
      );

      return (
            <Form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded">
                  <h3>{data ? "Update About Page" : "Create About Page"}</h3>

                  <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                              type="text"
                              {...register("title", { required: "Title is required" })}
                              placeholder="Enter title"
                        />
                        {errors.title && <small className="text-danger">{errors.title.message}</small>}
                  </Form.Group>

                  <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                              as="textarea"
                              rows={3}
                              {...register("description", { required: "Description is required" })}
                              placeholder="Enter description"
                        />
                        {errors.description && <small className="text-danger">{errors.description.message}</small>}
                  </Form.Group>

                  <Form.Group className="mb-3">
                        <Form.Label>Images</Form.Label>
                        <Form.Control
                              type="file"
                              multiple
                              {...register("images", { required: "At least one image is required" })}
                        />
                        {errors.images && <small className="text-danger">{errors.images.message}</small>}
                  </Form.Group>

                  <Form.Group className="mb-3">
                        <Form.Label>Why We Title</Form.Label>
                        <Form.Control
                              type="text"
                              {...register("whyWeTitle", { required: "This field is required" })}
                              placeholder="Why choose us title"
                        />
                        {errors.whyWeTitle && (
                              <small className="text-danger">{errors.whyWeTitle.message}</small>
                        )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                        <Form.Label>Why We Description</Form.Label>
                        <Form.Control
                              as="textarea"
                              rows={3}
                              {...register("whyWeDescription", { required: "Description is required" })}
                              placeholder="Enter description"
                        />
                        {errors.whyWeDescription && (
                              <small className="text-danger">{errors.whyWeDescription.message}</small>
                        )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                        <Form.Label>Why We Image</Form.Label>
                        <Form.Control
                              type="file"
                              {...register("whyWeImage", { required: "Why We Image is required" })}
                        />
                        {errors.whyWeImage && (
                              <small className="text-danger">{errors.whyWeImage.message}</small>
                        )}
                  </Form.Group>

                  {renderBenefitsFields()}

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
