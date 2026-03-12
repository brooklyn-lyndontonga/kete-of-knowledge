import { defineConfig } from "@prisma/config";

export default defineConfig({
  earlyAccess: true,
  migrate: {
    connection: {
      url: "file:../db/database.db",
    },
  },
});
