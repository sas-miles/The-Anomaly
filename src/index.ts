import barba from '@barba/core';
import { gsap } from 'gsap';
import { restartWebflow } from '@finsweet/ts-utils';


import Experience from './Experience/Experience'

const experience = new Experience(document.querySelector('canvas.webgl'));

// Initialize Barba.js
barba.init({
  transitions: [{
    name: 'fade',
    sync: false,
    leave(data) {
      gsap.fromTo(".chapter-page-title", 
      { opacity: 1, x: 0 }, { opacity: 0, x: -20, duration: 2, });
      
    },
    enter(data) {
      gsap.fromTo(".chapter-page-title", { opacity: 0, y: 20, ease: "power4.out" }, { opacity: 1, y: 0, duration: 1, delay: 2 });
      gsap.fromTo(".chapter-main", { opacity: 0, x: -100, ease: "power4.out" }, { opacity: 1, x: 0, duration: 1, delay: 2});
    },
    after(data) {
      restartWebflow();
    }
  }],
});

window.Webflow ||= [];
window.Webflow.push(async () => {

  // Existing code to handle navigation links
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent the default link behavior
      const href = link.getAttribute('href');
      if (href) {
        barba.go(href); // Navigate with Barba.js
      } else {
        console.error('No href attribute found on link:', link);
      }
    });
  });



  const chapterMain = document.querySelector('.chapter-main') as HTMLElement | null;
  console.log('chapterMain:', chapterMain);
  
  if (chapterMain) {
      const contentContainer = chapterMain.querySelector('.main-content_container') as HTMLElement | null;
      console.log('contentContainer:', contentContainer);
  
      if (contentContainer) {
          const scrollContent = contentContainer.querySelector('.scroll-content') as HTMLElement | null;
          const scrollbar = contentContainer.querySelector('.scrollbar') as HTMLElement | null;
  
          console.log('scrollContent:', scrollContent);
          console.log('scrollbar:', scrollbar);
  
          if (scrollContent && scrollbar) {
              const updateScrollbar = () => {
                  const scrollContentHeight: number = scrollContent.scrollHeight;
                  const containerHeight: number = contentContainer.clientHeight;
                  const scrollbarHeight: number = (containerHeight / scrollContentHeight) * containerHeight;
  
                  scrollbar.style.height = `${scrollbarHeight}px`;
  
                  const contentScrollTop: number = scrollContent.scrollTop;
                  const scrollbarPosition: number = (contentScrollTop / scrollContentHeight) * (containerHeight - scrollbarHeight);
                  scrollbar.style.transform = `translateY(${scrollbarPosition}px)`;
  
                  console.log('Update Scrollbar - scrollContentHeight:', scrollContentHeight, 'containerHeight:', containerHeight, 'scrollbarHeight:', scrollbarHeight);
                  console.log('Update Scrollbar - contentScrollTop:', contentScrollTop, 'scrollbarPosition:', scrollbarPosition);
              };
  
              // Initialize the scrollbar size and position
              updateScrollbar();
  
              let isDragging = false;
              let startY: number;
              let startScrollTop: number;
  
              const onMouseMove = (e: MouseEvent): void => {
                  if (!isDragging) return;
                  const deltaY = e.pageY - startY;
                  const scrollFraction = deltaY / (contentContainer.clientHeight - scrollbar.clientHeight);
                  scrollContent.scrollTop = startScrollTop + scrollFraction * scrollContent.scrollHeight;
                  console.log('onMouseMove - deltaY:', deltaY, 'scrollFraction:', scrollFraction, 'New scrollTop:', scrollContent.scrollTop);
                  e.preventDefault();
              };
  
              const onMouseDown = (e: MouseEvent): void => {
                  isDragging = true;
                  startY = e.pageY;
                  startScrollTop = scrollContent.scrollTop;
                  console.log('onMouseDown - Start dragging at:', startY, 'startScrollTop:', startScrollTop);
                  document.addEventListener('mousemove', onMouseMove);
                  document.addEventListener('mouseup', () => {
                      isDragging = false;
                      console.log('onMouseUp - Stop dragging');
                      document.removeEventListener('mousemove', onMouseMove);
                  }, { once: true });
              };
  
              scrollbar.addEventListener('mousedown', onMouseDown);
  
              const onWheel = (e: WheelEvent): void => {
                const delta = e.deltaY; // Consider removing the multiplier or adjusting it
                scrollContent.scrollTop += delta;
                console.log('onWheel - New scrollTop:', scrollContent.scrollTop, 'Delta:', delta);
                e.preventDefault();
            };
  
              contentContainer.addEventListener('wheel', onWheel);
              scrollContent.addEventListener('scroll', updateScrollbar);
          } else {
              console.error('One or more elements were not found!');
          }
      } else {
          console.error('The content container was not found!');
      }
  } else {
      console.error('The chapter-main was not found!');
  }
  
  




});
