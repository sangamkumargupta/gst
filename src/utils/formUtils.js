// src/utils/formUtils.js

/**
 * Generate initial form values from schema
 */
export const generateInitialValues = (formSchema) => {
  return formSchema.reduce((acc, field) => {
    acc[field.name] = '';
    return acc;
  }, {});
};

/**
 * Validate form fields
 */
export const validateFields = (formSchema, values) => {
  const errors = {};
  formSchema.forEach(field => {
    if (!values[field.name]) {
      errors[field.name] = `${field.label} is required`;
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
 * Handle save (for drafts etc.)
 */
export const handleSave = (values) => {
  console.log('Save triggered with data:', values);
  alert('Save logic not implemented yet');
};
