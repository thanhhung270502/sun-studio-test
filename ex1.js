let list = {};

function pickUpSticks(n) {
	if (n in list) {
        console.log(n, list[n]);
        return list[n];
    }
    let count = 1;
    for (let i = 1; i < n; i++) {
        count += pickUpSticks(i);
    }
    console.log(count);
    list[n] = count;
    return count;
};