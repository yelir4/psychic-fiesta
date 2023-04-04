//FILE: maze.cpp

#ifndef MAZE_CPP
#define MAZE_CPP

#include "maze.h"

namespace psychic_fiesta {
    maze::maze(int initWidth, int initHeight) {
        width = initWidth;
        height = initHeight;
    }

    void maze::construct() {
        std::cout << width << height << std::endl;
    }
}

#endif