function customCompare(a, b, custom_list) {
    let aIndex = custom_list.indexOf(a)
    let bIndex = custom_list.indexOf(b)
    if (aIndex > bIndex) {
        return 1
    }
    else if (bIndex > aIndex) {
        return 0
    }
    else {
        return 0
    }
}

export function Sort(arr, arrayList, customList) {
    const length = arr.length;
    for (let i = 0; i < length; i++) {
        let min = arr[i];
        let minIndex = i;
        for (let j = i; j < length; j++) {
            if (customCompare(min, arr[j], customList)) {
                min = arr[j];
                minIndex = j;
            }
        }
        arrayList = arrayList.map(function (value, index, array) {
            [value[minIndex], value[i]] = [value[i], value[minIndex]];
            return value
        })
    }
    return arrayList;
}

