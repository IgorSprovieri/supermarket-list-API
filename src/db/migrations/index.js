export const tables = [
  {
    name: "users",
    query: "CREATE TABLE users (id SERIAL PRIMARY KEY, username TEXT UNIQUE)",
  },
  {
    name: "units",
    query:
      "CREATE TABLE units (id SERIAL PRIMARY KEY, unit TEXT, abbreviation TEXT)",
  },
  {
    name: "items",
    query:
      "CREATE TABLE items (id SERIAL PRIMARY KEY, user_id INT, unit_id INT, name TEXT, quantity NUMERIC, CONSTRAINT fk_users FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE, CONSTRAINT fk_units FOREIGN KEY (unit_id) REFERENCES units (id) ON DELETE SET NULL)",
  },
];
