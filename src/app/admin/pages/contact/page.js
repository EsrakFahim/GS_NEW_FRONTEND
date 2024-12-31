"use client";

import { useForm } from "react-hook-form";

const ContactForm = () => {
      const {
            register,
            handleSubmit,
            formState: { errors },
      } = useForm();

      const onSubmit = (data) => {
            console.log(data);
            // Handle form submission (e.g., send data to backend)
      };

      return (
            <div className="container mt-5">
                  <h2>Contact Form</h2>
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
                              Submit
                        </button>
                  </form>
            </div>
      );
};

export default ContactForm;
