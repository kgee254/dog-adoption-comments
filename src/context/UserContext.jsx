import { createContext, useContext, useState, useEffect } from "react"; // 1. Import React hooks. createContext makes the context, useContext lets us read it, useState for data, useEffect for localStorage
 
const UserContext = createContext(); // 2. Create the context object. This is the box we’ll put our data in

export function UserProvider({ children }) { // 3. This is the Provider component. {children} means "whatever is inside <UserProvider> </UserProvider>"
  const [users, setUsers] = useState([]); // 4. State: array of all users. Each user = {firstName, email, password}
  const [currentUser, setCurrentUser] = useState(null); // 5. State: who is logged in right now. null = no one

  // 6. useEffect runs once when app loads. We use it to load data from localStorage
  useEffect(() => {
    const savedUsers = localStorage.getItem("users"); // 7. Get "users" from browser localStorage
    if (savedUsers) setUsers(JSON.parse(savedUsers)); // 8. If something was saved, turn string back to array and set it

    const savedCurrent = localStorage.getItem("currentUser"); // 9. Get "currentUser" from localStorage
    if (savedCurrent) setCurrentUser(JSON.parse(savedCurrent)); // 10. If someone was logged in, set them
  }, []); // 11. [] means "run only once on page load"

  // 12. useEffect runs every time users array changes. We use it to SAVE to localStorage
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users)); // 13. Save users array to localStorage as a string
  }, [users]); // 14. [users] means "run this whenever users changes"

  // 15. useEffect runs every time currentUser changes
  useEffect(() => {
    if (currentUser) { // 16. If someone is logged in
      localStorage.setItem("currentUser", JSON.stringify(currentUser)); // 17. Save them
    } else { // 18. If no one is logged in
      localStorage.removeItem("currentUser"); // 19. Delete from localStorage
    }
  }, [currentUser]);

  function signUp(newUserData) { // 20. Function to create a new account. Takes {firstName, lastName, email, password}
    const userExists = users.find(u => u.email === newUserData.email); // 21. Check if email is already in users array
    if (userExists) { // 22. If we found a user with same email
      return { success: false, message: "User already exists" }; // 23. Return failure to SignUp.jsx
    }

    const newUser = { // Create the full user object with id
        id: Date.now(), //System generates unique id
        ...newUserData // Spread firstName, lastName, email, password
    };

    setUsers([...users, newUser]); // 24. Add new user to array....users copies old array
    return { success: true, message: "Sign up successful" }; // 25. Return success to SignUp.jsx
  }

  function signIn(email, password) { // 26. Function to log in. Takes email + password
    const user = users.find(u => u.email === email && u.password === password); // 27. Find user with matching email AND password
    if (!user) { // 28. If no match found
      return { success: false, message: "Invalid credentials. Please sign up" }; // 29. Return failure
    }
    setCurrentUser(user); // 30. If match found, set them as logged in
    return { success: true, message: `Welcome ${user.firstName}` }; // 31. Return success with name
  }

  function logout() { // 32. Function to log out
    setCurrentUser(null); // 33. Set currentUser back to null
  }

  const value = { users, currentUser, signUp, signIn, logout }; // 34. Put everything we want to share into one object

  return ( // 35. Return the Provider
    <UserContext.Provider value={value}> {/* 36. This makes "value" available to ALL child components */}
      {children} {/* 37. Render whatever pages are inside the provider */}
    </UserContext.Provider>
  );
}

export function useUser() { // 38. Custom hook. This is how pages like SignUp.jsx will access the context
  return useContext(UserContext); // 39. useContext grabs the "value" from the nearest UserProvider above
}