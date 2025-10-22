import { Pool } from 'pg';

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // ej: postgres://baby:vote@localhost:5432/babyvote
  // ssl: { rejectUnauthorized: false } // si lo necesitas en prod
});

// opcional: prueba de conexión al arrancar
export async function testDb() {
  const client = await pool.connect();
  try {
    await client.query('select 1');
  } finally {
    client.release();
  }
}
