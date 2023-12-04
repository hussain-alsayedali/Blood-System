// creating donor :
const donor = await prisma.donor.create({
  data: {
    bankId: "12121",
    email: "meowassa@gmails.com",
    phone: "152123",
    weight: 99,
    birth: new Date(),
    address: "almnia",
    firstName: "ahmed",
    lastName: "mohsen",
    password: "123456789",
    bloodType: "B+",
  },
});

//  creating recpient :

const recpient = await prisma.recipient.create({
  data: {
    currentUrgency: "bad",
    bankId: "9x",
    email: "meowaassa@gmails.com",
    phone: "1521233",
    weight: 99,
    birth: new Date(),
    address: "almnia",
    firstName: "ahamed",
    lastName: "mohsen",
    password: "123456789",
    bloodType: "B+",
  },
});

// creating a blood
const blood = await prisma.blood.create({
  data: {
    type: "B+",
    recieveFrom: "B+,B-,O+,O-",
  },
});

// creating nurse
const nurse = await prisma.nurse.create({
  data: {
    bankId: "9x",
    email: "meowaassa@gmails.com",
    phone: "1521233",
    weight: 99,
    birth: new Date(),
    address: "almnia",
    firstName: "ahamed",
    lastName: "mohsen",
    password: "123456789",
  },
});

// creating blood bag
await prisma.bloodBag.create({
  data: {
    donorId: 2,
  },
});
