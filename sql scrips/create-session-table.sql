CREATE TABLE Sessions(
  Sid varchar(255) NOT NULL
    CONSTRAINT PK_Sessions PRIMARY KEY CLUSTERED (Sid ASC),
  Expires datetimeoffset NOT NULL,
  Sess nvarchar(MAX) NULL
)