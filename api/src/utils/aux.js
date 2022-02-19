export const combineExpenses = (expenses, id) => {
  const newExpenses = [...expenses].reduce((prev, curr) => {
    if (prev[curr[id]]) {
      prev[curr[id]].amount += curr.amount;
      return prev;
    }
    prev[curr[id]] = curr;

    return prev;
  }, {});

  return Object.values(newExpenses);
};
