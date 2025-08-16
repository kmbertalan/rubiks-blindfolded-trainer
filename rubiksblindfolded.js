const Cube = require("cubejs");
const Scrambo = require("scrambo");
const readline = require("readline/promises");
const { stdin: input, stdout: output } = require("process");
const { edgeMoves, cornerMoves, parity } = require("./constants");

const scrambler = new Scrambo();

async function main() {
  const cube = new Cube();
  const rl = readline.createInterface({ input, output });

  try {
    const inputScramble = await rl.question(
      "Enter your scramble, or hit enter to generate a new one: "
    );

    const finalScramble = inputScramble.trim()
      ? inputScramble.trim()
      : scrambler.type("333").length(20).get()[0];

    console.log("Your scramble:", finalScramble);
    cube.move(finalScramble);

    const convertedMoveList = [];

    const edgeSolution = await rl.question(
      "Enter your solution for the edges: "
    );

    if (edgeSolution.trim()) {
      edgeSolution.split("").forEach((letter) => {
        const correspondingMoves = edgeMoves[letter.toUpperCase()];
        if (correspondingMoves) {
          convertedMoveList.push(correspondingMoves);
        }
      });

      if (convertedMoveList.length % 2 === 1) {
        convertedMoveList.push(parity);
      }
    }

    const cornerSolution = await rl.question(
      "Enter your solution for the corners: "
    );

    if (cornerSolution.trim()) {
      cornerSolution.split("").forEach((letter) => {
        const correspondingMoves = cornerMoves[letter.toUpperCase()];
        if (correspondingMoves) {
          convertedMoveList.push(correspondingMoves);
        }
      });
    }

    if (convertedMoveList.length > 0) {
      const finalMove = convertedMoveList
        .filter((move) => move.length > 0)
        .join(" ");

      cube.move(finalMove);

      const isSolved = cube.isSolved();

      if (isSolved) {
        console.log();
        console.log("🎉 Good job! Cube is solved!");
      } else {
        console.log();
        console.log("❌ Cube is not solved. Current state:");
        console.log(cube.asString());
        console.log(cube.toJSON());
      }
    } else {
      console.log("No solution moves provided.");
    }
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    rl.close();
  }
}

main().catch(console.error);
