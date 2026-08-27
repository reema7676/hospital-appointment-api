import { prisma } from "./lib/prisma";
import { Prisma } from "@prisma/client";

export async function createPatient(
  name: string,
  email: string,
  phone: string | null,
  dateOfBirth: Date | null
) {
  return prisma.patient.create({
    data: {
      name,
      email,
      phone,
      dateOfBirth,
    },
  });
}

export async function getPatient(id: number) {
  return prisma.patient.findUnique({
    where: {
      id,
    },
  });
}

export async function searchPatients(search: string) {
  return prisma.patient.findMany({
    where: {
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    },
    orderBy: {
      name: "asc",
    },
  });
}

export async function updatePatientPhone(
  id: number,
  phone: string
) {
  return prisma.patient.update({
    where: {
      id,
    },
    data: {
      phone,
    },
  });
}

export async function deletePatient(id: number) {
  return prisma.patient.delete({
    where: {
      id,
    },
  });
}
