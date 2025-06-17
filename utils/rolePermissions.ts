// utils/rolePermissions.ts

export const rolePermissions = {
  ADMIN: ["home", "customer", "clients", "bookings", "packages"],
  SUBADMIN: ["home", "clients", "bookings"],
  EMPLOYEE: ["home", "bookings"],
};
