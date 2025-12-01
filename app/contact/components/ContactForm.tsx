'use client';

import { useState } from 'react';
import { submitContactForm } from '@/app/actions/submitContactForm';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  message: string;
  preferredContact: 'call' | 'text' | 'email' | '';
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  message?: string;
  preferredContact?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    message: '',
    preferredContact: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    if (!formData.preferredContact) {
      newErrors.preferredContact = 'Please select a preferred contact method';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitContactForm({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        preferredContact: formData.preferredContact as 'call' | 'text' | 'email',
      });

      if (result.success) {
        setSubmitSuccess(true);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          message: '',
          preferredContact: '',
        });
        setErrors({});

        setTimeout(() => setSubmitSuccess(false), 10000);
      } else {
        alert(result.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Success Message */}
      {submitSuccess && (
        <div className="p-3 rounded-lg bg-green-50 border border-green-200">
          <p className="text-green-800 text-center text-sm font-medium">
            Thank you! We've received your message and will get back to you soon.
          </p>
        </div>
      )}

      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-semibold text-gray-900 mb-1.5">
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className={`w-full px-3 py-2.5 rounded-lg border ${
            errors.fullName
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
          } focus:ring-2 focus:outline-none transition-all text-gray-900 placeholder:text-gray-400`}
          placeholder="John Doe"
        />
        {errors.fullName && (
          <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>
        )}
      </div>

      {/* Email & Phone - Two Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-1.5">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-2.5 rounded-lg border ${
              errors.email
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
            } focus:ring-2 focus:outline-none transition-all text-gray-900 placeholder:text-gray-400`}
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-1.5">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-3 py-2.5 rounded-lg border ${
              errors.phone
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
            } focus:ring-2 focus:outline-none transition-all text-gray-900 placeholder:text-gray-400`}
            placeholder="(123) 456-7890"
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
          )}
        </div>
      </div>

      {/* Preferred Contact Method */}
      <div>
        <label htmlFor="preferredContact" className="block text-sm font-semibold text-gray-900 mb-1.5">
          Preferred Method of Communication
        </label>
        <select
          id="preferredContact"
          name="preferredContact"
          value={formData.preferredContact}
          onChange={handleChange}
          className={`w-full px-3 py-2.5 rounded-lg border ${
            errors.preferredContact
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
          } focus:ring-2 focus:outline-none transition-all text-gray-900 bg-white`}
        >
          <option value="">Select a method</option>
          <option value="call">Phone Call</option>
          <option value="text">Text Message</option>
          <option value="email">Email</option>
        </select>
        {errors.preferredContact && (
          <p className="mt-1 text-xs text-red-600">{errors.preferredContact}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-1.5">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className={`w-full px-3 py-2.5 rounded-lg border ${
            errors.message
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
          } focus:ring-2 focus:outline-none transition-all text-gray-900 placeholder:text-gray-400 resize-none`}
          placeholder="Tell us about your custom trailer project..."
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-600">{errors.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Sending...
          </span>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  );
}
