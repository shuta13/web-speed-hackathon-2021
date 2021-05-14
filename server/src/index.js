import http from 'http';

import { app } from './app';
import { insertSeeds } from './seeds';
import { sequelize } from './sequelize';

async function main() {
  // データベースの初期化をします
  await sequelize.sync({
    force: true,
    logging: false,
  });
  await insertSeeds();

  const address = '0.0.0.0';
  const port = Number(process.env.PORT || 3000);
  app.listen(port, address, () => {
    console.log(`Listening on ${address}:${port}`);
  });
}

main().catch(console.error);
