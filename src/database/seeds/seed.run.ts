import * as seed from './index';

async function seedStart() {
  await Promise.all(
    Object.entries(seed).map(async (value, index) => {
      const key = value[0];
      const val = value[1];
      console.log(`[${index + 1}] - Started seeding [${key}]`);
      const data = await val.execute();
      console.log(JSON.stringify(data));
      console.log(`[${index + 1}] - Finished seeding [${key}]`);
    }),
  );

  process.exit(0);
}

seedStart();
