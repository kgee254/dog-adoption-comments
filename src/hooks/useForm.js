import { useState } from "react"; // 1. Import useState

export default function useForm(initialValues) { // 2. Export default. Takes initial form values object
  const [form, setForm] = useState(initialValues); // 3. State to hold all form fields

  function handleChange(e) { // 4. This function updates any input
    setForm({ ...form, [e.target.name]: e.target.value }); // 5. ...form copies old values. [e.target.name] updates just the one that changed
  }

  function resetForm() { // 6. Optional: function to clear form
    setForm(initialValues);
  }

  return [form, handleChange, resetForm]; // 7. Return everything as an array so we can destructure it
} 