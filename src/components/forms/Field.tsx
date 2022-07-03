import { classNames } from "@utils/classNames";
import { Field as FField, useFormikContext } from "formik";
import { useMemo } from "react";

const defaultOnChange = (callback: Function) => {
  return callback;
};

export const Field = ({ children, onChangeCallback, ...props }: Props) => {
  if (!onChangeCallback) onChangeCallback = defaultOnChange;

  const { status, handleChange /*, errors */ } = useFormikContext();
  const hasError = useMemo(
    () => status?.[props.name] /* || errors?.[props.name]*/,
    [status, props.name /*, errors*/]
  );

  return (
    <FField
      className={classNames(
        props?.className ??
          "bg-white border border-gray-300 focus:outline-none placeholder-gray-500 text-xs lg:text-sm rounded-md px-4 py-3 w-full focus:text-gray-800 text-gray-600 pl-4 pr-10 py-2 focus:border-1",
        hasError
          ? "focus:border-red-300 focus:ring-red-300"
          : "focus:border-gray-300 focus:ring-gray-300"
      )}
      onChange={onChangeCallback(handleChange)}
      {...props}
    >
      {children}
    </FField>
  );
};

export default Field;
