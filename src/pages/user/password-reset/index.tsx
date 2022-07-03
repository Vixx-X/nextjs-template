import Loader from "@components/Loader";
import ErrorMsg from "@components/forms/ErrorMsg";
import Form from "@components/forms/Form";
import { postResetPassword } from "@fetches/user";
import { Field } from "formik";
import type { NextPage } from "next";
import { useState } from "react";

interface PasswordResetForm {
  email: string;
}

const PasswordReset: NextPage = () => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const initValues = {
    email: "",
  } as PasswordResetForm;

  const handleSubmit = async (values: any, { setStatus }: any) => {
    setLoading(true);
    try {
      await postResetPassword(values);
      setStatus(null);
      setSuccess(true);
    } catch (exception: any) {
      setStatus(exception.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="rounded mb-4 w-[90%] max-w-[22rem] my-10 mb-14">
        {success ? (
          <div className="divide-y">
            <div>
              <p className="font-light text-3xl mb-3 text-light">
                Olvido de contraseña
              </p>
            </div>
            <p className="text-light mb-4">
              Revisa tu correo, te enviamos un link para poder cambiar tu
              contraseña.
            </p>
          </div>
        ) : (
          <Form initialValues={initValues} onSubmit={handleSubmit}>
            <>
              <div className="divide-y">
                <div>
                  <p className="font-light text-3xl mb-3 text-light">
                    Olvido de contraseña
                  </p>
                </div>
                <div className="pt-4">
                  <div className="mb-4">
                    <label
                      className="block text-sm xl:text-lg font-bold mb-2 text-light"
                      htmlFor="email"
                    >
                      Correo electrónico
                    </label>
                    <Field
                      type="email"
                      label="Correo electrónico"
                      name="email"
                      id="email"
                      className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Email"
                    />
                  </div>
                  <ErrorMsg name="email" />
                  <p className="text-light mb-4">
                    Por favor ingresar su correo electronico. Recibirás via
                    correo un link para crear una nueva contraseña
                  </p>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full"
                >
                  <p>Enviar</p>
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

export default PasswordReset;
