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
