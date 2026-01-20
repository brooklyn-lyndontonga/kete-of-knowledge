/* eslint-disable no-undef */
import { connectDB, initTables } from "./init.js"

async function seed() {
  const db = await connectDB()
  await initTables(db)

  // Resource Categories
  await db.exec(`
    INSERT INTO resource_categories (name) VALUES
    ('Mental Health'),
    ('Physical Health'),
    ('Kai & Nutrition'),
    ('Rongoā Māori');
  `)

  // Resources (PDF-ready)
  await db.exec(`
    INSERT INTO resources (title, summary, categoryId, pdfPath) VALUES
    ('Breathing Techniques', 'Simple grounding breath work', 1, NULL),
    ('Daily Walking', 'Gentle movement every day', 2, NULL),
    ('Hydration Basics', 'Why water matters', 3, NULL);
  `)

  // Conditions
  await db.exec(`
    INSERT INTO conditions (name, description) VALUES
    ('Anxiety', 'Ongoing feelings of worry'),
    ('Diabetes', 'Blood sugar regulation condition');
  `)

  // Whakataukī
  await db.exec(`
    INSERT INTO whakatauki (text, translation) VALUES
    ('He manawa tō te tangata', 'The heart sustains a person'),
    ('Mā te huruhuru ka rere te manu', 'With feathers the bird will fly');
  `)

  // Snapshots
  await db.exec(`
    INSERT INTO snapshots (title, content) VALUES
    ('First Check-in', 'User initial health snapshot');
  `)

  console.log("✅ Database seeded (PDF-ready)")
  process.exit(0)
}

seed()
