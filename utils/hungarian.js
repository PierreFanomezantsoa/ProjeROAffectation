export function hungarianAlgorithm(costMatrix, maximize = false) {
  const steps = [];
  const n = costMatrix.length;
  const m = costMatrix[0].length;
  const size = Math.max(n, m);

  // 🔁 Étape 0 : Transformer la matrice si maximisation
  let matrix = costMatrix.map(row => [...row]); // copie profonde
  if (maximize) {
    const maxVal = Math.max(...matrix.flat());
    matrix = matrix.map(row => row.map(value => maxVal - value));
    steps.push({ step: "Transformation pour maximisation", matrixSnapshot: matrix.map(r => [...r]) });
  }

  // 🔲 Étape 1 : Rendre la matrice carrée si nécessaire
  matrix = Array.from({ length: size }, (_, i) =>
    Array.from({ length: size }, (_, j) =>
      i < n && j < m ? matrix[i][j] : 0
    )
  );

  // Étape 2 : Soustraction des minimums de chaque ligne
  for (let i = 0; i < size; i++) {
    const rowMin = Math.min(...matrix[i]);
    for (let j = 0; j < size; j++) {
      matrix[i][j] -= rowMin;
    }
  }
  steps.push({ step: "Soustraction ligne", matrixSnapshot: matrix.map(r => [...r]) });

  // Étape 3 : Soustraction des minimums de chaque colonne
  for (let j = 0; j < size; j++) {
    let colMin = Infinity;
    for (let i = 0; i < size; i++) colMin = Math.min(colMin, matrix[i][j]);
    for (let i = 0; i < size; i++) matrix[i][j] -= colMin;
  }
  steps.push({ step: "Soustraction colonne", matrixSnapshot: matrix.map(r => [...r]) });

  // Initialisation
  const starred = Array.from({ length: size }, () => Array(size).fill(false));
  const primed = Array.from({ length: size }, () => Array(size).fill(false));
  const rowCover = Array(size).fill(false);
  const colCover = Array(size).fill(false);

  // Étape 4 : Étoiler les zéros uniques
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (matrix[i][j] === 0 && !rowCover[i] && !colCover[j]) {
        starred[i][j] = true;
        rowCover[i] = true;
        colCover[j] = true;
      }
    }
  }
  rowCover.fill(false);
  colCover.fill(false);

  // Couvrir les colonnes contenant des étoiles
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (starred[i][j]) colCover[j] = true;
    }
  }

  // Fonctions utilitaires
  const RecherZero = () => {
    for (let i = 0; i < size; i++) {
      if (!rowCover[i]) {
        for (let j = 0; j < size; j++) {
          if (matrix[i][j] === 0 && !colCover[j]) return [i, j];
        }
      }
    }
    return [-1, -1];
  };

  const findStarInRow = (row) => starred[row].findIndex(val => val);
  const findStarInCol = (col) => starred.findIndex(row => row[col]);
  const findPrimeInRow = (row) => primed[row].findIndex(val => val);

  const augmentPath = (path) => {
    for (const [i, j] of path) starred[i][j] = !starred[i][j];
  };

  const clearPrimes = () => {
    for (let i = 0; i < size; i++) primed[i].fill(false);
  };

  // 🔄 Boucle principale
  while (colCover.filter(Boolean).length < size) {
    let [zRow, zCol] = RecherZero();
    while (zRow !== -1) {
      primed[zRow][zCol] = true;
      const starCol = findStarInRow(zRow);
      if (starCol !== -1) {
        rowCover[zRow] = true;
        colCover[starCol] = false;
      } else {
        const path = [[zRow, zCol]];
        let row = zRow, col = zCol;
        while (true) {
          const starRow = findStarInCol(col);
          if (starRow === -1) break;
          path.push([starRow, col]);
          col = findPrimeInRow(starRow);
          path.push([starRow, col]);
        }
        augmentPath(path);
        rowCover.fill(false);
        colCover.fill(false);
        clearPrimes();
        for (let i = 0; i < size; i++) {
          for (let j = 0; j < size; j++) {
            if (starred[i][j]) colCover[j] = true;
          }
        }
        break;
      }
      [zRow, zCol] = RecherZero();
    }

    // Aucun zéro non couvert : ajustement
    if (zRow === -1) {
      let minUncovered = Infinity;
      for (let i = 0; i < size; i++) {
        if (!rowCover[i]) {
          for (let j = 0; j < size; j++) {
            if (!colCover[j]) minUncovered = Math.min(minUncovered, matrix[i][j]);
          }
        }
      }
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          if (rowCover[i] && colCover[j]) matrix[i][j] += minUncovered;
          else if (!rowCover[i] && !colCover[j]) matrix[i][j] -= minUncovered;
        }
      }
      steps.push({ step: "Ajustement", matrixSnapshot: matrix.map(r => [...r]) });
    }
  }

  // Résultat final
  const assignment = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (starred[i][j]) assignment.push([i, j]);
    }
  }

  const totalCost = assignment.reduce((sum, [i, j]) => sum + costMatrix[i][j], 0);
  return { assignment, totalCost, steps };
}
