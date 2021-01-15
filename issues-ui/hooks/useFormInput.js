import { useState } from 'react';

export default function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  function handleChange(e) {
    setValue(e.target.value);
  }

  function reset() {
    setValue(initialValue);
  }

  return {
    value,
    handleChange,
    reset,
  };
}
