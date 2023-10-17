// Brainfuck:

// Support for nested loops
// error handling in case of inconsistent numbers of [ or ]
// handling overflow range per memory block [0 - 255]

// > = increases memory pointer, or moves the pointer to the right 1 block.
// < = decreases memory pointer, or moves the pointer to the left 1 block.
// + = increases value stored at the block pointed to by the memory pointer
// - = decreases value stored at the block pointed to by the memory pointer
// [ = like c while(cur_block_value != 0) loop.
// ] = if block currently pointed to's value is not zero, jump back to [
// , = like c getchar(). input 1 character (convert to ASCII).
// . = like c putchar(). print 1 character to the console (convert from ASCII)

import fs from 'fs';

const data = fs.readFileSync('./code.txt').toString();
const buffer: number[] = [];
let index = 0;
const loopCharIndex: number[] = [];
const loopBufferIndex: number[] = [];

let res = '';

const error = Array.from(data).filter(char => char === '[').length !== Array.from(data).filter(char => char === ']').length;
if(error){
    console.error('cacca puzza');
    process.exit();
}

for (let i = 0; i < data.length; i++) {
    const char = data[i];
    switch (char) {
        case '>':
            index++;
            break;
        case '<':
            index--;
            break;
        case '+':
            if (buffer[index]) {
                buffer[index] == 255 ? buffer[index] = 0 : buffer[index]++ ;
            } else {
                buffer[index] = 1;
            }
            break;
        case '-':
            if (buffer[index]) {
                buffer[index] == 0 ? buffer[index] = 255 : buffer[index]-- ;
            } else {
                buffer[index] = 255;
            }
            break;
        case '[':
            loopCharIndex.push(i);
            loopBufferIndex.push(index);
            break;
        case ']':
            if (buffer[loopBufferIndex[loopBufferIndex.length - 1]] !== 0) {
                i = loopCharIndex[loopCharIndex.length - 1];
            }else{
                loopCharIndex.pop();
                loopBufferIndex.pop();
            }
            break;
        case ',':
            const prompt = require('prompt-sync')();
            buffer[index] = (<string>prompt('Insert Data:')).charCodeAt(0);
            break;
        case '.':
            res += String.fromCharCode(buffer[index]);
            break;
        default:
            break;
    }
}

console.log(res);
