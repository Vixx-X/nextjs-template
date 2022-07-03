import { useState } from 'react';

import type { NextPage } from 'next';

import Loader from '@components/Loader';
import ErrorMsg from '@components/forms/ErrorMsg';
import Field from '@components/forms/Field';
import Form from '@components/forms/Form';
import PassField from '@components/forms/PassField';
import Select from '@components/forms/Select';

import { postRegisterUser } from '@fetches/user';

import authStore from '@stores/AuthStore';

import { FormikValues } from 'formik';

interface SignupForm {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password1: string;
  password2: string;
  tel: string;
  number: number;
  typeOfDocumentID: string;
}

const TypeOfDocumentIDChoices = [
  { value: 'V', text: 'V' },
  { value: 'J', text: 'J' },
  { value: 'E', text: 'E' },
];

const Registro: NextPage = () => {
  const [loading, setLoading] = useState(false);

  const login = authStore((state: any) => state.login);

  const initValues: SignupForm = {
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password1: '',
    password2: '',
    tel: '',
    number: 0,
    typeOfDocumentID: 'v',
  };

  const handleSubmit = async (values: FormikValues, { setStatus }: any) => {
    setLoading(true);
    try {
      await postRegisterUser({
        ...values,
        document_id: `${values.typeOfDocumentID}-${values.number}`,
      });
      await login(values.username, values.password1);
      setStatus({});
    } catch (exception: any) {
      setStatus(exception.data);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="rounded mb-4 w-[90%] max-w-[60rem] my-10 mb-14">
        <Form initialValues={initValues} onSubmit={handleSubmit}>
          <>
            <div className="divide-y">
              <div>
                <p className="font-light text-3xl xl:text-4xl mb-3 text-light">
                  Registro
                </p>
              </div>
              <div className="pt-4 grid sm:grid-cols-2 gap-x-8 justify-center">
                <div className="mb-4">
                  <label
                    className="block text-sm xl:text-lg font-bold mb-2 text-light"
                    htmlFor="name"
                  >
                    Nombre
                  </label>
                  <Field
                    label="Nombre"
                    name="first_name"
                    id="name"
                    className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Nombre"
                  />
                  <ErrorMsg name="first_name" />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm xl:text-lg font-bold mb-2 text-light"
                    htmlFor="lastname"
                  >
                    Apellido
                  </label>
                  <Field
                    label="Apellido"
                    name="last_name"
                    id="lastname"
                    className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Apellido"
                  />
                  <ErrorMsg name="last_name" />
                </div>
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
                  <ErrorMsg name="username" />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm xl:text-lg font-bold mb-2 text-light"
                    htmlFor="email"
                  >
                    Correo
                  </label>
                  <Field
                    type="email"
                    label="Correo electrónico"
                    name="email"
                    id="email"
                    className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="E-mail"
                  />
                  <ErrorMsg name="email" />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm xl:text-lg font-bold mb-2 text-light"
                    htmlFor="password"
                  >
                    Contraseña
                  </label>
                  <PassField
                    label="Contraseña"
                    id="password"
                    name="password1"
                    className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Password"
                  />
                  <ErrorMsg name="password1" />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm xl:text-lg font-bold mb-2 text-light"
                    htmlFor="passwordConfirm"
                  >
                    Confirmar contraseña
                  </label>
                  <PassField
                    label="Confirmar contraseña"
                    id="passwordConfirm"
                    name="password2"
                    className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Confirmar contraseña"
                  />
                  <ErrorMsg name="password2" />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm xl:text-lg font-bold mb-2 text-light"
                    htmlFor="passwordConfirm"
                  >
                    Teléfono
                  </label>
                  <Field
                    type="tel"
                    label="Teléfono"
                    id="tel"
                    name="tel"
                    className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Teléfono"
                  />
                  <ErrorMsg name="tel" />
                </div>
                <div className="grid grid-cols-2 gap-x-4">
                  <div className="mb-4">
                    <label
                      className="block text-sm xl:text-lg font-bold mb-2 text-light"
                      htmlFor="type"
                    >
                      Tipo de identificación
                    </label>
                    <Select
                      as="select"
                      id="typeOfDocumentID"
                      className="form-select appearance-none block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      name="typeOfDocumentID"
                      placeholder="--Seleccionar--"
                      choices={TypeOfDocumentIDChoices}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-sm xl:text-lg font-bold mb-2 text-light"
                      htmlFor="idNumber"
                    >
                      Número de identificación
                    </label>
                    <Field
                      className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="idNumber"
                      type="number"
                      name="number"
                      placeholder="Ej: 5555555"
                    />
                    <ErrorMsg name="number" />
                  </div>
                </div>
                <div></div>
                <ErrorMsg name="non_field_errors" />
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className=" w-full md:w-[55%] bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              >
                <p>Registrarse</p>
              </button>
            </div>
            {loading && <Loader />}
          </>
        </Form>
      </div>
    </>
  );
};
export default Registro;
