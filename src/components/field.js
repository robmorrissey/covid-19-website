import React from "react";
import { Field as FormikField, ErrorMessage } from "formik";
import { FormControl, FormLabel, Input, FormHelperText } from "@chakra-ui/core";
import camelCase from 'lodash/camelCase';
import kebabCase from 'lodash/kebabCase';

const formControlProps = {
  marginBottom: 50,
}
const validateRequired = (v) => v ? null : 'Required';

const Field = ({ label, type, isRequired, helperText }) => {
  const id = kebabCase(label);
  const key = camelCase(label);
  const helperTextId = id + '-helper-text';

  const validate = isRequired ? validateRequired : null;

  return <FormikField name={key} validate={validate}>
    {({ field, form }) => {
      const isInvalid = form.errors[key] && form.touched[key];

      return <FormControl
        isInvalid={isInvalid}
        isRequired={isRequired}
        {...formControlProps}
      >
        <FormLabel htmlFor={id}>{label}</FormLabel>
        {helperText && <FormHelperText id={helperTextId} marginBottom={3}>{helperText}</FormHelperText>}
        <Input {...field} id={id} type={type}></Input>

        {isInvalid && <ErrorMessage name={key} />}
      </FormControl>
    }}
  </FormikField>;
};

export default Field;