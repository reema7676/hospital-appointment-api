import { prisma } from "./lib/prisma";
import {
  createPatient,
  getPatient,
  searchPatients,
  updatePatientPhone,
  deletePatient,
} from "./patients";
import {
  createDoctor,
  getDoctor,
  listDoctorsBySpecialty,
  deleteDoctor,
} from "./doctors";
import {
  bookAppointment,
  getAppointmentFull,
  getDoctorUpcomingAppointments,
  setAppointmentStatus,
  cancelAllPatientAppointments,
  deleteAppointment,
} from "./appointments";

async function main() {
  console.log("\n--- PATIENT CRUD ---");

  const patient = await createPatient(
    "Test Patient",
    "test.patient@example.com",
    "9999999999",
    new Date("1990-01-01")
  );
  console.log("1. createPatient:", patient);

  const foundPatient = await getPatient(patient.id);
  console.log("2. getPatient:", foundPatient);

  const searchedPatients = await searchPatients("Test");
  console.log("3. searchPatients:", searchedPatients);

  const updatedPatient = await updatePatientPhone(
    patient.id,
    "8888888888"
  );
  console.log("4. updatePatientPhone:", updatedPatient);

  console.log("\n--- DOCTOR CRUD ---");

  const doctor = await createDoctor(
    "Dr. Test Doctor",
    "Dermatology",
    "test.doctor@hospital.com"
  );
  console.log("5. createDoctor:", doctor);

  const foundDoctor = await getDoctor(doctor.id);
  console.log("6. getDoctor:", foundDoctor);

  const doctorsBySpecialty =
    await listDoctorsBySpecialty("Dermatology");
  console.log(
    "7. listDoctorsBySpecialty:",
    doctorsBySpecialty
  );

  console.log("\n--- APPOINTMENT CRUD ---");

  const appointment = await bookAppointment(
    patient.id,
    doctor.id,
    new Date("2026-09-10T10:00:00"),
    "Test appointment"
  );
  console.log("8. bookAppointment:", appointment);

  const fullAppointment =
    await getAppointmentFull(appointment.id);
  console.log("9. getAppointmentFull:", fullAppointment);

  const upcomingAppointments =
    await getDoctorUpcomingAppointments(
      doctor.id,
      new Date("2026-01-01")
    );
  console.log(
    "10. getDoctorUpcomingAppointments:",
    upcomingAppointments
  );

  const updatedAppointment = await setAppointmentStatus(
    appointment.id,
    "completed"
  );
  console.log(
    "11. setAppointmentStatus:",
    updatedAppointment
  );

  const cancelledAppointments =
    await cancelAllPatientAppointments(patient.id);
  console.log(
    "12. cancelAllPatientAppointments:",
    cancelledAppointments
  );

  await deleteAppointment(appointment.id);
  console.log("13. deleteAppointment: success");

  await deleteDoctor(doctor.id);
  console.log("14. deleteDoctor: success");

  await deletePatient(patient.id);
  console.log("15. deletePatient: success");

  console.log("\n✅ All CRUD functions executed successfully!");
}

main()
  .catch((error) => {
    console.error("\n❌ Test failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
