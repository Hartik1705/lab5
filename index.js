"use strict";

const box = document.querySelector('#draggable-box');
const positionDisplay = document.querySelector('#position-display');
let isDragging = false;
let startX, startY, initialX, initialY, initialDistance = null;

box.addEventListener('touchstart', (event) => {
    event.preventDefault();
    
    if (event.touches.length === 2) {
        initialDistance = getDistance(event.touches[0], event.touches[1]);
    } else if (event.touches.length === 1) {
        isDragging = true;
        const touch = event.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
        initialX = box.offsetLeft;
        initialY = box.offsetTop;
    }
});

box.addEventListener('touchmove', (event) => {
    if (isDragging) {
        const touch = event.touches[0];
        const dx = touch.clientX - startX;
        const dy = touch.clientY - startY;
        box.style.left = `${initialX + dx}px`;
        box.style.top = `${initialY + dy}px`;
        updatePositionDisplay();
    } else if (event.touches.length === 2 && initialDistance !== null) {
        const currentDistance = getDistance(event.touches[0], event.touches[1]);
        if (currentDistance > initialDistance) {
            box.style.width = `${box.offsetWidth + 5}px`;
            box.style.height = `${box.offsetHeight + 5}px`;
        } else if (currentDistance < initialDistance) {
            box.style.width = `${Math.max(50, box.offsetWidth - 5)}px`;
            box.style.height = `${Math.max(50, box.offsetHeight - 5)}px`;
        }
        initialDistance = currentDistance; // Update the initial distance
    }
});

box.addEventListener('touchend', () => {
    isDragging = false;
    initialDistance = null; // Reset for next multi-touch
});

function updatePositionDisplay() {
    const rect = box.getBoundingClientRect();
    positionDisplay.textContent = `Position: X: ${Math.round(rect.left)}, Y: ${Math.round(rect.top)}`;
}

function getDistance(touch1, touch2) {
    const dx = touch2.clientX - touch1.clientX;
    const dy = touch2.clientY - touch1.clientY;
    return Math.sqrt(dx * dx + dy * dy);
}
