export const sortItemsOrderBasedOnKeysV1 = (arrKeys, arrObjs) => {
  arrObjs.sort((a, b) => {
    const indexA = arrKeys.indexOf(String(a.id));
    const indexB = arrKeys.indexOf(String(b.id));

    if (indexA === -1 && indexB === -1) {
      // If both IDs are not found in orderArray, maintain their original order
      return 0;
    }
    if (indexA === -1) {
      // If ID A is not found, move it to the end
      return 1;
    }
    if (indexB === -1) {
      // If ID B is not found, move it to the end
      return -1;
    }
    // Compare the indexes to sort based on orderArray
    return indexA - indexB;
  });
  return arrObjs;
};
