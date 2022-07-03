import { useState } from 'react';

import Loader from '@components/Loader';
import ErrorMsg from '@components/forms/ErrorMsg';
import Field from '@components/forms/Field';
import Form from '@components/forms/Form';

import { postOTPRequest } from '@fetches/user';

interface OTPFormProps extends Props {
  sendFormData: Function;
  initValues: any;
  openOTP: boolean;
  toggleOTP: Function;
  expiredTime: number;
  setExpiredTime: Function;
}

let intervalTimer: number;

const OTPForm = ({
  sendFormData,
  initValues,
  openOTP,
  toggleOTP,
  children,
  expiredTime,
  setExpiredTime,
}: OTPFormProps) => {
  const [loading, setLoading] = useState(false);

  const [metaData, setMetaData] = useState({});

  const _handleSubmit = async (values: any, { setStatus }: any) => {
    setLoading(true);
    try {
      await sendFormData({ ...values, ...metaData });
      clearInterval(intervalTimer);
    } catch (exception: any) {
      const info = exception.info;
      if (!Object.prototype.hasOwnProperty.call(info, 'token')) {
        toggleOTP(false);
      }
      setStatus(exception.data);
    } finally {
      setLoading(false);
    }
  };

  const _handleClick = async (values: any, { setStatus }: any) => {
    try {
      const dataJson = await postOTPRequest(values);
      setMetaData(dataJson);
      const expire = Math.round(new Date(dataJson.expire).getTime() / 1000);
      intervalTimer = window.setInterval(() => {
        const diff = expire - Math.round(Date.now() / 1000);
        if (diff < 0) {
          clearInterval(intervalTimer);
          setExpiredTime(0);
        } else {
          setExpiredTime(diff);
        }
      }, 1000);

      toggleOTP(true);
    } catch (exception: any) {
      setStatus(exception.data);
    }
  };

  const handleSubmit = async (values: any, actions: any) => {
    if (!openOTP) {
      _handleClick(values, actions);
      actions.setTouched({});
      actions.setSubmitting(false);
      return;
    }
    if (expiredTime == 0) {
      toggleOTP(false);
      return;
    }
    _handleSubmit(values, actions);
  };

  return (
    <Form initialValues={initValues} onSubmit={handleSubmit}>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col items-center justify-center mb-20">
          {openOTP ? (
            <>
              <div className="my-3 lg:w-96 w-full">
                <Field placeholder="Token" name="token" type="text" />
              </div>
              <ErrorMsg name="token" />
              <button
                type="submit"
                className="bg-primary-new rounded-md py-3 text-white font-extrabold w-full lg:w-96 primary"
              >
                {expiredTime == 0 ? 'Atras' : 'Enviar'}
              </button>
            </>
          ) : (
            <>{children}</>
          )}
        </div>
      )}
    </Form>
  );
};

export default OTPForm;
