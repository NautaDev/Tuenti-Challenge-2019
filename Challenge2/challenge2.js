// Tuenti Challenge 2019 - Challenge 2
// URL: https://contest.tuenti.net/Challenges?id=2
// Text of the challenge (in case the URL dies)
// Challenge 2 - Help Battlestar Galactica and save humanity
// The Galactica spaceship must escape from Cylon persecution. Moreover,
// Adama (Battlestar Galactica's commander) and Laura Roslin (President of the 12 Colonies) want to reach a new home for humanity.
// Right now, Galactica is waiting on a planet and wants to go to New Earth (Adama knows where it is).
// But, to avoid being caught by the Cylon, Adama is planning to visit some other planets before heading towards the final destination.
// Gaius Baltar is a little busy right now, so you will be the one who saves humanity.
// And, just to be sure it's worth the trouble, Adama asks you how many different paths can be taken from your current planet to the final destination.
//
// Because of some complicated laws of physics, you can't go everywhere from every planet.
// And, because you don't want to backtrack, the Battlestar must always go forwards to another planet that’s allowed by the laws of hyperspace jumps,
// so there can't be any loops.	See the chart showing possible situations for an explanation.
//
// In order to explain all above, let’s see this graph, that represents a possible situation:
// (I will add it to the repo also)
// https://contest.tuenti.net/resources/2019/img/galactica-graph.png
//
// How many paths are there for the Galactica to reach New Earth? If you count them you can see there are 5 different paths.
// - Path 1: Galactica -> A -> E -> New Earth
// - Path 2: Galactica -> A -> D -> F -> New Earth
// - Path 3: Galactica -> B -> D -> F -> New Earth
// - Path 4: Galactica -> C -> D -> F -> New Earth
// - Path 5: Galactica -> C -> F -> New Earth
//
// Your goal is to help Adama and Laura by writing a program that
// will output the number of different paths to reach New Earth given a random map like the one above so they can make a decision.
//
// Assumptions:
// - The map has no loops. From any given planet you can only go forward to another planet.
// - There is at least one path to every planet, except the planet where the Galactica is waiting (the initial planet).
// - All planets, except New Earth which is the final planet, have at least one path to move forwards.
//
// Input
// The first line of the file has the number of cases. Each case starts with a line containing the number P of planets from which you are able to jump.
// After that there is one line for every planet (except “New Earth”) with a comma separated list of allowed hyperspace jumps for that planet.
// So, each case will have this format:
// P
// Galactica:Destination1,Destination2,..,DestinationM
// Destination1:DestinationX,DestinationY
// ...
// DestinationZ:New Earth
//
// The first planet will always be named “Galactica” and the final planet will always be named “New Earth”.
//
// Output
// Your output should be an integer with the number of different paths with one line for each case.
//
// Limits
// 1 <= P < 200
//
// Sample Input
// 1
// 7
// Galactica:A,B,C
// A:E,D
// B:D
// C:D,F
// D:F
// E: New Earth
// F: New Earth
//
// Sample Output
// Case #1: 5


module.exports.start = function(input){
    // We will expect the input is already valid, maybe a good todo is:
    // TODO: Check the input is valid
    console.dir(input);
    
}