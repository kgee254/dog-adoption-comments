import { useState } from "react";
import useForm from "../hooks/useForm.js"; // 1. Import hook
import { useUser } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
 
function SignIn() {
  const { signIn } = useUser();
  const navigate = useNavigate();
  const [form, handleChange, resetForm] = useForm({ email: "", password: "" }); // 2. Use hook
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const result = signIn(form.email, form.password);
    setMessage(result.message);
    if (result.success) {
      resetForm(); // 3. Clear form
      setTimeout(() => navigate("/"), 1000);
    }
  }

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <br />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <br />
        <button type="submit">Sign In</button>
      </form>
      <p>{message}</p>
      <p style={{ marginTop: "10px" }}> {/* 2. Add some spacing */}
        <Link to="/admin-login">Are you an administrator?</Link> {/* 3. Link to admin login */}
      </p>
    </div>
  );
}

export default SignIn;