// import { useParams, useNavigate } from "react-router-dom"; // 1. useParams gets :dogId from URL
// import { useEffect, useState } from "react"; // 2. For protection + mock data
// import useForm from "../hooks/useForm.js"; // 3. Our custom hook
// import { useUser } from "../context/UserContext.jsx"; // 4. Get currentUser
 
function AdoptionForm() {
  const { dogId } = useParams(); // 5. Grab dogId from /adopt/169234
  const navigate = useNavigate(); // 6. To redirect
  const { currentUser } = useUser(); // 7. Get logged in user
  const [dog, setDog] = useState(null); // 8. State to hold the dog data

  // 9. MOCK DOG DATA - DELETE THIS WHEN PERSON B GIVES REAL DogContext
  const mockDogs = [
    { id: "1", name: "Buddy", breed: "Golden Retriever", age: 3, size: "Large", gender: "Male", description: "Very friendly", image: "https://place.dog/300/200" },
    { id: "2", name: "Luna", breed: "Beagle", age: 2, size: "Medium", gender: "Female", description: "Loves to play", image: "https://place.dog/300/200" }
  ];
  // 10. END MOCK

  useEffect(() => { // 11. Runs when component loads
    // 12. PROTECTION: If not logged in, send to signin
    if (!currentUser) {
      navigate("/signin");
      return;
    }

    // 13. GET DOG: Replace this with Person B's DogContext later
    // const foundDog = getDogById(dogId) <- this is what Person B will give us
    const foundDog = mockDogs.find(d => d.id === dogId); // 14. Using mock for now
    setDog(foundDog);

    if (!foundDog) { // 15. If dog doesn't exist
      alert("Dog not found");
      navigate("/");
    }
  }, [dogId, currentUser, navigate]);

  // 16. Autofill form with user + dog data. dog?.name means "only if dog exists"
  const [form, handleChange] = useForm({ 
    firstName: currentUser?.firstName || "", 
    lastName: currentUser?.lastName || "", 
    email: currentUser?.email || "",
    dogName: dog?.name || "",
    dogBreed: dog?.breed || ""
  }); 

  function handleSubmit(e) { // 17. On submit
    e.preventDefault();
    
    // 18. TODO: Call Person B's removeDog(dogId) here
    // removeDog(dogId)
    
    alert(`Adoption request for ${dog.name} submitted! Person D will contact you.`);
    navigate("/"); // 19. Go home after
  }

  if (!dog) return <p>Loading dog...</p>; // 20. Show while finding dog

  return ( // 21. The form
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>Adopt {dog.name}</h2>
      <img src={dog.image} alt={dog.name} style={{ width: "100%" }} />
      <p><b>Breed:</b> {dog.breed} | <b>Age:</b> {dog.age} | <b>Size:</b> {dog.size} | <b>Gender:</b> {dog.gender}</p>
      <p>{dog.description}</p>
      <hr />

      <form onSubmit={handleSubmit}>
        <h3>Your Information</h3>
        <input type="text" name="firstName" value={form.firstName} onChange={handleChange} readOnly />
        <br />
        <input type="text" name="lastName" value={form.lastName} onChange={handleChange} readOnly />
        <br />
        <input type="email" name="email" value={form.email} onChange={handleChange} readOnly />
        <br />
        <h3>Dog Information</h3>
        <input type="text" name="dogName" value={form.dogName} readOnly />
        <br />
        <input type="text" name="dogBreed" value={form.dogBreed} readOnly />
        <br />
        <button type="submit">Confirm Adoption</button>
      </form>
    </div>
  );
}

// export default AdoptionForm; // 22. Export