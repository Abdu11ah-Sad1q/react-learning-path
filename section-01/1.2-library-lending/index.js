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