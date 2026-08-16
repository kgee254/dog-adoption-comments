import { useState } from "react"; // 1. Keep for message state
import useForm from "../hooks/useForm.js"; // 2. Import our custom hook
import { useUser } from "../context/UserContext.jsx"; // 3. Import context
import { useNavigate } from "react-router-dom"; // 4. Import navigate
 
function SignUp() { // 5. SignUp component
  const { signUp } = useUser(); // 6. Get signUp function
  const navigate = useNavigate(); // 7. Get navigate function
  const [form, handleChange, resetForm] = useForm({ firstName: "", lastName: "", email: "", password: "" }); // 8. Use custom hook instead of useState. Pass initial values
  const [message, setMessage] = useState(""); // 9. Keep separate state for messages

  function handleSubmit(e) { // 10. Runs on submit
    e.preventDefault(); // 11. Stop refresh
    const result = signUp(form); // 12. Pass whole form object to signUp
    setMessage(result.message); // 13. Show message
    if (result.success) { // 14. If success
      resetForm(); // 15. Clear the form using hook
      setTimeout(() => navigate("/signin"), 1000); // 16. Go to signin
    }
  }

  return ( // 17. JSX
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required />
        <br />
        <input type="text" name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required />
        <br />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <br />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <br />
        <button type="submit">Sign Up</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default SignUp; // 18. Export