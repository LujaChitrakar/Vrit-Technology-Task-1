document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");
  const cards = Array.from(container.querySelectorAll(".card"));

  let isDragging = false;
  let startY = 0;
  let currentY = 0;
  let deltaY = 0;
  const DRAG_THRESHOLD = 10;
  let currentIndex = 0;

  // Function to update card positions based on the current index
  function updateCardPositions() {
    cards.forEach((card, index) => {
      // Calculate the relative position of each card
      const offset = (index - currentIndex + cards.length) % cards.length;

      // Reset transforms first to ensure clean state
      card.style.transition =
        "transform 0.6s ease-in-out, opacity 0.6s ease-in-out"; // Smoother transition with more time

      // Center card (no scaling)
      if (offset === 0) {
        card.style.transform = `translateY(0px) scale(1)`; // Center card is normal size
        card.style.opacity = "0.9";
        card.style.zIndex = "9";
      } else if (offset === 1) {
        card.style.transform = `translateY(180px) scale(0.8)`;
        card.style.opacity = "0.6";
        card.style.zIndex = "5";
      }
      // Top card (10px higher, smaller)
      else if (offset === 2) {
        card.style.transform = `translateY(-180px) scale(0.8)`;
        card.style.opacity = "0.6";
        card.style.zIndex = "3";
      }
    });
  }

  function startDrag(e) {
    // Prevent default to stop text selection and other interactions
    e.preventDefault();

    isDragging = true;
    startY = e.clientY;
    currentY = e.clientY;

    // Remove transition for smooth dragging
    cards.forEach((card) => (card.style.transition = "none"));
  }

  function drag(e) {
    if (!isDragging) return;

    // Prevent default to stop text selection
    e.preventDefault();

    // Calculate the total drag distance
    currentY = e.clientY;
    deltaY = currentY - startY;

    // Provide visual feedback during drag
    cards.forEach((card, index) => {
      const baseTransform =
        index === currentIndex
          ? 0
          : index === (currentIndex + 1) % cards.length
          ? 180
          : index === (currentIndex - 1 + cards.length) % cards.length
          ? -180
          : 0;

      // Apply drag effect, but prevent excessive movement
      card.style.transform = `translateY(${
        baseTransform + Math.min(Math.max(deltaY, -20), 20)
      }px) scale(${1 - Math.abs(deltaY) / 1000})`;
    });
  }

  function stopDrag(e) {
    if (!isDragging) return;

    isDragging = false;

    // Determine direction and decide whether to change cards
    if (Math.abs(deltaY) > DRAG_THRESHOLD) {
      // Dragging down
      if (deltaY < 0) {
        currentIndex = (currentIndex + 1) % cards.length;
      }
      // Dragging up
      else {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
      }
    }

    // Reset and update card positions
    deltaY = 0;
    updateCardPositions();
  }

  // Event listeners with more comprehensive touch support
  container.addEventListener("mousedown", startDrag);
  document.addEventListener("mousemove", drag);
  document.addEventListener("mouseup", stopDrag);

  // Touch event support
  container.addEventListener(
    "touchstart",
    (e) => {
      startDrag(e.touches[0]);
    },
    { passive: false }
  );

  document.addEventListener(
    "touchmove",
    (e) => {
      drag(e.touches[0]);
    },
    { passive: false }
  );

  document.addEventListener("touchend", stopDrag);

  // Initialize card positions
  updateCardPositions();
});
