import { useNavigate } from "react-router-dom"; // 1. Import useNavigate hook to programmatically change pages, like going to /adopt/1
import { useUser } from "../context/UserContext.jsx"; // 2. Import our custom useUser hook to check if someone is logged in. FIX: was useUsers
// import "./DogCard.css"; // 3. Import CSS file for styling. Currently commented out

function DogCard({ dog }) { // 4. Create DogCard component. It receives 1 prop: 'dog' which is an object with name, breed, etc
  const navigate = useNavigate(); // 5. Call useNavigate and store it in 'navigate'. This is a function we use to go to other pages
  const { currentUser } = useUser(); // 6. Get currentUser from UserContext. If null = not logged in. FIX: was useUsers()

  // 7. Function that runs when "Adopt" button is clicked
  function handleAdopt() {
    if (!currentUser) { // 8. Check: is there NO currentUser? Meaning user is not logged in
      alert("You need to sign in first to adopt a dog"); // 9. If not logged in, show popup telling them to sign in
      navigate("/signin"); // 10. Then send them to the signin page
    } else { // 11. Else: if they ARE logged in
      navigate(`/adopt/${dog.id}`); // 12. Go to the adoption form page for THIS specific dog. ${dog.id} becomes 1, 2, 3 etc
    } // 13. End if/else
  } // 14. End handleAdopt function

  return ( // 15. What this component actually shows on screen
    <div className="dog-card"> {/* 16. Main container div for 1 dog. CSS class for styling the card */}
      <img // 17. Start image tag to show the dog's photo
        src={dog.image} // 18. Image source. Can be "/dog-images/buddy.jpg" OR a base64 string from upload
        alt={dog.name} // 19. Alt text for accessibility. Describes the image as the dog's name
        className="dog-card-image" // 20. CSS class to style the image, like width and border-radius
      /> {/* 21. Close img tag */}

      <h3 className="dog-card-name">{dog.name}</h3> {/* 22. Display dog's name as a heading */}
      <p className="dog-card-info"><strong>Breed:</strong> {dog.breed}</p> {/* 23. Display breed. <strong> makes "Breed:" bold */}
      <p className="dog-card-info"><strong>Age:</strong> {dog.age} years</p> {/* 24. Display age + add "years" text */}
      <p className="dog-card-info"><strong>Size:</strong> {dog.size}</p> {/* 25. Display size: Small, Medium, Large */}
      <p className="dog-card-info"><strong>Gender:</strong> {dog.gender}</p> {/* 26. Display gender: Male or Female */}
      <p className="dog-card-description">{dog.description}</p> {/* 27. Display the full description paragraph */}

      <button // 28. Start button for adoption
        className="adopt-btn" // 29. CSS class to style the button green/blue
        onClick={handleAdopt} // 30. When clicked, run the handleAdopt function above
      >
        Adopt {dog.name} {/* 31. Button text. Shows "Adopt Buddy" dynamically */}
      </button> {/* 32. Close button */}
    </div> // 33. Close main div
  ); // 34. End return
} // 35. End DogCard component

export default DogCard; // 36. Export this component so DogList.jsx can import and use it