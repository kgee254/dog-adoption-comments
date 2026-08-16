// 1. Define an array called admins. This holds all admin accounts
const admins = [
  { // 2. Admin object 1
    id: 1, // 3. Unique ID for this admin
    firstName: "Sarah", // 4. Admin's first name. We will use this to "login"
    lastName: "Admin", // 5. Admin's last name
    password: "admin123" // 6. Admin's password. Plain text for now
  },
  { // 7. Admin object 2
    id: 2, // 8. Unique ID for this admin
    firstName: "James", // 9. Admin's first name
    lastName: "Admin", // 10. Admin's last name
    password: "admin456" // 11. Admin's password
  }
];

// 12. Export the admins array so other files can import it
export default admins;