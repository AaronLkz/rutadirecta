const carouselDuplicates = 3;

function lerp(a, b, t) {
	return a + (b - a) * t;
}

function getTouchMidpoint(touches) {
	let midpoint = {
		x: touches[0].clientX,
		y: touches[0].clientY
	};

	for (let i = 1; i < touches.length; i++) {
		midpoint.x = lerp(midpoint.x, touch.clientX, 0.5);
		midpoint.y = lerp(midpoint.y, touch.clientY, 0.5);
	}

	return midpoint;
}

document.addEventListener("DOMContentLoaded", () => {
	const carousel = document.querySelector(".carousel");
	const carouselContent = carousel.querySelector(".carousel-content");
	const prefersReducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
	const hasFinePointer = matchMedia("(pointer: fine)");
	let carouselHasMouse = false;
	let carouselTouches = 0;
	let lastMouseX = null;
	let lastTouchX = null;
	let scrollDelta = 0;
	let lastTimestamp = 0;

	// An event handler for handling touchend and touchcancel.
	const handleTouchRemove = (event) => {
		carouselTouches -= event.changedTouches.length;
		if (carouselTouches <= 0 && !carouselHasMouse) {
			lastTouchX = null;
		}
	};

	// Calling this with requestAnimationFrame will start the update loop.
	const updateScroll = (timestamp) => {
		const deltaTime = timestamp - lastTimestamp;

		carousel.scrollBy({
			left: scrollDelta
		});

		if (carouselHasMouse || carouselTouches > 0 || prefersReducedMotion.matches) {
			scrollDelta = 0;
		} else {
			scrollDelta = lerp(scrollDelta, 0, 0.045);
		}

		lastTimestamp = timestamp;
		requestAnimationFrame(updateScroll);
	};

	// Handle mouse input.
	carousel.addEventListener("mousedown", (event) => {
		carouselHasMouse = true;
	});

	window.addEventListener("mouseup", (event) => {
		carouselHasMouse = false;
		lastMouseX = null;
	});

	window.addEventListener("mousemove", (event) => {
		if (carouselHasMouse) {
			if (lastMouseX !== null) {
				scrollDelta = lastMouseX - event.x;
			}

			lastMouseX = event.x;
		}
	});

	carousel.addEventListener("wheel", (event) => {
		if (hasFinePointer.matches && event.shiftKey) {
			event.preventDefault();

			const scrollMultiplier = prefersReducedMotion.matches ? 2 : 0.1;
			scrollDelta += event.deltaY * scrollMultiplier;
		}
	});

	// Handle touch input.
	carousel.addEventListener("touchstart", (event) => {
		if (lastTouchX === null) {
			lastTouchX = getTouchMidpoint(event.touches).x;
		}
		carouselTouches += event.changedTouches.length;
	});

	window.addEventListener("touchmove", (event) => {
		if (lastTouchX !== null) {
			const touchMidpoint = getTouchMidpoint(event.touches);
			scrollDelta = -(touchMidpoint.x - lastTouchX);
			lastTouchX = touchMidpoint.x;
		}
	});

	window.addEventListener("touchend", handleTouchRemove);
	window.addEventListener("touchcancel", handleTouchRemove);

	// This is where the infinite scrolling logic comes to play.
	carousel.addEventListener("scroll", (event) => {
		const carouselRect = carouselContent.getBoundingClientRect();

		if (carouselRect.left > window.innerWidth) {
			carousel.scrollLeft += carouselRect.width;
		} else if (carouselRect.right < 0) {
			carousel.scrollLeft -= carouselRect.width;
		}
	});

	// Duplicate the carouselContent on both the front and the back of the carousel to create the illusion.
	for (let i = 0; i < carouselDuplicates; i++) {
		const carouselDuplicate = carouselContent.cloneNode(true);
		// For accessibility reasons...
		carouselDuplicate.ariaHidden = true;
		carouselDuplicate.querySelectorAll("a").forEach((element) => {
			element.tabIndex = "-1";
		});

		carousel.prepend(carouselDuplicate);
		carousel.append(carouselDuplicate.cloneNode(true));
	}

	// Shift the starting scroll position to the right.
	carousel.scrollLeft += carouselContent.offsetWidth * carouselDuplicates;

	// Start the update loop.
	requestAnimationFrame(updateScroll);
});
