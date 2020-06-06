CREATE TABLE BillCleave.Users(
            userId INT IDENTITY(1,1) PRIMARY KEY,
            username VARCHAR(26),
            email VARCHAR(26),
            "password" VARCHAR(255),
);