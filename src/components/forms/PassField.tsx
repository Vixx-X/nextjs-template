import React, { useState } from 'react';

import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { Field } from './Field';

export const PassField = (props: Props) => {
  const [fieldType, setFieldType] = useState('password');

  const togglePass = () => {
    fieldType === 'password' ? setFieldType('text') : setFieldType('password');
  };

  return (
    <>
      <div className="relative w-full h-full">
        <Field type={fieldType} {...props}></Field>
        <span
          className="absolute flex justify-center h-full right-3 cursor-pointer"
          onClick={togglePass}
        >
          {fieldType === 'text' ? (
            <FaEyeSlash size={25} />
          ) : (
            <FaEye size={25} />
          )}
        </span>
      </div>
    </>
  );
};

export default PassField;
