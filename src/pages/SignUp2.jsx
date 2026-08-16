// import { useState } from "react"; // 1. useState: lets us store form input values in component memory
// import { useNavigate } from "react-router-dom"; // 2. useNavigate: lets us redirect to another page after signup
// import { useUser } from "../context/UserContext.jsx"; // 3. useUser: our custom hook to access signUp() from UserContext
// import useForm from "../hooks/useForm.js"; // 4. useForm: Person C's hook to handle form inputs and validation

function SignUp() { // 5. Define the SignUp component. This is the page at /signup
  const navigate = useNavigate(); // 6. Save the navigate function so we can use navigate("/signin") later
  const { signUp } = useUser(); // 7. Grab only the signUp function from UserContext

  // 8. useForm takes initial values and a submit function. It returns values, errors, handleChange, handleSubmit
  const { values, errors, handleChange, handleSubmit } = useForm(
    { firstName: "", email: "", password: "" }, // 9. Initial form state. Empty by default
    submitForm // 10. Function to run when form is submitted and valid
  );

  function submitForm() { // 11. This runs AFTER useForm validates that fields are not empty
    const result = signUp(values); // 12. Call signUp from context. Pass the whole values object {firstName, email, password}
    
    if (result.success) { // 13. If signUp returned success: true
      alert(result.message); // 14. Show "Sign up successful" to user
      navigate("/signin"); // 15. Redirect to signin page as per your flow diagram
    } else { // 16. If signUp returned success: false. Ex: email already exists
      alert(result.message); // 17. Show "User already exists"
    }
  }

  return ( // 18. This is what gets rendered on the screen
    <div> {/* 19. Wrapper div */}
      <h2>Sign Up</h2> {/* 20. Page title */}

      <form onSubmit={handleSubmit}> {/* 21. form. onSubmit calls handleSubmit from useForm */}
        
        <div> {/* 22. Group for firstName input */}
          <label>First Name:</label> {/* 23. Label for accessibility */}
          <input // 24. Input field
            type="text" // 25. Type of input
            name="firstName" // 26. name must match key in initial values {firstName: ""}
            value={values.firstName} // 27. Controlled input. Value comes from useForm state
            onChange={handleChange} // 28. When user types, useForm updates the state
          />
          {errors.firstName && <p>{errors.firstName}</p>} {/* 29. If useForm found error, show it */}
        </div>

        <div> {/* 30. Group for email input */}
          <label>Email:</label>
          <input
            type="email" // 31. type="email" gives browser basic validation
            name="email" // 32. name must match key in initial values {email: ""}
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>

        <div> {/* 33. Group for password input */}
          <label>Password:</label>
          <input
            type="password" // 34. type="password" hides the text
            name="password" // 35. name must match key in initial values {password: ""}
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>

        <button type="submit">Sign Up</button> {/* 36. Submit button. Triggers handleSubmit */}

      </form>

      <p>Already have an account? <a href="/signin">Sign In</a></p> {/* 37. Link back to signin */}
    </div>
  );
}

// export default SignUp; // 38. Export so Person A can import it in App.jsx routes