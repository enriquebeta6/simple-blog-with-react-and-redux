import React from 'react'
import { Field, reduxForm } from 'redux-form'

const validate = values => {
  const errors = {}

  if (!values.email) {
    errors.email = 'Requerido'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Email Invalido.'
  }

  if (!values.password) {
    errors.password = 'Requerido'
  } else if (values.password.length < 6) {
    errors.password = 'La contrasena debe tener minimo 6 caracteres.'
  }

  return errors
}

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error}
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

const LoginFormFinal = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="email" 
        type="email" 
        component={renderField} 
        label="Email" 
      />
      
      <Field 
        name="password" 
        type="password" 
        component={renderField} 
        label="Password" 
      />
      
      <div>
        <button 
          type="submit" 
          disabled={submitting}
        >
          Submit
        </button>
        
        <button 
          type="button" 
          disabled={pristine || submitting} 
          onClick={reset}
        >
          Clear Values
        </button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'LoginFormFinal', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
})(LoginFormFinal)