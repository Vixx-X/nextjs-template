import Loader from "@components/Loader";
import { ErrorMsg } from "@components/forms/ErrorMsg";
import { Form } from "@components/forms/Form";
import { PassField } from "@components/forms/PassField";
import { SERVER_URLS } from "@config";
import authStore from "@stores/AuthStore";
import { Field, FormikValues } from "formik";
import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";

const { URL_REGISTER, URL_PASSWORD_RESET } = SERVER_URLS;

interface SigninForm {
  password: string;
  username: string;
}

const LogIn: NextPage = () => {
  const [loading, setLoading] = useState(false);

  const login = authStore((state: any) => state.login);

  const initValues = {
    password: "",
    username: "",
  } as SigninForm;

  const handleSubmit = async (values: FormikValues, { setStatus }: any) => {
    setLoading(true);
    try {
      await login(values.username, values.password);
      setStatus({});
    } catch (exception: any) {
      setStatus(exception.data);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="rounded mb-4 w-[90%] max-w-[22rem] my-10 mb-14">
        <Form initialValues={initValues} onSubmit={handleSubmit}>
          <>
            <div className="divide-y">
              <div>
                <p className="font-light text-3xl xl:text-4xl mb-3 text-light">
                  Inicio de Sesión
                </p>
              </div>
              <div className="pt-4">
                <div className="mb-4">
                  <label
                    className="block text-sm xl:text-lg font-bold mb-2 text-light"
                    htmlFor="username"
                  >
                    Nombre de usuario
                  </label>
                  <Field
                    label="Nombre de usuario"
                    name="username"
                    id="username"
                    className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Username"
                  />
                </div>
                <ErrorMsg name="username" />
                <div className="mb-6">
                  <label
                    className="block text-sm xl:text-lg font-bold mb-2 text-light"
                    htmlFor="password"
                  >
                    Contraseña
                  </label>
                  <PassField
                    label="Contraseña"
                    id="password"
                    name="password"
                    className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Password"
                  />
                </div>
                <ErrorMsg name="password" />
              </div>
            </div>
            <ErrorMsg name="detail" />
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full"
              >
                <p>Iniciar Sesion</p>
              </button>
            </div>

            {loading && <Loader />}
          </>
        </Form>

        <Link href={URL_PASSWORD_RESET}>
          <a className="inline-block w-full align-baseline font-bold text-sm xl:text-lg  mt-4 text-light hover:text-primary text-right">
            ¿Olvido su contraseña?
          </a>
        </Link>
        <Link href={URL_REGISTER}>
          <a className="inline-block w-full align-baseline font-bold text-sm xl:text-lg text-light hover:text-primary text-right">
            ¿No tiene aun una cuenta?
          </a>
        </Link>
      </div>
    </>
  );
};

export default LogIn;
