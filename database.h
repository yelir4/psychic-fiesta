//FILE: database.h

#ifndef DATABASE_H
#define DATABASE_H

#include <fstream>
#include <iostream>
#include <cstring>

namespace psychic_fiesta {
    class database {
    public:

        database(std::string newName = "nobodys", int newScore = 0);
        ~database();
        void printScores();
        void incremScores();
        void writeScores();
        void resetScores();
    private:
        std::string pName;
        int pScore;
        std::string *topNames;
        int *topScores;
    };
}

#endif