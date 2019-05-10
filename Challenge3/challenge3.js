// Tuenti Challenge 2019 - Challenge 3
// URL: https://contest.tuenti.net/Challenges?id=3
// Text of the challenge (in case the URL dies)
// Challenge 3 - Origami Punchout
// We've just received a brand new hole puncher and we'd like you to help us to try it out!
// A nice way to get beautiful symmetrical patterns is to fold a piece of paper a few times and then punch some holes in it.
// But before we starting to punch holes blindly, you're tasked with writing a program to predict what the resulting patterns will
// be given a specification of how the folds are made and the locations of the holes on the punched piece of paper.
//
// Input
// The first line N is an integer specifying the number of cases. N cases will follow. Each case is made up of the following:
// W H F P
// Folds
// Punches
//
// Where W is the Width of the folded paper, H is the height of the folded paper, F is the number of folds and P is the number of holes in the folded paper.
// Folds are F lines, each containing a single character from the literal set [LRTB]. Where L, R, T and B stand for Left, Right, Top and Bottom respectively.
// This indicates what side the paper was been folded on in reverse order starting from the folded piece of paper and going backwards to the completely unfolded piece of paper).
// Punches are P lines. Each line has the horizontal and vertical (respectively) coordinates for a punch on the folded paper as x y tuple of integers separated by a single white space.
// The punch coordinates can be seen as positions on a discrete grid where the top left corner of the bounding square of the punch hole has a width and height of one unit.
// The origin of coordinates (0, 0) is always the top left corner and it changes each time the paper is unfolded on the top or left sides. Keep this in mind when computing the coordinates of the holes as the paper is unfolded.
// You can assume the input will be well formed (no invalid numbers, no invalid fold directions, no coordinates outside of the paper area and the number of lines matches the specified amounts, etc.
//
// Output
// N solutions, one for each case n that starts with a single line Case #n: followed by the coordinates of the holes punched in the unfolded paper (one per line) in the same format as the input
// (x and y coordinates separated by a space). The coordinates should be sorted by x, then y, in ascending order.
//
// Limits
// 0 < W < 10000
// 0 < H < 10000
// 0 <= F < 16
// 0 <= P < 100
//
// Sample Input
// Consider the following input:
// 1
// 4 2 2 2
// T
// R
// 0 0
// 2 1
//
// This stands for:
// - One test case
// - 4 units wide, 2 units tall, 2 folds, 2 punchs
// - First fold on the top side
// - Second fold on the right side
// - First punch at x=0, y=0
// Second punch at x=2, y=1
//
// The shape of the piece of folded paper is as follows (where `o` is a punched hole in the paper and `x` an unperforated area):
// ---- ← this is the top side, where the first folding was done
// oxxx
// xxox
// as it has been folded on the top (T), when unfolded it will give the following piece of paper, which is still folded on the right (R)
// xxox|
// oxxx|
// ----| ← this was the top side, now it's the middle vertical
// oxxx|
// xxox|
//     ↑
//     this is the right side, where it’s currently folded
// after unfolding again, this is the resulting final piece of paper:
//     this was the right side, now it's in the middle horizontal
//     ↓
// xxox|xoxx
// oxxx|xxxo
// ----+----
// oxxx|xxxo
// xxox|xoxx
//
// Sample Output
// There are eight holes in the resulting piece of paper when it’s fully unfolded:
// Case #1:
// 0 1
// 0 2
// 2 0
// 2 3
// 5 0
// 5 3
// 7 1
// 7 2

module.exports.start = function(input){
    // We will expect the input is already valid, maybe a good todo is:
    // TODO: Check the input is valid

    // So we know the first item of the input is N, an integer with the number of cases of the input file
    // Let's save it
    let N = parseInt(input[0]);

    // Now we have to iterate each case. We will use a similar system like the one used in the Challenge 2
    let indexOffset = 0;
    
    for(let tCase = 1;tCase<=N && indexOffset<input.length;tCase++){
        // We know the first item on each case is the folded paper data, so let's parse it
        let tmpArr = input[indexOffset+1].split(' ');
        let foldedPaperData = {W:parseInt(tmpArr[0]),H:parseInt(tmpArr[1]),F:parseInt(tmpArr[2]),P:parseInt(tmpArr[3])};

        // There are some limits in the folded paper data var we have to check
        if((foldedPaperData.W>0 && foldedPaperData.W<10000) &&
            (foldedPaperData.H>0 && foldedPaperData.H<10000) &&
            (foldedPaperData.F>=0 && foldedPaperData.F<16) &&
            (foldedPaperData.P>=0 && foldedPaperData.P<100)){

            // Everything is valid, we can continue!
            // Code...
            // And after that increase the offset to go to the next item
            indexOffset+=2;

            // Now iterate the Folds we have to perform
            let folds = [];
            for(let iFold = indexOffset;iFold<indexOffset+foldedPaperData.F;iFold++){
                folds.push(input[iFold]);
            }
            // Once we have iterated every fold, update the indexOffset
            indexOffset+=foldedPaperData.F;

            // Now iterate the Punches we have to perform
            let punches = [];
            for(let iPunch = indexOffset;iPunch<indexOffset+foldedPaperData.P;iPunch++){
                let tmpArr = input[iPunch].split(' ');
                punches.push({x:parseInt(tmpArr[0]),y:parseInt(tmpArr[1])});
            }
            // And update the indexOffset
            indexOffset+=(1+foldedPaperData.F+foldedPaperData.P);

            // Now we have everything loaded, we can start working!!!
            // ...

            // First we create a matrix filled with 0s (it means the paper is not punched in any position)
            // Don't use the following one system or you will question your sanity as explained here: https://stackoverflow.com/a/47057799
            //let paperMatrix = Array(foldedPaperData.H).fill(Array(foldedPaperData.W).fill(0));
            // Better use this system:
            let paperMatrix = new Array();
            for(let iRow=0;iRow<foldedPaperData.H;iRow++){
                paperMatrix[iRow] = [];
                for(let iColumn=0;iColumn<foldedPaperData.W;iColumn++){
                    paperMatrix[iRow].push(0);
                }
            }

            // Let's code first than anything some function to work with that matrix
            function getValAtPos(matrix,x,y){
                return matrix[y][x];
            }

            function setValAtPos(matrix,x,y,val){
                matrix[y][x]=val;
            }

            function unfoldVertically(matrix,x,y){
                let newMatrix = Array(2*y).fill(Array(x).fill(0));
                let newYSize = y*2;
                for(let mY=0;mY<y;mY++){
                    for(let mX=0;mX<x;mX++){
                        let posVal = getValAtPos(matrix,mX,mY);
                        if(posVal==1){
                            let yNew = y+mY;
                            let yNewUnfolded = newYSize-1-yNew;
                            setValAtPos(newMatrix,mX,yNew,1);
                            setValAtPos(newMatrix,mX,yNewUnfolded,1);
                        }
                    }
                }
                return newMatrix;
            }

            function unfoldHorizontally(matrix,x,y){
                let newMatrix = new Array(y).fill(Array(2*x).fill(0));
                let newXSize = x*2;
                for(let mY=0;mY<y;mY++){
                    for(let mX=0;mX<x;mX++){
                        let posVal = getValAtPos(matrix,mX,mY);
                        if(posVal==1){
                            let xNew = newXSize-1-mX;
                            let xNewUnfolded = newXSize-1-xNew;
                            setValAtPos(newMatrix,xNew,mY,1);
                            setValAtPos(newMatrix,xNewUnfolded,mY,1);
                        }
                    }
                }
                return newMatrix;
            }

            function printMatrix(matrix,x,y){
                matrix.forEach(function(row){
                    let lineM = '';
                    row.forEach(function(item){
                        if(item==1){
                            lineM=lineM+"o";
                        }else{
                            lineM=lineM+"x";
                        }
                    });
                    console.log(lineM);
                    //console.dir(row);
                });
            }


            printMatrix(paperMatrix,foldedPaperData.W,foldedPaperData.H);
            

        }else{
            console.error("Case #"+tCase+": Not valid");
            // Since this case is not valid, we update the indexOffset var to the next case
            // This is not really safe and could go really wrong, maybe TODO: Check this since for example negative numbers will break this
            indexOffset+=(1+foldedPaperData.F+foldedPaperData.P);
        }
    }
}