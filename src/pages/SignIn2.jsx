// import { useState } from "react"; // 1. Import useState to store form inputs
// import { useUser } from "../context/UserContext.jsx"; // 2. Import our custom hook to access signIn function
// import { useNavigate } from "react-router-dom"; // 3. Import useNavigate so we can redirect after login

function SignIn() { // 4. This is the SignIn component
  const { signIn } = useUser(); // 5. Get the signIn function from UserContext
  const navigate = useNavigate(); // 6. Get navigate function to change pages

  const [form, setForm] = useState({ email: "", password: "" }); // 7. State for the form. Only email + password needed for sign in
  const [message, setMessage] = useState(""); // 8. State for success/error messages

  function handleChange(e) { // 9. Runs every time user types in an input
    setForm({ ...form, [e.target.name]: e.target.value }); // 10. Update just the field that changed. name="email" or name="password"
  }

  function handleSubmit(e) { // 11. Runs when user clicks Sign In button
    e.preventDefault(); // 12. Stop page from refreshing
    const result = signIn(form.email, form.password); // 13. Call signIn from context. Pass email + password
    setMessage(result.message); // 14. Show the message that came back: "Welcome Sam" or "Invalid credentials"
    
    if (result.success) { // 15. If login worked
      setTimeout(() => navigate("/"), 1000); // 16. Wait 1 second, then go to Home page
    }
  }

  return ( // 17. Return the JSX form
    <div>
      <h2>Sign In</h2> {/* 18. Page title */}
      <form onSubmit={handleSubmit}> {/* 19. When form is submitted, run handleSubmit */}
        
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          onChange={handleChange} 
          required 
        /> {/* 20. Email input. name="email" must match form.email */}
        <br />

        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          onChange={handleChange} 
          required 
        /> {/* 21. Password input. type="password" hides the text */}
        <br />

        <button type="submit">Sign In</button> {/* 22. Submit button */}
      </form>
      <p>{message}</p> {/* 23. Show success or error message here */}
    </div>
  );
}

// export default SignIn; // 24. Export so App.jsx can import it