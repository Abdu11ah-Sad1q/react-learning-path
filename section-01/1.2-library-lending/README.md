# Task 1.2: Library Lending Logic

## What I Built

A set of plain JavaScript functions that manage lending operations for a small library:

- `calculateDueDate`: Adds 14 days to a given start date.
- `getAvailableCopies`: Returns remaining stock by subtracting active loans from total copies.
- `borrowBook`: Checks availability and prevents duplicate active loans for the same member.
- `returnBook`: Removes the member's loan record using `.filter()`.
- `getOverdueLoans`: Filters all loans where the provided date is past the loan's due date.

## How to Run

From the root of the project:

```bash
node section-01/1.2-library-lending/index.js
```
