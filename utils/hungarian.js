export function hungarianAlgorithm(costMatrix) {
  const steps = [];
  const n = costMatrix.length;
  const m = costMatrix[0].length;
  const size = Math.max(n, m);

  // Étape 0 : Rendre la matrice carrée si nécessaire (ajout de lignes ou colonnes 0)
  const matrix = Array.from({ length: size }, (_, i) =>
    Array.from({ length: size }, (_, j) =>
      i < n && j < m ? costMatrix[i][j] : 0
    )
  );

  // Étape 1 : Soustraction des minimums de chaque ligne
  for (let i = 0; i < size; i++) {
    const rowMin = Math.min(...matrix[i]);
    for (let j = 0; j < size; j++) {
      matrix[i][j] -= rowMin;
    }
  }
  steps.push({ step: "Soustraction ligne", matrixSnapshot: matrix.map(r => [...r]) });

  // Étape 2 : Soustraction des minimums de chaque colonne
  for (let j = 0; j < size; j++) {
    let colMin = Infinity;
    for (let i = 0; i < size; i++) colMin = Math.min(colMin, matrix[i][j]);
    for (let i = 0; i < size; i++) matrix[i][j] -= colMin;
  }
  steps.push({ step: "Soustraction colonne", matrixSnapshot: matrix.map(r => [...r]) });

  // Initialisation pour les étapes suivantes
  const starred = Array.from({ length: size }, () => Array(size).fill(false));
  const primed = Array.from({ length: size }, () => Array(size).fill(false));
  const rowCover = Array(size).fill(false);
  const colCover = Array(size).fill(false);

  // Étape 3 : Étoiler les zéros uniques dans leur ligne/colonne
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

  const findZero = () => {
    for (let i = 0; i < size; i++) {
      if (!rowCover[i]) {
        for (let j = 0; j < size; j++) {
          if (matrix[i][j] === 0 && !colCover[j]) {
            return [i, j];
          }
        }
      }
    }
    return [-1, -1];
  };

  const findStarInRow = (row) => {
    for (let j = 0; j < size; j++) if (starred[row][j]) return j;
    return -1;
  };

  const findStarInCol = (col) => {
    for (let i = 0; i < size; i++) if (starred[i][col]) return i;
    return -1;
  };

  const findPrimeInRow = (row) => {
    for (let j = 0; j < size; j++) if (primed[row][j]) return j;
    return -1;
  };

  const augmentPath = (path) => {
    for (const [i, j] of path) {
      starred[i][j] = !starred[i][j];
    }
  };

  const clearPrimes = () => {
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) primed[i][j] = false;
    }
  };

  // Boucle principale
  while (colCover.filter(Boolean).length < size) {
    let [zRow, zCol] = findZero();
    while (zRow !== -1) {
      primed[zRow][zCol] = true;
      const starCol = findStarInRow(zRow);
      if (starCol !== -1) {
        rowCover[zRow] = true;
        colCover[starCol] = false;
      } else {
        // Construire le chemin alterné
        const path = [[zRow, zCol]];
        let row = zRow;
        let col = zCol;
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
      [zRow, zCol] = findZero();
    }

    if (zRow === -1) {
      // Ajustement de la matrice
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

  // Extraction des affectations finales
  const assignment = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (starred[i][j]) {
        assignment.push([i, j]);
      }
    }
  }

  const totalCost = assignment.reduce((sum, [i, j]) => sum + costMatrix[i][j], 0);
  return { assignment, totalCost, steps };
}
