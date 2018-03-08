import React from 'react'
import { Field, reduxForm } from 'redux-form'

const validate = values => {
  const errors = {}
  
  if (!values.title) {
    errors.title = 'Requerido';
  } else if (values.title.length < 10) {
    errors.title = 'Must be 10 characters or more.';
  } else if (values.title.length > 30) {
    errors.title = 'Must be 30 characters or less.';
  }

  if (!values.content) {
    errors.content = 'Requerido';
  } else if (values.content.length < 50) {
    errors.content = 'Must be 50 characters or more.';
  } else if (values.content.length > 300) {
    errors.content = 'Must be 300 characters or less.';
  }

  return errors
}

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched &&
        (error && <span>{error}</span>)}
    </div>
  </div>
)

const renderTextArea = ({
  input,
  label,
  type,
  meta: { touched, error }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <textarea {...input} placeholder={label} type={type}>
      </textarea>
      {touched &&
        (error && <span>{error}</span>)}
    </div>
  </div>
)

const CrearPostForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="title"
        type="text"
        component={renderField}
        label="Title"
      />

      <Field 
        name="content" 
        type="text" 
        component={renderTextArea} 
        label="Content" 
      />
      
      <div>
        <button type="submit" disabled={submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'crearPostForm', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
})(CrearPostForm)