SELECT
transId,
u1.username AS authorUsername,
u1.firstName AS authorFirst,
u1.lastName AS authorLast,
u1.email AS authorEmail,
u2.username AS receiptUsername,
u2.firstName AS receiptFirst,
u2.lastName AS receiptLast,
u2.email AS receiptEmail,
"type",
"service",
amount,
H.houseId,
houseName,
"status"
FROM BillCleave.Users u1
JOIN BillCleave.Transactions T ON u1.userId = T.userId
LEFT JOIN BillCleave.Users u2 ON u2.userId = T.memberId
JOIN BillCleave.Houses H ON H.houseId = T.houseId