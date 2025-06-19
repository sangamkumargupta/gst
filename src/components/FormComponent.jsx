
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  generateInitialValues,
  validateFields,
  handleSubmit,
} from "../utils/formUtils";
import formSchema from "../forms/form.json";
import submitButton from "../buttons/button.json";

const formTitle = formSchema.find(f => f.formTitle)?.formTitle || "Submit Your Info";
const formFields = formSchema.filter(f => !f.formTitle);

const initialValues = generateInitialValues(formFields);

const FormComponent = () => (
  <div className="container my-5">
    <div className="row justify-content-center">
      <div className="col-12 col-md-10 col-lg-8">
        <div className="card shadow-sm p-4">
          <h2 className="text-center mb-4">{formTitle}</h2>

          <Formik
            initialValues={initialValues}
            validate={(values) => validateFields(formFields, values)}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, resetForm }) => (
              <Form>
                <div className="row">
                  {formFields.map((field, index) => (
                    <div
                      key={index}
                      className={`col-12 col-md-6 mb-3 ${
                        field.fullWidth ? "col-md-12" : ""
                      }`}
                    >
                      <label htmlFor={field.name} className="form-label">
                        {field.label}
                      </label>

                      {field.type !== "select" ? (
                        <Field
                          type={field.type}
                          name={field.name}
                          placeholder={field.placeholder}
                          className="form-control"
                        />
                      ) : (
                        <Field
                          as="select"
                          name={field.name}
                          className="form-select"
                        >
                          <option value="" disabled>
                            Select an option
                          </option>
                          {field.options.map((opt, idx) => (
                            <option key={idx} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </Field>
                      )}

                      <ErrorMessage
                        name={field.name}
                        component="div"
                        className="text-danger mt-1"
                      />
                    </div>
                  ))}
                </div>

                <div className="text-center mt-4">
                  {/* SUBMIT BUTTON */}
                  <button
                    type="submit"
                    className={`btn btn-${submitButton?.variant || "primary"} px-4 py-2`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : submitButton?.label || "Submit"}
                  </button>

                  &nbsp;

                  {/* RESET BUTTON */}
                  <button
                    type="button"
                    className="btn btn-secondary px-4 py-2"
                    onClick={resetForm}
                    disabled={isSubmitting}
                  >
                    Reset
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  </div>
);

export default FormComponent;
