// Tuenti Challenge 2019 - Challenge 1
// URL: https://contest.tuenti.net/Challenges?id=1
// Text of the challenge (in case the URL dies)
// Challenge 1 - Onion wars
// You are celebrating your 20 months anniversary at Tuenti today! As part of the celebration,
// you have decided to bring some good tortilla española for your coworkers,
// but you realize that each person only eats tortillas with or without onion.
//
// Given that each person eats half tortilla, what is the minimum number of tortillas you need to ensure that everyone gets their share?
// Keep in mind that you can only bring whole tortillas, with or without onion.
//
// Note: although it would be correct to bring only tortilla with onion since a tortilla without onion is horrible,
// we don't want to start an internal war over this, so we want you to bring enough food for both groups.
//
// Input
// The first line has an integer C, which is the number of cases for the problem.
// Then C lines follow and each one has two integers N and M, which are the number of people that want tortillas with and without onion, respectively.
//
// Output
// For each case, there should be a line starting with "Case #x: " followed by the minimum number of tortilla you must bring.
//
// Limits
// 1 <= C <= 100
// 0 <= N, M <= 100000
// 1 <= N + M
//
// Sample Input
// 3
// 2 2
// 3 2
// 0 1
//
// Sample Output
// Case #1: 2
// Case #2: 3
// Case #3: 1
//
// In the first case, we need one tortilla per group.
// In the second case, we need two tortillas (since it is not possible to only bring one and a half) with onions and one without onions.
// In the third case, we only need half of a tortilla with onion, but we bring one since they are indivisible.

module.exports.start = function(input){
    // We will expect the input is already valid, maybe a good todo is:
    // TODO: Check the input is valid

    // In this challenge the first element is a single number with the length of the input array (maybe it is useful in cases like loading the file in other languages)
    // It is called C, we could not use it since we can use length but... we are going to use it anyways, just to do it as everyone
    let C = parseInt(input[0]);
    // Now we need an array with just the items which are pairs so let's parse the input var
    let inputData = [];
    for(let i=1;i<=C && i<input.length;i++){
        let currentItem = input[i].split(' ');
        // The question use the name N for the first item in the pair and M for the second one, we will do the same
        inputData.push({n:parseInt(currentItem[0]),m:parseInt(currentItem[1])});
        // Of course, this is not really safe, as I said before we should do a lot of validation to avoid potential errors in our input
        // But right now this is just a working code, not a perfect code
    }

    // Now, just calculate the "tortillas" of each type:

    // This is just a limit set by the challenge itself
    if(C<1||C>100){
        console.error("C must be between 1 and 100");
        return;
    }

    // I use i=1 and not i=0 just because it is more useful in this case
    // to keep the answer simple, but you can use i=0, just do a few change in the code
    for(var i=1;i<=C;i++){
        let currentElement = inputData[i-1];
        let N = currentElement.n;
        let M = currentElement.m;

        // This if checks for other limits set by the challenge itself
        if(N>=0&&M>=0&&N<=100000&&M<=100000&&(N+M)>=1){
            // I use Math.trunc because if not N/2 can give numbers with decimals
            let tortillas = 0;tortillas+=Math.trunc(N/2);
            if(N%2!=0){
                tortillas+=1;
            }
            tortillas+=Math.trunc(M/2);
            if(M%2!=0){
                tortillas+=1;
            }
            console.log("Case #"+i+": "+tortillas);
        }else{
            console.log("Case #"+i+": Not valid");
        }
    }
}