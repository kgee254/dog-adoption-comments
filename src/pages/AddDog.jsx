import { useState } from "react"; // 1. Import useState to store form data and image preview
import { useNavigate } from "react-router-dom"; // 2. Import useNavigate to redirect user after submitting form
import { useDogs } from "../context/DogContext.jsx"; // 3. Import our custom hook to access the addDog function from DogContext
// import "./AddDog.css"; // 4. Import CSS file for styling. Uncomment if you have it

function AddDog() { // 5. Define the AddDog component
  const navigate = useNavigate(); // 6. Get the navigate function so we can go to /dogs after adding
  const { addDog } = useDogs(); // 7. Pull the addDog function out of DogContext

  // 8. State to hold all form fields. Starts empty
  const [formData, setFormData] = useState({
    name: "", // 9. Dog name field
    breed: "", // 10. Dog breed field
    age: "", // 11. Dog age field. Starts as string because inputs return strings
    size: "Medium", // 12. Dog size. Default to Medium
    gender: "Male", // 13. Dog gender. Default to Male
    description: "", // 14. Dog description field
    image: "" // 15. This will store the image as a base64 string after upload
  });

  const [preview, setPreview] = useState(""); // 16. Separate state just to show image preview before submitting

  // 17. Function that runs every time a text/select/textarea input changes
  function handleChange(e) {
    setFormData({...formData, [e.target.name]: e.target.value }); // 18. Update formData. [e.target.name] means "update the key that matches the input name"....formData copies the rest
  }

  // 19. Function that runs when user selects a file
  function handleImageChange(e) {
    const file = e.target.files[0]; // 20. Get the first file the user selected from the input
    if (file) { // 21. Only run if a file actually exists
      const reader = new FileReader(); // 22. Create a FileReader object. This converts files to text/base64
      reader.onloadend = () => { // 23. This runs when the file finishes loading
        setFormData({...formData, image: reader.result }); // 24. Save the base64 string into formData.image
        setPreview(reader.result); // 25. Also save it to preview state so we can show it on screen
      };
      reader.readAsDataURL(file); // 26. Start reading the file as a Data URL = base64 string
    } // 27. End if
  } // 28. End handleImageChange

  // 29. Function that runs when form is submitted
  function handleSubmit(e) {
    e.preventDefault(); // 30. Stop the page from refreshing when form submits

    const newDog = { // 31. Create the final dog object to send to context
    ...formData, // 32. Copy all form data into it
      id: Date.now(), // 33. Give it a unique ID using current timestamp. Simpler than lastID+1
      age: parseInt(formData.age) // 34. Convert age from string to number because we stored it as text
    };

    addDog(newDog); // 35. Call the addDog function from DogContext. This adds dog to state + localStorage
    alert(`${newDog.name} has been added!`); // 36. Show success message with dog name
    navigate("/dogs"); // 37. Redirect user to the Browse Dogs page to see their new dog
  } // 38. End handleSubmit

  return ( // 39. What the component shows on screen
    <div className="adddog-container"> {/* 40. Main wrapper div for styling */}
      <h1 className="adddog-title">Add a New Dog</h1> {/* 41. Page title */}

      <form className="adddog-form" onSubmit={handleSubmit}> {/* 42. The form. onSubmit calls handleSubmit when button is clicked */}
        
        <label>Dog Name</label> {/* 43. Label for name input */}
        <input type="text" name="name" value={formData.name} onChange={handleChange} required /> {/* 44. Text input. value is controlled by state. onChange updates state. required means can't be empty */}

        <label>Breed</label> {/* 45. Label for breed input */}
        <input type="text" name="breed" value={formData.breed} onChange={handleChange} required /> {/* 46. Text input for breed */}

        <label>Age</label> {/* 47. Label for age input */}
        <input type="number" name="age" value={formData.age} onChange={handleChange} min="0" required /> {/* 48. Number input. min="0" prevents negative ages */}

        <label>Size</label> {/* 49. Label for size dropdown */}
        <select name="size" value={formData.size} onChange={handleChange}> {/* 50. Dropdown. Value comes from state */}
          <option value="Small">Small</option> {/* 51. Dropdown option */}
          <option value="Medium">Medium</option> {/* 52. Dropdown option */}
          <option value="Large">Large</option> {/* 53. Dropdown option */}
        </select> {/* 54. Close select */}

        <label>Gender</label> {/* 55. Label for gender dropdown */}
        <select name="gender" value={formData.gender} onChange={handleChange}> {/* 56. Dropdown for gender */}
          <option value="Male">Male</option> {/* 57. Dropdown option */}
          <option value="Female">Female</option> {/* 58. Dropdown option */}
        </select> {/* 59. Close select */}

        <label>Upload Image</label> {/* 60. Label for file input */}
        <input 
          type="file" // 61. This makes it a file picker instead of text
          name="image" // 62. Name of the input
          accept="image/*" // 63. Only allow image files: jpg, png, etc
          onChange={handleImageChange} // 64. When user picks a file, run handleImageChange
          required // 65. Make image required
        /> {/* 66. Close input */}

        {/* 67. This only shows if preview has something in it */}
        {preview && <img src={preview} alt="preview" style={{width: '200px', marginTop: '10px', borderRadius: '8px'}} />} {/* 68. Show the image preview. src is the base64 string */}

        <label>Description</label> {/* 69. Label for description */}
        <textarea name="description" value={formData.description} onChange={handleChange} rows="4" required /> {/* 70. Textarea for longer text. rows="4" makes it 4 lines tall */}

        <button type="submit" className="adddog-btn">Add Dog</button> {/* 71. Submit button. type="submit" triggers handleSubmit */}
      </form> {/* 72. Close form */}
    </div> // 73. Close main div
  ); // 74. End return
} // 75. End AddDog function

export default AddDog; // 76. Export so we can import it in App.jsx routes