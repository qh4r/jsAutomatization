x = 'test';

// broken on purpose
for(var i = 0; i<9; i++){
    setTimeout(() => console.log(x+i));
}

