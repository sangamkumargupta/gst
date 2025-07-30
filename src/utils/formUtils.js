// src/utils/formUtils.js

/**
 * Generate initial form values from schema
 */
export const generateInitialValues = (formSchema) => {
  return formSchema.reduce((acc, field) => {
    acc[field.name] = field.type === "checkbox" ? false : "";
    return acc;
  }, {});
};

/**
 * Validate form fields
 */
export const validateFields = (formSchema, values) => {
  const errors = {};
console.log('valus',values);
  formSchema.forEach(field => {
    const value = values[field.name];
    
    if (field.required) {
      if (field.type === "checkbox") {
        if (!value) {
          errors[field.name] = `${field.label} must be accepted`;
        }
      } else {
        if (!value || value.trim() === '') {
          errors[field.name] = `${field.label} is required`;
        }
      }
    }

    // Additional basic validation (optional)
    if (field.type === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errors[field.name] = `Invalid email format`;
      }
    }
  });

  return errors;
};

/**
 * Handle submit
 */
export const handleSubmit = (values, { setSubmitting, resetForm }) => {
  console.log('Submitted Data:', values);
  alert('Form submitted successfully!');
  setSubmitting(false);
  resetForm();
};

/**
 * Handle edit
 */
export const handleEdit = (values) => {
  console.log('Edit triggered with data:', values);
  alert('Edit logic not implemented yet');
};

/**
 * Handle delete
 */
export const handleDelete = (values) => {
  console.log('Delete triggered with data:', values);
  alert('Delete logic not implemented yet');
};

/**
 * Handle save
 */
export const handleSave = (values) => {
  console.log('Save triggered with data:', values);
  alert('Save logic not implemented yet');
};
