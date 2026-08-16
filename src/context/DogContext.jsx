import { createContext, useState, useContext, useEffect } from "react"; // 1. Import React tools: createContext to make global data, useState to store data, useContext to read data, useEffect to run code on changes
import initialDogs from "../data/initialDogs"; // 2. Import the 3 starter dogs from your data folder so app isn't empty on first load

const DogContext = createContext(); // 3. Create the "box/context" that will hold all dog data. This is what we will share with the whole app

export function DogProvider({ children }) { // 4. Create the Provider component. {children} means "everything wrapped inside <DogProvider> in App.jsx"
  
  // 5. State for the dogs array. useState with a function () => {} runs only once on load
  const [dogs, setDogs] = useState(() => {
    const saved = localStorage.getItem("dogs"); // 6. Check browser localStorage to see if we saved dogs before
    return saved? JSON.parse(saved) : initialDogs; // 7. If we found saved dogs, load them. If not, use initialDogs as default
  });

  const [searchTerm, setSearchTerm] = useState(""); // 8. State to store what the user types in the SearchBar. Starts as empty string

  // 9. useEffect runs every time the 'dogs' array changes
  useEffect(() => {
    localStorage.setItem("dogs", JSON.stringify(dogs)); // 10. Save the current dogs array to localStorage as a string so it persists on refresh
  }, [dogs]); // 11. [dogs] = dependency array. Only run this effect when 'dogs' changes

  // 12. Function to add a new dog. Called from AddDog.jsx
  function addDog(newDog) {
    const dogWithId = { // 13. Create a new dog object
    ...newDog, // 14. Copy all the form data: name, breed, age, image(base64), etc
      id: dogs.length > 0? dogs[dogs.length - 1].id + 1 : 1 // 15. Generate new ID. If dogs exist, take last dog ID + 1. If no dogs, start at 1
    };
    setDogs([...dogs, dogWithId]); // 16. Update state: make new array with all old dogs + new dog at the end.... is "spread operator"
  }

  // 17. Function to remove a dog. Called from AdoptionForm.jsx after adoption
  function removeDog(id){
    setDogs(prevDogs => prevDogs.filter(dog => dog.id!== id)); // 18. Update state: filter creates new array with only dogs whose id does NOT match the id we want to remove
  }

  // 19. Create a filtered list of dogs based on search. This runs every render
  const filteredDogs = dogs.filter(dog => // 20..filter loops through all dogs and keeps only ones that return true
    dog.name.toLowerCase().includes(searchTerm.toLowerCase()) || // 21. Check if dog name includes searchTerm. toLowerCase makes it case-insensitive
    dog.breed.toLowerCase().includes(searchTerm.toLowerCase()) || // 22. Check if dog breed includes searchTerm
    dog.description.toLowerCase().includes(searchTerm.toLowerCase()) // 23. Check if dog description includes searchTerm. || means "OR"
  ); // 24. End of filter

  // 25. This "value" object is what we will share with all components using useDogs()
  const value = {
    dogs, // 26. Share the full list of dogs
    filteredDogs, // 27. Share the filtered list for DogList to display
    searchTerm, // 28. Share the current search text
    setSearchTerm, // 29. Share the function to update search text
    addDog, // 30. Share the function to add a dog
    removeDog // 31. Share the function to remove a dog
  };

  return ( // 32. What this component renders
    <DogContext.Provider value={value}> {/* 33. The Provider that wraps children and gives them access to 'value' */}
      {children} {/* 34. Render everything inside the Provider, like Routes and Pages */}
    </DogContext.Provider> 
  ); 
} 

export function useDogs() { // 38. Create a custom hook so we don't have to write useContext(DogContext) everywhere
  return useContext(DogContext); // 39. This hook returns whatever is in 'value' above. So components can do const {dogs, addDog} = useDogs()
} // 40. End useDogs hook