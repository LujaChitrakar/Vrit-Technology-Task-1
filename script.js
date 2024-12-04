document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");
  const cards = Array.from(container.querySelectorAll(".card"));

  let isDragging = false;
  let startY = 0;
  let currentY = 0;
  let deltaY = 0;
  const DRAG_THRESHOLD = 10;
  let currentIndex = 0;

  function updateCardPositions() {
    cards.forEach((card, index) => {
      const offset = (index - currentIndex + cards.length) % cards.length;

      card.style.transition =
        "transform 0.6s ease-in-out, opacity 0.6s ease-in-out";

      if (offset === 0) {
        card.style.transform = `translateY(0px) scale(1)`;
        card.style.opacity = "0.9";
        card.style.zIndex = "9";
      } else if (offset === 1) {
        card.style.transform = `translateY(180px) scale(0.8)`;
        card.style.opacity = "0.6";
        card.style.zIndex = "5";
      } else if (offset === 2) {
        card.style.transform = `translateY(-180px) scale(0.8)`;
        card.style.opacity = "0.6";
        card.style.zIndex = "3";
      }
    });
  }

  function startDrag(e) {
    e.preventDefault();

    isDragging = true;
    startY = e.clientY;
    currentY = e.clientY;

    cards.forEach((card) => (card.style.transition = "none"));
  }

  function drag(e) {
    if (!isDragging) return;

    e.preventDefault();

    currentY = e.clientY;
    deltaY = currentY - startY;

    cards.forEach((card, index) => {
      const baseTransform =
        index === currentIndex
          ? 0
          : index === (currentIndex + 1) % cards.length
          ? 180
          : index === (currentIndex - 1 + cards.length) % cards.length
          ? -180
          : 0;

      card.style.transform = `translateY(${
        baseTransform + Math.min(Math.max(deltaY, -20), 20)
      }px) scale(${1 - Math.abs(deltaY) / 1000})`;
    });
  }

  function stopDrag(e) {
    if (!isDragging) return;

    isDragging = false;

    if (Math.abs(deltaY) > DRAG_THRESHOLD) {
      if (deltaY < 0) {
        currentIndex = (currentIndex + 1) % cards.length;
      } else {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
      }
    }

    deltaY = 0;
    updateCardPositions();
  }

  container.addEventListener("mousedown", startDrag);
  document.addEventListener("mousemove", drag);
  document.addEventListener("mouseup", stopDrag);

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

  updateCardPositions();
});
