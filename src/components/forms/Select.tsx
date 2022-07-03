import { Field } from "./Field";

interface SelectProps extends Props {
  placeholder: string;
  choices: { value: string; text: string }[];
}

export const Select = ({ choices, placeholder, ...props }: SelectProps) => {
  return (
    <Field as="select" {...props}>
      <>
        <option disabled>{placeholder ?? "--Seleccionar--"}</option>
        {choices?.map(({ value, text }: any, index: number) => (
          <option value={value} key={index}>
            {text}
          </option>
        ))}
      </>
    </Field>
  );
};

export default Select;
