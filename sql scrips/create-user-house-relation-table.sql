CREATE TABLE BillCleave.UserHouseRelation(
                        userId INT FOREIGN KEY (userId) 
                        REFERENCES BillCleave.Users(userId) NOT NULL,
                        houseId INT FOREIGN KEY (houseId) 
                        REFERENCES BillCleave.Houses(houseId) NOT NULL,
                        )