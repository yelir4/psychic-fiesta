//FILE: maze.h

#ifndef MAZE_H
#define MAZE_H

#include <iostream>

namespace psychic_fiesta {
    class maze {
    public:
        maze(int initWidth = 10, int initHeight = 5);
        void construct();
    private:
        int width;
        int height;
    };
}

#endif