// First we use minimist to get the args sent to the program in
// a beautiful way
var argv = require('minimist')(process.argv.slice(2));
// And enable the use of the fs module to use the filesystem
var fs = require('fs');
// Also we have to use the readline module to help to parse the input files
var readline = require('readline');

// There are two args:
// -f "path" is used when the challenge needs an input file
// -c # is used to specify the challenge to do (between 1-9)

var challengeNumber = undefined;
var inputFilePath = undefined;

// Check if the challenge is specified
if(!("c" in argv)){
    console.error("You need to specify the challenge. Use -c #");
    process.exit(1); // End the app showing an error code
}else{
    // Check if the challenge specified is valid
    challengeNumber = argv["c"];
    if(isNaN(challengeNumber) || challengeNumber<1 || challengeNumber>9){
        console.error("You need to specify a valid challenge. A number between 1 and 9.");
        process.exit(1);
    }
}

// Check if the input file for the challenge is specified
if(!("f" in argv)){
    console.error("You need to specify the input file. Use -f path");
    process.exit(1); // End the app showing an error code
}else{
    // Check if the challenge specified is valid
    inputFilePath = argv["f"];

    // Handle possible errors
    try{
        // Like if the path is not a file
        if(fs.statSync(inputFilePath).isFile()===false){
            console.error("The specified path for the input file is not a file!");
            process.exit(1);
        }
    }catch(err){
        // Like if the file doesn't exist
        if(err.code === 'ENOENT'){
            console.error("The specified file doesn't exist!");
        // Or whatever other error
        }else{
            throw err;
        }
        process.exit(1);
    }
}

// If we are here, everything is fine and ready to load the input and send it to the correct challenge
// We need to read the file line by line and parse it correctly

// This is an array where we place the parsed input and this is what we send to each Challenge input
var argArr = [];

// With this code we load the entire file in a temporal var, each not empty line as an item
// Note: This is not recommended when loading huge files but for this it is OK
let temporalArg = fs.readFileSync(inputFilePath,'utf-8').split(/\r\n|\r|\n/).filter(Boolean);

// Now we need to parse that input
temporalArg.forEach(function(item){
    let itemArr = item.split(' ');
    let itemToPush = undefined;

    if(itemArr.length<1){
        console.log("Skipping this line, it is not valid!");
    }else if(itemArr.length>=2 && challengeNumber!=2){
        // We only parse the first two items of this line, why did you enter more???
        argArr.push({x:itemArr[0],y:itemArr[1]});
    }else{
        // This can only be itemArr.length === 1 or some challenge who doesn't have keys
        argArr.push(item);
    }
});

// And now send it to the right challenge
switch(challengeNumber){
    case 1:
        require('./Challenge1/challenge1').start(argArr);
        break;
    case 2:
        require('./Challenge2/challenge2').start(argArr);
        break;
    default:
        console.error("You should never reach this point, now you are here so how are you? :)");
        break;
}