# Kanban Board

A simple task board (React + Tailwind) with To do, Doing and Done columns.

## Run

```
npm install
npm run dev
```

## Features

- Add a card (title required, description optional) to To do
- Move cards left/right between columns
- Delete a card (asks for confirmation)
- Each column shows its card count
- Doing holds at most 3 cards

## Where the data lives

```
+-----------------------------------------------+
| App                                           |
|   cards = [ {id, title, description, column} ]|   <- the only place data is stored
|   addCard(), moveCard(), deleteCard()         |
+-----------------------------------------------+
        |  filter by column + functions as props
        v
+---------+     +---------+     +---------+
| Column  |     | Column  |     | Column  |
| To do   |     | Doing   |     | Done    |
| (2)     |     | (1)     |     | (0)     |
+---------+     +---------+     +---------+
     |               |
     v               v
   Card            Card        buttons call the functions
                               from App, and App updates
                               `cards` (data goes down,
                               events go back up)
```

Each column gets only the cards whose `column` matches its name, so the
count in the header is just `cards.length` and is always correct.
