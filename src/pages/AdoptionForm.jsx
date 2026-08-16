import { useState } from "react"; // 1. For form inputs
import { useParams, useNavigate } from "react-router-dom"; // 2. Get dogId from URL + redirect
import { useDogs } from "../context/DogContext.jsx"; // 3. Get dogs + removeDog
import { useUser } from "../context/UserContext.jsx"; // 4. Get currentUser info
import "./AdoptionForm.css"; // 5. CSS file

function AdoptionForm() {
  const { dogId } = useParams(); // 6. Gets "3" from /adopt/3
  const navigate = useNavigate(); // 7. To redirect after submit
  const { dogs, removeDog } = useDogs(); // 8. Get real dogs + function
  const { currentUser } = useUsers(); // 9. Pre-fill user info

  const dog = dogs.find(d => d.id === parseInt(dogId)); // 10. Find the actual dog object

  const [formData, setFormData] = useState({ // 11. Form state
    fullName: currentUser?.username || "", // 12. Pre-fill if logged in
    email: currentUser?.email || "",
    phone: "",
    address: "",
    reason: ""
  });

  if (!dog) { // 13. CHECK: What if someone types /adopt/999
    return <h2 className="not-found">Dog not found</h2>; // 14. Show error
  }

  function handleChange(e) { // 15. Update form state
    setFormData({ ...formData, [e.target.name]: e.target.value }); // 16. Dynamic field update
  }

  function handleSubmit(e) { // 17. When form is submitted
    e.preventDefault(); // 18. Stop page reload
    alert(`Application submitted for ${dog.name}!`); // 19. Confirmation
    
    removeDog(dog.id); // 20. KEY: Remove dog from available list
    
    navigate("/dogs"); // 21. Send them back to browse more dogs
  }

  return (
    <div className="adoption-form-container"> {/* 22. Page wrapper */}
      <h1 className="form-title">Adopt {dog.name}</h1> {/* 23. Title */}
      
      <div className="adoption-content"> {/* 24. 2 column layout */}
        {/* 25. Left: Dog Info */}
        <div className="dog-info-card">
          <img src={dog.image} alt={dog.name} className="dog-info-image" /> {/* 26. Dog pic */}
          <h2>{dog.name}</h2> {/* 27. Name */}
          <p><strong>Breed:</strong> {dog.breed}</p> {/* 28. Details */}
          <p><strong>Age:</strong> {dog.age} years</p>
          <p><strong>Size:</strong> {dog.size}</p>
          <p><strong>Gender:</strong> {dog.gender}</p>
          <p className="dog-description">{dog.description}</p> {/* 29. Description */}
        </div>

        {/* 30. Right: Form */}
        <form className="adoption-form" onSubmit={handleSubmit}> {/* 31. Form */}
          <h2>Adoption Application</h2> {/* 32. Form title */}

          <label>Full Name</label> {/* 33. Label */}
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required /> {/* 34. Input */}

          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label>Phone</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

          <label>Address</label>
          <textarea name="address" value={formData.address} onChange={handleChange} required rows="3"></textarea> {/* 35. Textarea */}

          <label>Why do you want to adopt {dog.name}?</label>
          <textarea name="reason" value={formData.reason} onChange={handleChange} required rows="4"></textarea>

          <button type="submit" className="submit-btn">Submit Application</button> {/* 36. Submit button */}
        </form>
      </div>
    </div>
  );
}

export default AdoptionForm; // 37. Export