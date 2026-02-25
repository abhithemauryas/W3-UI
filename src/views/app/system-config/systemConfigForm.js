import ReactSelectComponent from 'components/common/ReactSelect';
import { unitEnum } from 'constants/constants';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Switch from 'rc-switch';
import { useEffect, useState } from 'react';
import { Button, FormGroup, Label } from 'reactstrap';
import * as Yup from 'yup';

const initialValues = {
  value: '',
  unit: '',
  status: true,
};

const validationSchema = Yup.object().shape({
  value: Yup.string()
    .matches(/^[1-9]\d*$/, 'Enter a positive number')
    .required('value is required'),
  unit: Yup.object().required('Type is required'),
});

const SystemConfigForm = ({
  airdropConfig,
  updateSystemConfigHandler,
  systemConfigLoading,
  disableType,
}) => {
  const [formValues, setFormValues] = useState(initialValues);

  const handleSubmit = (values, { setSubmitting }) => {
    const data = {
      value: Number(values.value),
      unit: values.unit.value,
      status: Boolean(values.status),
    };
    setSubmitting(false);
    updateSystemConfigHandler(
      { id: airdropConfig?.id, system_name: airdropConfig?.system_name },
      data,
      () => {
        setSubmitting(false);
      }
    );
  };

  useEffect(() => {
    setFormValues({
      status: airdropConfig?.status || '',
      value: airdropConfig?.value || '',
      unit: airdropConfig?.unit
        ? { label: airdropConfig?.unit, value: airdropConfig?.unit }
        : '',
    });
  }, [airdropConfig?.id]);

  return (
    <Formik
      initialValues={formValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ isSubmitting, setFieldValue, values }) => (
        <Form>
          <FormGroup>
            <Label for="unit">Type</Label>
            <Field
              name="unit"
              value={values.unit}
              component={ReactSelectComponent}
              placeholder="Select a Type"
              onChange={(selectedOption) =>
                setFieldValue('unit', selectedOption)
              }
              options={unitEnum}
              className="custom-select-container"
              classNamePrefix="custom-select"
              isDisabled={disableType || !values?.status}
            />
            <ErrorMessage name="unit" component="div" className="field-error" />
          </FormGroup>
          <FormGroup>
            <Label for="value">Value</Label>
            <Field
              type="text"
              id="value"
              name="value"
              className="form-control"
              disabled={!values?.status}
            />
            <ErrorMessage
              name="value"
              component="div"
              className="field-error"
            />
          </FormGroup>

          <FormGroup>
            <Label for="status">Is Active</Label>
            <Switch
              className="mx-2 custom-switch custom-switch-primary custom-switch-small"
              checked={values?.status}
              onChange={(value) => setFieldValue('status', value)}
              name="status"
            />
          </FormGroup>

          <Button
            className={`btn-multiple-state ${
              systemConfigLoading || isSubmitting ? 'show-spinner' : ''
            }`}
            disabled={systemConfigLoading || isSubmitting}
            color="primary"
            type="submit"
          >
            <span className="spinner d-inline-block">
              <span className="bounce1" />
              <span className="bounce2" />
              <span className="bounce3" />
            </span>
            <span className="label">Save</span>
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SystemConfigForm;
