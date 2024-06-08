import React from "react";
import Select from "react-select";

const MultiSelectInput = ({ options, onChange, value, placeholder }) => {
  const formattedOptions = options.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  return (
    <Select
      isMulti
      options={formattedOptions}
      onChange={onChange}
      value={value}
      placeholder={`Select ${placeholder}`}
    />
  );
};

export default MultiSelectInput;
