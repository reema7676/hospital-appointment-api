import { prisma } from "./lib/prisma";

async function main() {
  const doctor1 = await prisma.doctor.create({
    data: {
      name: "Dr. Sarah Smith",
      specialty: "Cardiology",
      email: "sarah.smith@hospital.com",
    },
  });

  const doctor2 = await prisma.doctor.create({
    data: {
      name: "Dr. John Mathew",
      specialty: "Neurology",
      email: "john.mathew@hospital.com",
    },
  });

  const patient1 = await prisma.patient.create({
    data: {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phone: "9876543210",
      dateOfBirth: new Date("1995-05-15"),
    },
  });

  const patient2 = await prisma.patient.create({
    data: {
      name: "Bob Williams",
      email: "bob.williams@example.com",
      phone: "9876543211",
      dateOfBirth: new Date("1988-10-20"),
    },
  });

  await prisma.appointment.create({
    data: {
      appointmentDate: new Date("2026-09-01T10:00:00"),
      status: "scheduled",
      notes: "Regular checkup",
      Patient: {
        connect: {
          id: patient1.id,
        },
      },
      Doctor: {
        connect: {
          id: doctor1.id,
        },
      },
    },
  });

  await prisma.appointment.create({
    data: {
      appointmentDate: new Date("2026-09-02T14:00:00"),
      status: "scheduled",
      notes: "Neurology consultation",
      Patient: {
        connect: {
          id: patient2.id,
        },
      },
      Doctor: {
        connect: {
          id: doctor2.id,
        },
      },
    },
  });

  console.log("Seed completed successfully!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
