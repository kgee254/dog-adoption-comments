// import { useEffect } from "react"; // 1. useEffect to run code when page loads
// import { useNavigate } from "react-router-dom"; // 2. To redirect

function AddDog() { // 3. Component starts
  const navigate = useNavigate(); // 4. Hook to redirect
  const admin = JSON.parse(localStorage.getItem("admin")); // 5. Read admin from localStorage. If none, admin = null

  useEffect(() => { // 6. Runs once when page loads
    if (!admin) { // 7. PROTECTION: If no admin in localStorage
      navigate("/admin-login"); // 8. Kick them back to login page
    }
  }, [admin, navigate]); // 9. Dependencies. Runs if admin or navigate changes

  function handleLogout() { // 10. Function for logout button
    localStorage.removeItem("admin"); // 11. Delete admin from localStorage
    navigate("/"); // 12. Send them back to home page
  }

  return ( // 13. What shows on screen
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}> {/* 14. Center content */}
      <h2>Add Dog Page</h2> {/* 15. Page title */}
      <p>Welcome, Admin {admin?.firstName}</p> {/* 16. Show admin name. ?. means only if admin exists */}
      <p>Here Person B will put the form to add dogs to DogContext</p> {/* 17. Placeholder */}
      <button onClick={handleLogout}>Logout Admin</button> {/* 18. Button to log admin out */}
    </div>
  );
}

// export default AddDog; // 19. Export