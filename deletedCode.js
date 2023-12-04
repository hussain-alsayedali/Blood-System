// code that was deleted
// someone always asks about it

// app.post("/testm", authController.postSignupNurse);

// app.use(cors());
// app.use(bodyParser.json());

// app.post("/login", async (req, res) => {
//   const { username, password, role } = req.body;

//   console.log("Trying to check the user.. hold on.");
//   let user;
//   switch (role) {
//     case "nurse":
//       user = await prisma.nurse.findUnique({
//         where: {
//           username: username,
//         },
//       });
//       break;
//     case "donor":
//       user = await prisma.donor.findUnique({
//         where: {
//           username: username,
//         },
//       });
//       break;
//     case "recipient":
//       user = await prisma.recipient.findUnique({
//         where: {
//           username: username,
//         },
//       });
//       break;
//     default:
//       return res.status(400).json({ error: "Invalid role" });
//   }

//   if (!user || user.password !== password) {
//     return res.status(401).json({ error: "Invalid username or password" });
//   }

//   res.json({ user });
// });
// model Donation {
//     donationId       Int       @id @unique @default(autoincrement())
//     donationDate     DateTime
//     amount           Int
//     opperationStatus String
//     donorId          Donor     @relation(fields: [donorDonorId], references: [donorId])
//     donorDonorId     Int
//     BloodBag         BloodBag?
//   }
// donationDetails  Donation           @relation(fields: [donationId], references: [donationId])
//   Donation        Donation[]
//

// console.log("seriaze User" + user);
// console.log(user);
// const isNurse = prisma.nurse.findUnique({ where: { id: user.id } });
// const isDonor = prisma.donor.findUnique({ where: { id: user.id } });
// const isRecipient = prisma.recipient.findUnique({ where: { id: user.id } });

// Promise.all([isNurse, isDonor, isRecipient]).then(
//   ([nurse, donor, recipient]) => {
//     let userType = null;
//     if (nurse) {
//       userType = "nurse";
//     } else if (donor) {
//       userType = "donor";
//     } else if (recipient) {
//       userType = "recipient";
//     }
//     done(null, { id: user.id, type: userType });
// done(null, { id: user.id, type: userType });
//   }
// );
// done(null, user);

// if (serializedUser.strategy === "nurse") {
//     const user = await prisma.nurse.findUnique({
//       where: {
//         nurseId: serializedUser.nurseId,
//       },
//     });
//     done(null, user);
//   } else if (serializedUser.strategy === "recipient") {
//     const user = await prisma.recipient.findUnique({
//       where: {
//         recipientId: serializedUser.recipientId,
//       },
//     });
//     done(null, user);
//   } else {
//     const user = await prisma.donor.findUnique({
//       where: {
//         donorId: serializedUser.donorId,
//       },
//     });
//     done(null, user);
//   }
// passport.serializeUser((user, done) => {
//     console.log(user);
//     const isNurse = prisma.$exists.nurse({ id: user.id });
//     const isDonor = prisma.$exists.donor({ id: user.id });
//     const isRecipient = prisma.$exists.recipient({ id: user.id });

//     Promise.all([isNurse, isDonor, isRecipient]).then(
//       ([nurse, donor, recipient]) => {
//         console.log(isNurse, isDonor, isRecipient);
//         let userType = null;
//         if (nurse) {
//           userType = "nurse";
//         } else if (donor) {
//           userType = "donor";
//         } else if (recipient) {
//           userType = "recipient";
//         }
//         console.log(user.id, userType);
//         done(null, { id: user.id, type: userType });
//         // done(null, { id: user.id, type: userType });
//       }
//     );
//   });
// {
//   id: 1,
//   name: "Jax",
//   age: 5000,
//   bloodType: "PDF",
//   email: "Jax@example.com",
//   weight: 120,
//   phone: "054352341",
// },
// {
//   id: 23,
//   name: "Zoe",
//   age: 12,
//   bloodType: "S+",
//   email: "Zoe@example.com",
//   weight: 35,
//   phone: "054352341",
// },
// {
//   id: 12,
//   name: "Zoe",
//   age: 12,
//   bloodType: "S+",
//   email: "Zoe@example.com",
//   weight: 35,
//   phone: "054352341",
// },
// {
//   id: 33,
//   name: "Zoe",
//   age: 12,
//   bloodType: "S+",
//   email: "Zoe@example.com",
//   weight: 35,
//   phone: "054352341",
// },
// return (
//     <div className="Storage-container">
//       <h1 className="title">Blood Inventory Storage</h1>
//       <table className="data-table">
//         <thead>
//           <tr>
//             <th>Blood Type</th>
//             <th>Bags Available</th>
//           </tr>
//         </thead>
//         <tbody>
//           {bloodInventory.map((inventory, index) => {
//             // Extract blood type and bags from the object
//             const bloodType = Object.keys(inventory)[0];
//             const bags = inventory[bloodType];

//             return (
//               <tr key={index}>
//                 <td>{bloodType}</td>
//                 <td>{bags}</td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
