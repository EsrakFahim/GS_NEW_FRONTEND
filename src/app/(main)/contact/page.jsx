'use client';
import { useForm } from 'react-hook-form';
import Div from "../../ui/Div";
import PageHeading from "../../ui/PageHeading";
import SectionHeading from "../../ui/SectionHeading";
import Spacing from "../../ui/Spacing";
import ContactInfoWidget from "../../ui/Widget/ContactInfoWidget";
import { Icon } from "@iconify/react";
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loader from '../../ui/Loader/Loader';

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [clientIP, setClientIP] = useState('');

  // Fetch client's IP address on mount
  useEffect(() => {
    const fetchIP = async () => {
      try {
        const res = await axios.get("https://api.ipify.org?format=json");
        setClientIP(res.data.ip); // Set the client's IP
      } catch (error) {
        console.error("Error fetching client IP:", error);
      }
    };

    fetchIP(); // Call the function to fetch IP on component mount
  }, []);

  // Disable mouse wheel and keyboard scrolling on loading
  useEffect(() => {
    const disableScroll = (event) => event.preventDefault();
    const disableArrowKeys = (event) => {
      const keysToDisable = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'];
      if (keysToDisable.includes(event.key)) {
        event.preventDefault();
      }
    };

    if (loading) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('wheel', disableScroll, { passive: false });
      window.addEventListener('keydown', disableArrowKeys);
    } else {
      document.body.style.overflow = 'auto';
      window.removeEventListener('wheel', disableScroll);
      window.removeEventListener('keydown', disableArrowKeys);
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('wheel', disableScroll);
      window.removeEventListener('keydown', disableArrowKeys);
    };
  }, [loading]);

  const handleSubmitUserData = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_PRODUCTION_SERVER_API}/client`, data);
      if (response.status === 200) toast.success('Message sent successfully');;
      console.log('Response:', response.data);
    } catch (error) {
      toast.error('Failed to send message');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    const userData = { ...data, clientIP }; // Include clientIP in the data
    console.log('Form Data:', userData);
    await handleSubmitUserData(userData);
    reset(); // Reset the form after submission
  };

  return (
    <div className="position-relative">
      {/* Loader */}
      {loading && <Loader />}

      <PageHeading
        title="Contact Us"
        bgSrc="/images/contact_hero_bg.jpeg"
        pageLinkText="Contact"
      />
      <Spacing lg="150" md="80" />

      <Div className="container">
        <Div className="row">
          <Div className="col-lg-6">
            <SectionHeading
              title="Do you have a project <br/>in your mind?"
              subtitle="Getting Touch"
            />
            <Spacing lg="55" md="30" />
            <ContactInfoWidget withIcon />
            <Spacing lg="0" md="50" />
          </Div>

          <Div className="col-lg-6">
            <form onSubmit={handleSubmit(onSubmit)} className="row g-3" autoComplete="off">
              {/* Full Name */}
              <Div className="col-md-6">
                <label className="form-label cs-primary_color">Full Name*</label>
                <input
                  type="text"
                  className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                  {...register('fullName', { required: 'Full Name is required' })}
                  autoComplete="off"
                />
                {errors.fullName && (
                  <div className="invalid-feedback">{errors.fullName.message}</div>
                )}
              </Div>

              {/* Email */}
              <Div className="col-md-6">
                <label className="form-label cs-primary_color">Email*</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Invalid email format',
                    },
                  })}
                  autoComplete="off"
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email.message}</div>
                )}
              </Div>

              {/* Project Type */}
              <Div className="col-md-6">
                <label className="form-label cs-primary_color">Project Type*</label>
                <select
                  className={`form-control ${errors.projectType ? 'is-invalid' : ''}`}
                  {...register('projectType', { required: 'Project Type is required' })}
                  autoComplete="off"
                >
                  <option value="">Select Project Type</option>
                  <option value="type1">Business Class</option>
                  {/* <option value="type2">Type 2</option> */}
                </select>
                {errors.projectType && (
                  <div className="invalid-feedback">{errors.projectType.message}</div>
                )}
              </Div>

              {/* Mobile */}
              <Div className="col-md-6">
                <label className="form-label cs-primary_color">Mobile*</label>
                <input
                  type="tel"
                  className={`form-control ${errors.mobile ? 'is-invalid' : ''}`}
                  {...register('mobile', {
                    required: 'Mobile is required',
                    pattern: {
                      value: /^[0-9]{10,15}$/,
                      message: 'Invalid mobile number',
                    },
                  })}
                  autoComplete="off"
                />
                {errors.mobile && (
                  <div className="invalid-feedback">{errors.mobile.message}</div>
                )}
              </Div>

              {/* Message */}
              <Div className="col-12">
                <label className="form-label cs-primary_color">Message</label>
                <textarea
                  className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                  rows="5"
                  {...register('message')}
                  autoComplete="off"
                ></textarea>
                {errors.message && (
                  <div className="invalid-feedback">{errors.message.message}</div>
                )}
              </Div>

              {/* Submit Button */}
              <Div className="col-12">
                <button
                  type="submit"
                  className="btn btn-primary d-flex align-items-center"
                  disabled={loading}
                >
                  <span className="me-2">Send Message</span>
                  <Icon icon="bi:arrow-right" />
                </button>
              </Div>
            </form>
          </Div>
        </Div>
      </Div>

      <Spacing lg="150" md="80" />
      <Div className="cs-google_map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3136.589958348911!2d89.5561272753076!3d22.813148479321107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa75b1dd1f2d9c62d%3A0xde2b5fa051ac001a!2sGalaxySpark%20%7C%20Best%20freelancing%20training%20center%20in%20Khulna!5e1!3m2!1sen!2sbd!4v1729848665996!5m2!1sen!2sbd"
          allowFullScreen
          title="Google Map"
        />
      </Div>
      <Spacing lg="50" md="40" />
    </div>
  );
}
