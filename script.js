// Wait until the DOM is fully loaded before executing the animation
document.addEventListener('DOMContentLoaded', () => {
    // Select all image containers and heading elements
    const containers = gsap.utils.toArray('.img-container');
    const headings = gsap.utils.toArray('.text h1'); // Gets all three h1 elements (Nature, Windows, Architecture)
    
    // ===== INITIAL SETUP =====
    // Set initial state for all image containers (off-screen to the right and invisible)
    gsap.set(containers, { 
      left: '100%',   // Positioned off-screen to the right
      opacity: 0      // Completely transparent
    });
    
    // Set all headings to be invisible initially
    gsap.set(headings, { 
      opacity: 0      // Hide all text headings
    });
    
    // Make the first image visible (centered on screen)
    gsap.set(containers[0], { 
      left: '0%',     // Positioned on-screen
      opacity: 1      // Fully visible
    });
    
    // Make the first heading ("Nature") visible
    gsap.set(headings[0], { 
      opacity: 1      // Show first heading
    });
  
    // ===== CREATE TIMELINE =====
    const tl = gsap.timeline({ 
      repeat: -1      // Infinite loop (-1 means repeat forever)
    });
  
    // ===== ANIMATION SEQUENCE =====
    containers.forEach((container, index) => {
      // Calculate next image index (wraps around to 0 after last image)
      const nextIndex = (index + 1) % containers.length;
      
      // 1. ANIMATE CURRENT IMAGE OUT (to left) AND FADE OUT ITS HEADING
      tl.to(container, {
        left: '-100%',    // Slide to left off-screen
        opacity: 0,       // Fade out
        duration: 4,    // Animation takes 1.5 seconds
        ease: 'power2.inOut' // Smooth acceleration/deceleration
      })
      // Simultaneously fade out the current heading
      .to(headings[index], {
        opacity: 0,       // Fade out text
        duration: 4,    // Faster fade (0.5 seconds)
        ease: 'power1.inOut' // Simpler easing
      }, '<'); // '<' means start at same time as previous animation/Its means k hum jis jis ka name '<' rkhen ga wo sath chlenga.
      
      // 2. ANIMATE NEXT IMAGE IN (from right) AND FADE IN ITS HEADING
      tl.to(containers[nextIndex], {
        left: '0%',       // Slide in to center
        opacity: 1,       // Fade in
        duration: 4,
        ease: 'power2.inOut'
      }, '<') // Start same time as slide-out
      // Simultaneously fade in the next heading
      .to(headings[nextIndex], {
        opacity: 1,       // Fade in text
        duration: 4,
        ease: 'power1.inOut'
      }, '<'); // Start same time as slide-in
    });
  });
  
