// FILE: main.cpp
//
//
#include "maze.h"
#include "database.h"

using namespace psychic_fiesta;

#define DEBUG

int main(int argc, char *argv[]) {
    maze mazeOne(4, 4);
    mazeOne.construct();

    database dbOne("cwom", 23);
    dbOne.incremScores();
    dbOne.resetScores();
    dbOne.printScores();
    dbOne.writeScores();

    
    return 0;
}
