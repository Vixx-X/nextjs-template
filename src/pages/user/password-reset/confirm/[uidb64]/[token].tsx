import { useState } from 'react';

import Link from 'next/link';

import Loader from '@components/Loader';
import ErrorMsg from '@components/forms/ErrorMsg';
import Form from '@components/forms/Form';
import PassField from '@components/forms/PassField';

import { SERVER_URLS } from '@config';

import {
  getResetPasswordConfirm,
  postResetPasswordConfirm,
} from '@fetches/user';

const { URL_PASSWORD_RESET } = SERVER_URLS;

interface PasswordResetConfirmFormData {
  new_password1: string;
  new_password2: string;
}

interface PasswordResetConfirmProps {
  uidb64: string;
  token: string;
  invalid_link: string;
}

const PasswordResetConfirm = ({
  uidb64,
  token,
  invalid_link,
}: PasswordResetConfirmProps) => {
  const [loading, setLoading] = useState(false);

  const initValues = {
    new_password1: '',
    new_password2: '',
  } as PasswordResetConfirmFormData;

  const handleSubmit = async (values: any, { setStatus }: any) => {
    setLoading(true);
    try {
      await postResetPasswordConfirm(values, uidb64, token);
    } catch (exception: any) {
      setStatus(exception.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="rounded mb-4 w-[90%] max-w-[22rem] my-10 mb-14">
        {invalid_link ? (
          <div className="divide-y">
            <div>
              <p className="font-light text-3xl mb-3 text-light">
                Resetear contraseña
              </p>
            </div>
            <p className="text-light mb-4">
              El link ha expirado o es invalido, vuelve a mandar el correo{' '}
              <Link href={URL_PASSWORD_RESET}>
                <a className="hover:underline">aquí</a>
              </Link>
              .
            </p>
          </div>
        ) : (
          <Form initialValues={initValues} onSubmit={handleSubmit}>
            <>
              <div className="divide-y">
                <div>
                  <p className="font-light text-3xl mb-3 text-light">
                    Resetear contraseña
                  </p>
                </div>
                <div className="pt-4">
                  <div className="mb-4">
                    <label
                      className="block text-sm xl:text-lg font-bold mb-2 text-light"
                      htmlFor="new_password1"
                    >
                      Contraseña Nueva
                    </label>
                    <PassField
                      label="new_password1"
                      name="new_password1"
                      id="new_password1"
                      className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Contraseña Nueva"
                    />
                    <ErrorMsg name="new_password1" />
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-sm xl:text-lg font-bold mb-2 text-light"
                      htmlFor="new_password2"
                    >
                      Confirmar Contraseña Nueva
                    </label>
                    <PassField
                      label="new_password2"
                      name="new_password2"
                      id="new_password2"
                      className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Confirmar Contraseña Nueva"
                    />
                    <ErrorMsg name="new_password2" />
                  </div>
                </div>
              </div>
              <ErrorMsg name="non_field_errors" />
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full"
                >
                  <p>Cambiar contraseña</p>
                </button>
              </div>
              {loading && <Loader />}
            </>
          </Form>
        )}
      </div>
    </>
  );
};

export default PasswordResetConfirm;

export async function getServerSideProps({ params }: any) {
  try {
    const data = await getResetPasswordConfirm(params.uidb64, params.token);
    return {
      props: {
        invalid_link: data?.invalid_link,
        ...params,
      },
    };
  } catch (error) {
    return {};
  }
}
