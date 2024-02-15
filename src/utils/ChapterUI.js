import gsap from 'gsap';

export default class ChapterUI {
    constructor(){
        this.mainContentTab = document.querySelector('.main-content-tab');
        this.flag = false;
        this.initEvents()
    }
    initEvents() {
        document.body.addEventListener('click', (e) => {
          const mainContentTab = e.target.closest('.main-content-tab');
          if (mainContentTab) {
            this.toggleMainContent();
          }
        });
      }
    toggleMainContent() {
        const mainContent = document.querySelector('.chapter-main');
        const tabHide = document.querySelector('.main-content-tab_hide');
        const tabOpen = document.querySelector('.main-content-tab_open');
    
        // Function to show main content
        const showMainContent = () => {
            console.log('Showing...');
            gsap.timeline({ease: "power2.out"})
                .to(this.mainContentTab, {
                    opacity: 0,
                    x: -10, 
                    duration: .25,
                },"sync1")
                .to(tabOpen, {
                    opacity: 0, 
                    duration: .25,
                    onComplete: () => {
                        tabOpen.style.display = 'none'
                        tabHide.style.display = 'block'
                    }
                }, "sync1")
                .to(mainContent, {
                    x: "0vw",
                    opacity: 1,
                    duration: 1
                })
                .to(this.mainContentTab, {
                    opacity: 1, 
                    x: 0,
                    duration: .25,
                }, )
                .to(tabHide, {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                }, );
        };
    
        // Function to hide main content
        const hideMainContent = () => {
            console.log('Hiding...');
            gsap.timeline({ease: "power2.out"})
                .to(this.mainContentTab, {
                    opacity: 0, 
                    x: -10,
                    duration: .25,
                }, )
                .to(tabHide, {
                    opacity: 0,
                    duration: 0.25,
                    onComplete: () => {
                        tabHide.style.display = 'none'
                        tabOpen.style.display = 'block'
                    }
                },)
                .to(mainContent, {
                    x: '-37vw',
                    opacity: 0,
                    duration: 1,
                    delay: -0.15
                    
                })
                .to(mainContent, {
                    opacity: 1, 
                    duration: .5
                })
                .to(this.mainContentTab, {
                    opacity: 1,
                    x: 0,
                    delay: -0.5,
                }, "sync1")
                .to(tabOpen, {
                    opacity: 1,
                    x: 0,
                    delay: -0.5,
                }, "sync1")
        };
    
        
    
            if (this.flag) {
                showMainContent();
            } else {
                hideMainContent();
            }
            this.flag = !this.flag; // Toggle the flag to switch between show and hide
      
    }
}