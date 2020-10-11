function computeTree(cumuls, step = cumuls, index = 0) {
  const { length } = step;
  if (step === 1) {
    return { min: cumuls[index], max: cumuls[index + 1], index };
  }
  const middle = Math.trunc(length / 2);
  const next = index + middle;
  const smaller = step.slice(0, middle);
  const bigger =
    next === cumuls.length - 1 ? [] : step.slice(middle + 1, length);
  return {
    index: next,
    min: cumuls[next],
    max: cumuls[next + 1],
    left: smaller.length ? computeTree(cumuls, smaller, index) : undefined,
    right: bigger.length ? computeTree(cumuls, bigger, next + 1) : undefined,
  };
}

// export function findInTreeSize(tree, seuil) {
//   const { min, max, index, left, right } = tree;
//   if (seuil >= min && seuil < max) {
//     return index;
//   }
//   if (seuil < min && left) {
//     return findInTreeSize(left, seuil);
//   }
//   if (seuil > max && right) {
//     return findInTreeSize(right, seuil);
//   }
//   return 0;
// }

export function findInTreeSize(tree, seuil) {
  const stack = [tree];
  while (stack.length) {
    const current = stack.pop();
    const { min, max, index, left, right } = current;

    if (seuil >= min && seuil < max) {
      return index;
    }
    if (seuil < min && left) {
      stack.push(left);
    }
    if (seuil > max && right) {
      stack.push(right);
    }
  }

  return 0;
}

export function findCumulsSize(cumuls, seuil) {
  return cumuls.reduce(function (i, c, j) {
    if (j < cumuls.length - 2) {
      if (seuil >= c && seuil < cumuls[j + 1]) {
        return j;
      }
    }
    return i;
  }, 0);
}

export default computeTree;
