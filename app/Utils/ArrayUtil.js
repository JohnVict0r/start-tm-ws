module.exports = {
  mostOccurenceArray: (arr) => {
    const counts = arr.reduce((a, c) => {
      a[c] = (a[c] || 0) + 1;
      return a;
    }, {});
    const maxCount = Math.max(...Object.values(counts));
    const mostFrequent = Object.keys(counts).filter(
      (k) => counts[k] === maxCount
    );

    return mostFrequent;
  },

  groupBy: (list, keyGetter) => {
    const map = new Map();
    list.forEach((item) => {
      const key = keyGetter(item);

      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return Array.from(map.values());
  },

  singleArray: (array) => [].concat.apply([], Object.values(array))
};
