export function hungarianAlgorithm(costMatrix, maximize = false) {
  const steps = [];
  const n = costMatrix.length;
  const m = costMatrix[0].length;
  const size = Math.max(n, m);

  let matrix = costMatrix.map(row => [...row]);
  if (maximize) {
    const maxVal = Math.max(...matrix.flat());
    matrix = matrix.map(row => row.map(value => maxVal - value));
    steps.push({
      step: "Transformation pour maximisation",
      matrixSnapshot: matrix.map(r => [...r])
    });
  }

  matrix = Array.from({ length: size }, (_, i) =>
    Array.from({ length: size }, (_, j) => (i < n && j < m ? matrix[i][j] : 0))
  );

  // Soustraction ligne
  for (let i = 0; i < size; i++) {
    const rowMin = Math.min(...matrix[i]);
    for (let j = 0; j < size; j++) matrix[i][j] -= rowMin;
  }
  steps.push({
    step: "Soustraction ligne",
    matrixSnapshot: matrix.map(r => [...r])
  });

  // Soustraction colonne
  for (let j = 0; j < size; j++) {
    let colMin = Infinity;
    for (let i = 0; i < size; i++) colMin = Math.min(colMin, matrix[i][j]);
    for (let i = 0; i < size; i++) matrix[i][j] -= colMin;
  }
  steps.push({
    step: "Soustraction colonne",
    matrixSnapshot: matrix.map(r => [...r])
  });

  const starred = Array.from({ length: size }, () => Array(size).fill(false));
  const primed = Array.from({ length: size }, () => Array(size).fill(false));
  const rowCover = Array(size).fill(false);
  const colCover = Array(size).fill(false);

  // Marquage initial (étoiles)
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (matrix[i][j] === 0 && !rowCover[i] && !colCover[j]) {
        starred[i][j] = true;
        rowCover[i] = true;
        colCover[j] = true;
      }
    }
  }

  const rowCoverSnapshot = [...rowCover];
  const colCoverSnapshot = [...colCover];
  rowCover.fill(false);
  colCover.fill(false);

  steps.push({
    step: "Marquage initial (étoiles)",
    matrixSnapshot: matrix.map(r => [...r]),
    markedZeros: getMarkedZeros(starred),
    crossedCells: getCovered(rowCoverSnapshot, colCoverSnapshot)
  });

  // Couvrir colonnes contenant une étoile
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (starred[i][j]) colCover[j] = true;
    }
  }

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

  const findStarInRow = row => starred[row].findIndex(val => val);
  const findStarInCol = col => starred.findIndex(row => row[col]);
  const findPrimeInRow = row => primed[row].findIndex(val => val);
  const augmentPath = path => path.forEach(([i, j]) => starred[i][j] = !starred[i][j]);
  const clearPrimes = () => primed.forEach(row => row.fill(false));

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

        // ✅ Ajout des barres sur lignes/colonnes couvertes dans Affectation améliorée
        steps.push({
          step: "Affectation améliorée",
          matrixSnapshot: matrix.map(r => [...r]),
          markedZeros: getMarkedZeros(starred),
          circledZeros: getCircledZeros(primed),
          crossedCells: getCovered([...rowCover], [...colCover])
        });

        break;
      }
      [zRow, zCol] = RecherZero();
    }

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

      steps.push({
        step: "Ajustement de la matrice",
        matrixSnapshot: matrix.map(r => [...r]),
        crossedCells: getCovered(rowCover, colCover)
      });
    }
  }

  const assignment = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (starred[i][j]) assignment.push([i, j]);
    }
  }
  const totalCost = assignment.reduce((sum, [i, j]) => sum + costMatrix[i][j], 0);

  steps.push({
    step: "Résultat final",
    matrixSnapshot: matrix.map(r => [...r]),
    markedZeros: getMarkedZeros(starred)
  });

  return { assignment, totalCost, steps };
}

function getMarkedZeros(starred) {
  const list = [];
  starred.forEach((row, i) =>
    row.forEach((val, j) => {
      if (val) list.push({ row: i, col: j });
    })
  );
  return list;
}

function getCircledZeros(primed) {
  const list = [];
  primed.forEach((row, i) =>
    row.forEach((val, j) => {
      if (val) list.push({ row: i, col: j });
    })
  );
  return list;
}

function getCovered(rowCover, colCover) {
  const crossed = [];
  rowCover.forEach((v, i) => {
    if (v) for (let j = 0; j < colCover.length; j++) crossed.push({ row: i, col: j });
  });
  colCover.forEach((v, j) => {
    if (v) for (let i = 0; i < rowCover.length; i++) crossed.push({ row: i, col: j });
  });
  return crossed;
}
