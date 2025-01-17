"use client";

import { createContactPage } from "@/API/admin.api";
import { useFetchDataFromDB } from "@/API/FetchData";
import updateData from "@/API/updateData.api";
import Loader from "@/app/ui/Loader/Loader";
import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import toast from "react-hot-toast";


const ContactForm = () => {
      const [loading, setLoading] = useState(false);
      const { data: ExistContactData, isLoading, isError } = useFetchDataFromDB("contact/social");

      console.log("Contact data:", ExistContactData?.data);
      const {
            register,
            handleSubmit,
            setValue,
            formState: { errors },
      } = useForm();

      useEffect(() => {
            if (ExistContactData) {
                  Object.keys(ExistContactData.data).forEach((key) => {
                        setValue(key, ExistContactData.data[key]);
                  });
            }
      }, [ExistContactData, setValue]);

      const createContact = async (data) => {
            setLoading(true);
            try {
                  const res = await createContactPage(data);
                  if (res.status === 200 || res.status === 201) {
                        toast.success("Contact page created successfully");
                  } else {
                        toast.error("Failed to create contact page");
                  }
            } catch (error) {
                  toast.error("An error occurred while creating the contact page");
            } finally {
                  setLoading(false);
            }
      };

      const updateContact = async (data) => {
            setLoading(true);
            try {
                  // Update contact data
                  console.log("Updating contact data:", data);
                  const res = await updateData(ExistContactData?.data?._id, data, "contact/social"); // Update contact data
                  console.log("Response:", res);
                  if (res.statusCode === 200 || res.statusCode === 201) {
                        toast.success("Contact page updated successfully");
                  }

            } catch (error) {
                  toast.error("An error occurred while updating the contact page");
            } finally {
                  setLoading(false);
            }
      };


      const onSubmit = async (data) => {
            if (ExistContactData) {
                  // Update contact data
                  console.log("Updating contact data:", data);
                  updateContact(data);
            } else {
                  // Create contact data
                  console.log("Creating contact data:", data);
                  createContact(data);
            }
      }

      if (loading || isLoading) {
            return <Loader />;
      }

      if (isError) {
            return <div>Error fetching data</div>;
      }

      return (
            <div className="container mt-5">
                  <h2>
                        {
                              ExistContactData ? "Update Contact" : "Create Contact"
                        }
                  </h2>
                  <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                              <label htmlFor="email" className="form-label">
                                    Email
                              </label>
                              <input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                    {...register("email", {
                                          pattern: {
                                                value: /.+\@.+\..+/,
                                                message: "Invalid email address",
                                          },
                                    })}
                              />
                              {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                        </div>

                        <div className="mb-3">
                              <label htmlFor="phone" className="form-label">
                                    Phone
                              </label>
                              <input
                                    id="phone"
                                    type="text"
                                    placeholder="Enter your phone number"
                                    className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                                    {...register("phone")}
                              />
                        </div>

                        <div className="mb-3">
                              <label htmlFor="facebook" className="form-label">
                                    Facebook
                              </label>
                              <input
                                    id="facebook"
                                    type="url"
                                    placeholder="Enter your Facebook profile URL"
                                    className={`form-control ${errors.facebook ? "is-invalid" : ""}`}
                                    {...register("facebook", {
                                          pattern: {
                                                value: /^https?:\/\/(www\.)?facebook\.com\/[A-Za-z0-9_.]+$/,
                                                message: "Invalid Facebook URL",
                                          },
                                    })}
                              />
                              {errors.facebook && <div className="invalid-feedback">{errors.facebook.message}</div>}
                        </div>

                        {[
                              "instagram",
                              "twitter",
                              "linkedin",
                              "pinterest",
                              "upwork",
                              "behance",
                              "github",
                              "fiverr",
                        ].map((field) => (
                              <div className="mb-3" key={field}>
                                    <label htmlFor={field} className="form-label">
                                          {field.charAt(0).toUpperCase() + field.slice(1)}
                                    </label>
                                    <input
                                          id={field}
                                          type="url"
                                          placeholder={`Enter your ${field.charAt(0).toUpperCase() + field.slice(1)} profile URL`}
                                          className={`form-control ${errors[field] ? "is-invalid" : ""}`}
                                          {...register(field, {
                                                pattern: {
                                                      value: /^https?:\/\/(www\.)?[A-Za-z0-9_.]+$/,
                                                      message: `Invalid ${field.charAt(0).toUpperCase() + field.slice(1)} URL`,
                                                },
                                          })}
                                    />
                                    {errors[field] && <div className="invalid-feedback">{errors[field].message}</div>}
                              </div>
                        ))}

                        <div className="mb-3">
                              <label htmlFor="website" className="form-label">
                                    Website
                              </label>
                              <input
                                    id="website"
                                    type="url"
                                    placeholder="Enter your website URL"
                                    className={`form-control ${errors.website ? "is-invalid" : ""}`}
                                    {...register("website", {
                                          pattern: {
                                                value: /^https?:\/\/(www\.)?[A-Za-z0-9_.-]+\.[A-Za-z]{2,5}$/,
                                                message: "Invalid Website URL",
                                          },
                                    })}
                              />
                              {errors.website && <div className="invalid-feedback">{errors.website.message}</div>}
                        </div>

                        <div className="mb-3">
                              <label htmlFor="address" className="form-label">
                                    Address
                              </label>
                              <textarea
                                    id="address"
                                    placeholder="Enter your address"
                                    className={`form-control ${errors.address ? "is-invalid" : ""}`}
                                    {...register("address", { maxLength: { value: 255, message: "Address too long" } })}
                              ></textarea>
                              {errors.address && <div className="invalid-feedback">{errors.address.message}</div>}
                        </div>

                        <button type="submit" className="btn btn-primary">
                              {
                                    ExistContactData ? "Update Contact" : "Create Contact"
                              }
                        </button>
                  </form>
            </div>
      );
};

export default ContactForm;



/**  
 ** @Comments Compare this snippet from backend/src/controllers/Contact/updateContact.controller.js:
**/

/**
 * ContactForm component renders a contact form with various input fields.
 * It uses React Hook Form for form handling and validation.
 * 
 * @component
 * @example
 * return (
 *   <ContactForm />
 * )
 * 
 * @returns {JSX.Element} The rendered contact form component.
 * 
 * @function
 * @name ContactForm
 * 
 * @description
 * The ContactForm component allows users to submit their contact information, including email, phone number, social media profiles, website, and address. It handles form submission asynchronously and displays success or error messages based on the response.
 * 
 * @hook
 * @name useState
 * @description Manages the loading state of the form submission.
 * 
 * @hook
 * @name useForm
 * @description Provides methods for form handling and validation.
 * 
 * @async
 * @function
 * @name onSubmit
 * @param {Object} data - The form data submitted by the user.
 * @description Handles form submission, sends data to the server, and displays appropriate toast messages based on the response.
 * 
 * @returns {Promise<void>}
 * 
 * @example
 * onSubmit({ email: 'example@example.com', phone: '1234567890' });
 * 
 * @hook
 * @name useForm
 * @description Provides methods for form handling and validation.
 * 
 * @returns {Object} The form methods and state.
 * 
 * @example
 * const { register, handleSubmit, formState: { errors } } = useForm();
 * 
 * @hook
 * @name useState
 * @description Manages the loading state of the form submission.
 * 
 * @returns {Array} The loading state and the function to update it.
 * 
 * @example
 * const [loading, setLoading] = useState(false);
 */