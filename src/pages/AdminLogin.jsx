import { useState } from "react"; // 1. useState to store form inputs and errors
import { useNavigate } from "react-router-dom"; // 2. useNavigate to redirect after login
import admins from "../data/admins.js";

function AdminLogin() { // 4. Component starts
  const [email, setEmail] = useState(""); // 5. State for username input. We use firstName as username
  const [password, setPassword] = useState(""); // 6. State for password input
  const [error, setError] = useState(""); // 7. State to show error message if login fails
  const navigate = useNavigate(); // 8. Hook to programmatically change pages

  function handleSubmit(e) { // 9. Runs when form is submitted
    e.preventDefault(); // 10. Stop page from refreshing

    // 11. Search the admins array for someone with matching firstName AND password
    const foundAdmin = admins.find(
      a => a.firstName.toLowerCase() === email.toLowerCase() && a.password === password // 12. .toLowerCase makes login not case sensitive
    );

    if (foundAdmin) { // 13. If we found a matching admin
      // 14. Save the logged in admin to browser localStorage so they stay logged in on refresh
      localStorage.setItem("admin", JSON.stringify(foundAdmin)); 
      alert(`Welcome Admin ${foundAdmin.firstName}`); // 15. Show welcome message
      navigate("/admin/add-dog"); // 16. Redirect to the Add Dog page
    } else { // 17. If no match found
      setError("Invalid admin credentials"); // 18. Set error message to show on screen
    } 
  }

  return ( // 19. What shows on screen
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}> {/* 20. Center the form */}
      <h2>Admin Login</h2> {/* 21. Page title */}
      {error && <p style={{ color: "red" }}>{error}</p>} {/* 22. Only show error if error state has text */}
      <form onSubmit={handleSubmit}> {/* 23. Form. onSubmit calls handleSubmit */}
        <label>Admin Username</label> {/* 24. Label for input */}
        <br /> {/* 25. Line break */}
        <input // 26. Text input
          type="text" // 27. Input type is text
          placeholder="Enter first name" // 28. Grey hint text
          value={email} // 29. Input value is tied to email state
          onChange={(e) => setEmail(e.target.value)} // 30. Update state every time user types
          required // 31. Must fill this to submit
        />
        <br /><br /> {/* 32. Spacing */}
        <label>Password</label> {/* 33. Label for password */}
        <br />
        <input // 34. Password input
          type="password" // 35. Hides the text
          placeholder="Enter password" // 36. Hint text
          value={password} // 37. Tied to password state
          onChange={(e) => setPassword(e.target.value)} // 38. Update password state
          required // 39. Must fill this
        />
        <br /><br />
        <button type="submit">Sign In</button> {/* 40. Submit button */}
      </form>
    </div>
  );
}

export default AdminLogin; // 41. Export so App.jsx can import it