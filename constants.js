const parity = "R U R' F' R U2 R' U2 R' F R U R U2 R' U' ";

const cornerSwap = "R U' R' U' R U R' F' R U R' U' R' F R";

const edgeMoves = {
  A: "U' R' U L' U2 R U' R' U2 R L",
  B: "",
  C: "R U R' F' R U R' U' R' F R2 U' R' U'",
  D: "R U R' U' R' F R2 U' R' U' R U R' F'",
  E: "R' F U' D F D' F' D' L D2 F' D' F' D F D' L' U F' R",
  F: "U' F B U B' U' B' R B2 U' B' U' B U B' R' F' U",
  G: "R' F' D F2 D F D' F' D' L D2 F' D' F' D F D' L' F2 D' F R",
  H: "U B' F U F' U' F' L F2 U' F' U' F U F' L' B U'",
  I: "R F' L2 R B R' B' R' U R2 B' R' B' R B R' U' L2 F R'",
  J: "U2 R L U L' U' L' B L2 U' L' U' L U L' B' R' U2",
  K: "R F L2 R B R' B' R' U R2 B' R' B' R B R' U' L2 F' R'",
  L: "L' R U R' U' R' F R2 U' R' U' R U R' F' L",
  M: "",
  N: "U B F U F' U' F' L F2 U' F' U' F U F' L' B' U'",
  O: "D R' B' L2 F D F D' F' D' L D2 F' D' F' D F D' L' F' L2 B R D'",
  P: "U' F' B U B' U' B' R B2 U' B' U' B U B' R' F U",
  Q: "R' B L2 F D F D' F' D' L D2 F' D' F' D F D' L' F' L2 B' R",
  R: "L R U R' U' R' F R2 U' R' U' R U R' F' L'",
  S: "R' B' L2 F D F D' F' D' L D2 F' D' F' D F D' L' F' L2 B R",
  T: "U2 R' L U L' U' L' B L2 U' L' U' L U L' B' R U2",
  U: "D' L2 R U R' U' R' F R2 U' R' U' R U R' F' L2 D",
  V: "D2 L2 R U R' U' R' F R2 U' R' U' R U R' F' L2 D2",
  W: "D L2 R U R' U' R' F R2 U' R' U' R U R' F' L2 D'",
  X: "L2 R U R' U' R' F R2 U' R' U' R U R' F' L2",
};

const cornerMoves = {
  A: "",
  B: "R2 R U' R' U' R U R' F' R U R' U' R' F R R2",
  C: "R2 D' R U' R' U' R U R' F' R U R' U' R' F R D R2",
  D: "F2 R U' R' U' R U R' F' R U R' U' R' F R F2",
  E: "",
  F: "F' D R U' R' U' R U R' F' R U R' U' R' F R D' F",
  G: "F' R U' R' U' R U R' F' R U R' U' R' F R F",
  H: "D' R R U' R' U' R U R' F' R U R' U' R' F R R' D",
  I: "F R' R U' R' U' R U R' F' R U R' U' R' F R R F'",
  J: "R' R U' R' U' R U R' F' R U R' U' R' F R R",
  K: "D' F' R U' R' U' R U R' F' R U R' U' R' F R F D",
  L: "D2 R R U' R' U' R U R' F' R U R' U' R' F R R' D2",
  M: "F R U' R' U' R U R' F' R U R' U' R' F R F'",
  N: "R' F R U' R' U' R U R' F' R U R' U' R' F R F' R",
  O: "D2 F' R U' R' U' R U R' F' R U R' U' R' F R F D2",
  P: "D R R U' R' U' R U R' F' R U R' U' R' F R R' D'",
  Q: "R D' R U' R' U' R U R' F' R U R' U' R' F R D R'",
  R: "",
  S: "D F' R U' R' U' R U R' F' R U R' U' R' F R F D'",
  T: "R R U' R' U' R U R' F' R U R' U' R' F R R'",
  U: "D R U' R' U' R U R' F' R U R' U' R' F R D'",
  V: "R U' R' U' R U R' F' R U R' U' R' F R",
  W: "D' R U' R' U' R U R' F' R U R' U' R' F R D",
  X: "D2 R U' R' U' R U R' F' R U R' U' R' F R D2",
};

const edgeSwapConverter = {
  original: "R U R' U' R' F R2 U' R' U' R U R' F'",
  red: "B U B' U' B' R B2 U' B' U' B U B' R'",
  orange: "F U F' U' F' L F2 U' F' U' F U F' L'",
  whiteReverse: "L U L' U' L' B L2 U' L' U' L U L' B'",
  green: "D F D' F' D' L D2 F' D' F' D F D' L'",
  blue: "R B R' B' R' U R2 B' R' B' R B R' U'",
};

const helpers = [
  `| Index | Corner Position (Piece Location) |
      | ----- | -------------------------------- |
      | 0     | URF (Up-Right-Front)             |
      | 1     | UFL (Up-Front-Left)              |
      | 2     | ULB (Up-Left-Back)               |
      | 3     | UBR (Up-Back-Right)              |
      | 4     | DFR (Down-Front-Right)           |
      | 5     | DLF (Down-Left-Front)            |
      | 6     | DBL (Down-Back-Left)             |
      | 7     | DRB (Down-Right-Back)            |`,
  `| Index | Edge Position (Piece Location) |
      | ----- | ------------------------------ |
      | 0     | UR (Up-Right)                  |
      | 1     | UF (Up-Front)                  |
      | 2     | UL (Up-Left)                   |
      | 3     | UB (Up-Back)                   |
      | 4     | DR (Down-Right)                |
      | 5     | DF (Down-Front)                |
      | 6     | DL (Down-Left)                 |
      | 7     | DB (Down-Back)                 |
      | 8     | FR (Front-Right)               |
      | 9     | FL (Front-Left)                |
      | 10    | BL (Back-Left)                 |
      | 11    | BR (Back-Right)                |`,
  `| Letter | Edge Pair | Corner Pair |
      | ------ | --------- | ----------- |
      | A      | W-B       | Wbo         |
      | B      | W-R       | Wbr         |
      | C      | W-G       | Wgr         |
      | D      | W-O       | Wgo         |
      | E      | O-W       | Owb         |
      | F      | O-G       | Owg         |
      | G      | O-Y       | Oyg         |
      | H      | O-B       | Oyb         |
      | I      | G-W       | Gwo         |
      | J      | G-R       | Gwr         |
      | K      | G-Y       | Gyr         |
      | L      | G-O       | Gyo         |
      | M      | R-W       | Rwg         |
      | N      | R-B       | Rwb         |
      | O      | R-Y       | Ryb         |
      | P      | R-G       | Ryg         |
      | Q      | B-W       | Bwr         |
      | R      | B-O       | Bwo         |
      | S      | B-Y       | Byo         |
      | T      | B-R       | Byr         |
      | U      | Y-G       | Ygo         |
      | V      | Y-R       | Ygr         |
      | W      | Y-B       | Ybr         |
      | X      | Y-O       | Ybo         |`,
];

module.exports = {
  parity,
  cornerSwap,
  edgeMoves,
  cornerMoves,
  edgeSwapConverter,
  helpers,
};
