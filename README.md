# Infinite Carousel System

This project implements a Infinite Carousel System using plain HTML, CSS , and JavaScript. The cards are positioned in a 3D stack and can be dragged. As the cards are dragged, the middle card maintains maximum opacity, while the top and bottom cards opacity decreases depending on their distance from the center card.

## Demo Link
[LINK FOR PROJECT](https://drive.google.com/file/d/1vylUYgR0c8ewtgxgcnEbP5_FQBvtAMHT/view?usp=drive_link)


## Features

- **Drag-and-Drop**: Cards can be clicked and dragged vertically.
- **Opacity Adjustment**: As the cards are dragged, the opacity of the cards changes. The middle card has maximum opacity, while the top and bottom cards have reduced opacity based on their distance from the center.
- **Smooth Transitions**: The cards move smoothly with a `transform` transition and the opacity changes smoothly using Tailwind CSS classes.

## Technologies Used

- **HTML**: Basic structure of the page.
- **CSS**: Used for styling and utility classes for responsive layout and transitions.
- **JavaScript**: Handles the drag-and-drop logic and dynamically adjusts the opacity of the cards.

## Installation

To get started with this project, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/drag-and-drop-cards.git `

1.  **Navigate to the project folder:**

    bash

    `cd Vrit-Technology-Task1`


3.  **Open the project in a browser:**

    -   Open the `index.html` file in your preferred browser to see the drag-and-drop functionality in action.

Usage
-----

1.  **Interact with the Cards:**

    -   Click and drag the cards within the card container.
    -   As you drag, notice how the middle card maintains full opacity, while the cards on top and bottom have reduced opacity based on their distance from the center.
2.  **Customization:**

    -   You can modify the number of cards by adding or removing `<div class="card">` elements within the `card-container`.
    -   You can adjust the opacity scaling factor by changing the value in the `adjustOpacity` function in `script.js`.

How it Works
------------

1.  **Card Container Setup:**

    -   The container uses `position: relative` and `perspective: 1000px` to create the 3D effect.
      
2.  **Drag-and-Drop Logic:**

    -   When a user clicks and drags a card, the `mousedown`, `mouseup`, and `mousemove` events are used to track the drag.
    -   The dragged card's vertical position is updated using the `transform: translateY()` CSS property.
3.  **Opacity Adjustment:**

    -   The opacity of each card is adjusted based on its distance from the center card. The further away a card is from the center, the lower its opacity becomes.



Acknowledgements
----------------


-   **JavaScript**: Used for handling drag-and-drop logic and dynamic opacity adjustments.

