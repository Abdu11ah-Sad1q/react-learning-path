const initialBooks = [
  { id: 1, title: "Clean Code", copies: 2 },
  { id: 2, title: "JavaScript: The Good Parts", copies: 1 },
  { id: 3, title: "Design Patterns", copies: 3 },
  { id: 4, title: "Discrete Structures", copies: 5 },
];

const initialLoans = [];

function calculateDueDate(startDateStr) {
  const date = new Date(startDateStr);

  //"2026-10-15T00:00:00.000Z";
  date.setDate(date.getDate() + 14);
  //["2026-10-15", "00:00:00.000Z"];
  return date.toISOString().split("T")[0]; // returns "YYYY-MM-DD"
}

function getAvailableCopies(bookId, books, loans) {
  const book = books.find((b) => b.id === bookId);
  if (!book) return 0;

  // it will return the array of loans that match the bookId
  const borrowedCount = loans.filter((loan) => loan.bookId === bookId).length;
  return book.copies - borrowedCount;
}

function borrowBook(bookId, memberName, borrowDate, books, loans) {
  // Check if book exists
  const book = books.find((b) => b.id === bookId);
  if (!book) {
    return { success: false, error: "Book not found." };
  }

  const existingLoan = loans.find(
    (loan) => loan.bookId === bookId && loan.memberName === memberName,
  );

  if (existingLoan) {
    return {
      success: false,
      error: `${memberName} already borrowed this book on ${existingLoan.borrowDate} (Due: ${existingLoan.dueDate}).`,
      loanDetails: existingLoan,
    };
  }

  const available = getAvailableCopies(bookId, books, loans);
  if (available < 1) {
    return { success: false, error: "No copies available." };
  }

  const newLoan = {
    bookId,
    memberName,
    borrowDate,
    dueDate: calculateDueDate(borrowDate),
  };

  return {
    success: true,
    loans: [...loans, newLoan],
  };
}

function returnBook(bookId, memberName, loans) {
  const loanExists = loans.some(
    (loan) => loan.bookId === bookId && loan.memberName === memberName,
  );

  if (!loanExists) {
    return { success: false, error: "No matching loan record found." };
  }

  const updatedLoans = loans.filter(
    (loan) => !(loan.bookId === bookId && loan.memberName === memberName),
  );

  return {
    success: true,
    loans: updatedLoans,
  };
}

function getOverdueLoans(currentDateStr, loans) {
  return loans.filter((loan) => currentDateStr > loan.dueDate);
}



console.log("Borrowing Copies\n");

// Borrow 1st copy
const op1 = borrowBook(1, "Ali", "2026-09-01", initialBooks, initialLoans);
console.log("Ali borrows copy 1:", op1.success);

// Borrow 2nd copy
const op2 = borrowBook(1, "Ahmad", "2026-09-01", initialBooks, op1.loans);
console.log("Ahmad borrows copy 2:", op2.success);

// Try 3rd copy (Book 1 only has 2 copies)
const op3 = borrowBook(1, "Faraz", "2026-09-01", initialBooks, op2.loans);
console.log("Faraz tries borrowing 3rd copy:", op3.error); // "No copies available."

console.log("\nDuplicate Borrow Rule");
const opDuplicate = borrowBook(1, "Ali", "2026-09-02", initialBooks, op1.loans);
console.log("Ali tries borrowing same book again:", opDuplicate.error);






console.log("\nAvailable Copies & Returning Books");

console.log(
  "Copies available before return:",
  getAvailableCopies(1, initialBooks, op2.loans),
); // 0
const returned = returnBook(1, "Ali", op2.loans);
console.log(
  "Copies available after Ali returns:",
  getAvailableCopies(1, initialBooks, returned.loans),
); // 1






console.log("\nOverdue Check (14-day rule)");

// Ali borrowed on 2026-09-01 -> Due date is 2026-09-15
console.log("Loan due date:", op1.loans[0].dueDate); // 2026-09-15
console.log(
  "Overdue on 2026-09-15?",
  getOverdueLoans("2026-09-15", op1.loans).length > 0,
); // false
console.log(
  "Overdue on 2026-09-16?",
  getOverdueLoans("2026-09-16", op1.loans).length > 0,
); // true






console.log("\nImmutability Check");

console.log("initialLoans original length:", initialLoans.length); // 0 unchanged
console.log("initialBooks copy count unchanged:", initialBooks[0].copies); // 2 unchanged
