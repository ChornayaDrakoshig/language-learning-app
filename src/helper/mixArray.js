const mixArray = (arr) => {
    let newArr = [].concat(arr);

    for (let i = 1; newArr.length - i - 1 >= 0; i++) {
        const index = Math.floor(Math.random() * (newArr.length - i));
        const item = newArr[index];
        newArr[index] = newArr[newArr.length - i];
        newArr[newArr.length - i] = item;
      }
    
    return newArr;
}

export default mixArray;
