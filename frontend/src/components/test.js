function dupe(arr) {
  let newArr = [];
  let temp;
  let isDupe = 0;

  newArr.push(arr[0]);

  for (let i = 1; i < arr.length; i++) {
    for (let x = 0; x < newArr.length; x++) {
      if (arr[i] === newArr[x]) {
        isDupe = arr[i];
      } else {
        temp = arr[i];
      }
    }

    if (isDupe != temp) {
      newArr.push(temp);
    }
  }

  console.log(newArr);
}

dupe([2, 4, 6, 2, 3, 4]);

function dupe(arr) {
  let temp = [];
  let isDupe = false;

  temp.push(arr[0]);

  for (let i = 0; i < arr.length; i++) {
    isDupe = false;

    for (let j = 0; j < temp.length; j++) {
      if (arr[i] === temp[j]) {
        isDupe = true;
      }
    }

    if (!isDupe) {
      temp.push(arr[i]);
    }
  }

  console.log(temp);
}

dupe([2, 4, 6, 2, 3, 4]);
