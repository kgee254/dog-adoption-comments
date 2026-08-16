import { Link } from "react-router-dom"; // 1. Import Link so we can navigate without page refresh
import { useUser } from "../context/UserContext.jsx"; // 2. Import useUser so we can show who is logged in
 
function Navbar() { // 3. Navbar component
  const { currentUser, logout } = useUser(); // 4. Get currentUser and logout from context

  return ( // 5. Return the navbar JSX
    <nav style={{ padding: "10px", borderBottom: "1px solid gray" }}> {/* 6. Simple styling inline */}
      <Link to="/">Home</Link> {" | "} {/* 7. Link to home page */}
      
      <Link to="/dogs">Browse Dogs</Link> {" | "}
      
      {!currentUser && ( // 8. Only show these if NO ONE is logged in
        <>
          <Link to="/signup">Sign Up</Link> {/* 9. Link to signup */}
          {" | "}
          <Link to="/signin">Sign In</Link> {/* 10. Link to signin */}
        </>
      )}

      {currentUser && ( // 11. Only show these if someone IS logged in
        <>
          <span>Welcome {currentUser.firstName}</span> {/* 12. Show user's name */}
          {" | "}
          {currentUser.role === "admin" && ( 
            <Link to="/admin/add-dog">Add Dog</Link> 
          )}
          {currentUser.role === "admin" && " | "}
          <button onClick={logout}>Logout</button> {/* 13. Button to log out */}
        </>
      )}
    </nav>
  );
}

export default Navbar; // 14. Export so App.jsx can use it