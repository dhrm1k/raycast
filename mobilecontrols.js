
const MobileControls = {
    init: function() {
        // check if on a mobile device 
        if (window.innerWidth <= 768) {
            this.setupTouchControls();
            this.preventZoom();
        }
        
        //  handle resize events to show/hide controls as needed
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 768) {
                this.setupTouchControls();
                this.preventZoom();
            }
        });
    },
    
    preventZoom: function() {
        // prevent pinch zoom
        document.addEventListener('touchmove', function(event) {
            if (event.touches.length > 1) {
                event.preventDefault();
            }
        }, { passive: false });
        
        // prevent double-tap zoom
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function(event) {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, { passive: false });
    },
    
    setupTouchControls: function() {
        const upBtn = document.getElementById('up-btn');
        const downBtn = document.getElementById('down-btn');
        const leftBtn = document.getElementById('left-btn');
        const rightBtn = document.getElementById('right-btn');
        
        // helper function to simulate key presses
        const simulateKey = (key, isPressed) => {
            // update the GameInput's keys object directly
            GameInput.keys[key] = isPressed;
        };
        
        // handle touch events for up button
        this.addTouchHandlers(upBtn, () => {
            simulateKey('ArrowUp', true);
        }, () => {
            simulateKey('ArrowUp', false);
        });
        
        // handle touch events for down button
        this.addTouchHandlers(downBtn, () => {
            simulateKey('ArrowDown', true);
        }, () => {
            simulateKey('ArrowDown', false);
        });
        
        // handle touch events for left button
        this.addTouchHandlers(leftBtn, () => {
            simulateKey('ArrowLeft', true);
        }, () => {
            simulateKey('ArrowLeft', false);
        });
        
        // handle touch events for right button
        this.addTouchHandlers(rightBtn, () => {
            simulateKey('ArrowRight', true);
        }, () => {
            simulateKey('ArrowRight', false);
        });
    },
    
    addTouchHandlers: function(element, startCallback, endCallback) {
        // start touch/click
        element.addEventListener('touchstart', (e) => {
            e.preventDefault(); // Prevent default behavior
            startCallback();
        });
        element.addEventListener('mousedown', startCallback);
        
        // end touch/click
        element.addEventListener('touchend', (e) => {
            e.preventDefault();
            endCallback();
        });
        element.addEventListener('touchcancel', (e) => {
            e.preventDefault();
            endCallback();
        });
        element.addEventListener('mouseup', endCallback);
        element.addEventListener('mouseleave', endCallback);
    }
};

// initialize mobile controls when the document is ready
document.addEventListener('DOMContentLoaded', () => {
    MobileControls.init();
});