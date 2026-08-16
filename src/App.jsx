import { Routes, Route, Link } from "react-router-dom"; // 1. Import router tools: Routes holds all pages, Route is 1 page, Link is for navigation
import { UserProvider } from "./context/UserContext.jsx"; // 2. Import UserProvider to wrap app and share login state
import { DogProvider } from "./context/DogContext.jsx"; // 3. NEW: Import DogProvider to wrap app and share dog data. THIS WAS MISSING
import Navbar from "./components/Navbar.jsx"; // 4. Import Navbar component so it shows on every page
import SignUp from "./pages/SignUp.jsx"; // 5. Import SignUp page component
import SignIn from "./pages/SignIn.jsx"; // 6. Import SignIn page component
import AdoptionForm from "./pages/AdoptionForm.jsx"; // 7. Import AdoptionForm page component
import AdminLogin from "./pages/AdminLogin.jsx"; // 8. Import AdminLogin page component
import AddDog from "./pages/AddDog.jsx"; // 9. Import AddDog page component
import Dogs from "./pages/Dogs.jsx"; // 10. Import Dogs page component = Browse Dogs
import Home from "./pages/Home.jsx";

function App() { // 11. Main App component. This is the root of everything
  return ( // 12. What App renders
    <UserProvider> {/* 13. Wrap everything in UserProvider first. Now all children can use useUser() */}
      <DogProvider> {/* 14. NEW: Wrap everything in DogProvider too. Now all children can use useDogs() */}
        <Navbar /> {/* 15. Show Navbar on every page. It will have Home, Dogs, Add Dog links */}
 
          <Routes> {/* 16. This is the router. It decides which page to show based on the URL */}
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/adopt/:dogId" element={<AdoptionForm />} /> {/* 20. Route for adoption. :dogId is a "URL parameter". Ex: /adopt/3 */}
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin/add-dog" element={<AddDog />} />
            <Route path="/dogs" element={<Dogs />} />
          </Routes>

      </DogProvider>
    </UserProvider>  
  );
} 

export default App;





  
    
    

      

      
        
        