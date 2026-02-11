document.addEventListener('DOMContentLoaded', () => {
    // 3D Tilt Effect for Chat Card
    const card = document.querySelector('.chat-interface-card');
    const container = document.querySelector('.hero-graphic');

    if (card && container) {
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Calculate rotation based on mouse position
            // Center is (0.5, 0.5)
            const xPct = x / rect.width;
            const yPct = y / rect.height;

            const xRot = (yPct - 0.5) * 20; // Rotate X axis based on Y position (up/down tilt)
            const yRot = (0.5 - xPct) * 20; // Rotate Y axis based on X position (left/right tilt)

            card.style.transform = `rotateX(${xRot}deg) rotateY(${yRot}deg)`;
        });

        container.addEventListener('mouseleave', () => {
            // Reset to default style from CSS
            card.style.transform = '';
        });
    }

    // Button click handling (Optional)
    const secondaryBtn = document.querySelector('.btn-secondary');
    if (secondaryBtn) {
        secondaryBtn.addEventListener('click', () => {
            // Optional: scroll to features or play video
            console.log('Video modal clicked');
        });
    }

    // Developer Modal Logic
    const modalTrigger = document.getElementById('devModalTrigger');
    const modal = document.getElementById('developerModal');
    const closeModal = document.getElementById('closeModal');

    if (modalTrigger && modal && closeModal) {
        // Open Modal
        modalTrigger.addEventListener('click', () => {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });

        // Close Modal
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Close when clicking outside the card
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});
