// 1. Export an array of dog objects. This is the "seed data"
const initialDogs = [
  {
    id: 1, // 2. Unique ID
    name: "Buddy", // 3. Dog name
    breed: "Golden Retriever", // 4. Breed
    age: 3, // 5. Age in years
    size: "Large", // 6. Size: Small, Medium, Large
    gender: "Male", // 7. Gender
    description: "Friendly and playful. Loves kids and fetch.", // 8. Description
    image: "https://images.dog.ceo/breeds/retriever-golden/n02099601_100.jpg" // 9. Image URL
  },
  {
    id: 2,
    name: "Luna",
    breed: "German Shepherd",
    age: 2,
    size: "Large",
    gender: "Female",
    description: "Smart and loyal. Great guard dog.",
    image: "https://images.dog.ceo/breeds/shepherd-german/n02106662_1012.jpg"
  },
  { 
    id: 3,
    name: "Max",
    breed: "Beagle",
    age: 4,
    size: "Medium",
    gender: "Male",
    description: "Curious and energetic. Loves to sniff everything.",
    image: "https://images.dog.ceo/breeds/beagle/n02088364_11136.jpg"
  }
];

export default initialDogs; // 10. Export so DogContext can import it