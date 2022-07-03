import { Form as FForm, Formik, FormikConfig, FormikValues } from 'formik';

export const Form = ({
  children,
  initialValues,
  onSubmit,
  ...props
}: FormikConfig<FormikValues>) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
      {...props}
    >
      <FForm>{children}</FForm>
    </Formik>
  );
};

export default Form;
