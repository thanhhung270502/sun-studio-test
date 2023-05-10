import readline from "readline";
import GameManager from "./GameManager";

function askQuestion(query: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans);
    })
  );
}

const run = async () => {
  const gameManager = new GameManager(
    [
      [1, 2, 3, 2],
      [2, 1, 3, 1],
      [3, 1, 2, 3],
      [0, 0, 0, 0],
    ],
    [0]
  );


  //? If you need step by step to debug
  while (!gameManager.isWin()) {
    const from = Number.parseInt(await askQuestion("Moving from tube: "));
    const to = Number.parseInt(await askQuestion("to tube: "));

    gameManager.move(from, to);
  }

  //? If you need fast verify
//   gameManager.move(0, 3);
//   gameManager.move(1, 3);
//   gameManager.move(2, 1);
//   gameManager.move(2, 0);
//   gameManager.move(2, 3);
//   gameManager.move(1, 2);
//   gameManager.move(1, 2);
//   gameManager.move(1, 3);
//   gameManager.move(0, 1);
//   gameManager.move(0, 2);
//   gameManager.move(0, 1);
//   gameManager.move(0, 1);
};

run();
