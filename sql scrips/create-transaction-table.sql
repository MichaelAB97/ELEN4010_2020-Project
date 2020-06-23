CREATE TABLE BillCleave.Transactions(
            transId INT IDENTITY(1,1) PRIMARY KEY,
            userId INT FOREIGN KEY (userId) 
            REFERENCES BillCleave.Users(userId) NOT NULL,
            "type" VARCHAR(26),
            memberId INT FOREIGN KEY (memberId) 
            REFERENCES BillCleave.Users(userId),
            "service" VARCHAR(26),
            amount INT,
            houseId INT FOREIGN KEY (houseId) 
            REFERENCES BillCleave.Houses(houseId) NOT NULL,
            "status" VARCHAR(255),
);