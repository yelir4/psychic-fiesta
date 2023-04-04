//FILE: database.cpp

#ifndef DATABASE_CPP
#define DATABASE_CPP

#define SCOREDATA "files/scoredata.txt"
#include "database.h"

namespace psychic_fiesta {
    database::database(std::string newName, int newScore) {
        topNames = new std::string[5];
        topScores = new int[5];

        // we now want to read scores from SCOREDATA
        std::ifstream iDB;
        iDB.open(SCOREDATA);

        if(iDB.is_open()) {
            for(int i=0; i<5; ++i) {
                    iDB >> topNames[i];
                    iDB >> topScores[i];
            }
        } else {
            std::cout << "cannot open file for reading" << std::endl;
        }

        iDB.close();

        pName = newName;
        pScore = newScore;
    }

    database::~database() {
        delete [] topNames;
        delete [] topScores;
    }

    void database::printScores() {
        for(int i=0; i<5; ++i)
            std::cout << topNames[i] << " " << topScores[i] << std::endl;
    }

    void database::incremScores() {
        for(int i=0; i<5; ++i)
            topScores[i]++;
    }
    
    void database::writeScores() {
        std::ofstream oDB;
        oDB.open(SCOREDATA);

        if(oDB.is_open()) {
            for(int i=0; i<5; ++i) {
                    oDB << topNames[i] << "\n";
                    oDB << topScores[i] << "\n";
            }
        } else {
            std::cout << "cannot open file for writing" << std::endl;
        }

        oDB.close();
    }

    void database::resetScores() {
        if(topScores[0] == 10) {
            for(int i=0; i<5; ++i) {
                    topNames[i] = "nobodys";
                    topScores[i] = i;
            }
        }
    }
}

#endif