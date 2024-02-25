import gsap from 'gsap';

export default class ChapterUI {
    constructor(data){
        this.data = data
        this.mainContentTab = this.data.querySelector('.main-content-tab');
        this.tabHide = this.data.querySelector('.main-content-tab_hide');
        this.tabOpen = this.data.querySelector('.main-content-tab_open');
    
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
        const viewportWidth = window.innerWidth;

        const breakpointTablet = 991;
        // let mainContentValue; 
        // if (viewportWidth <= breakpointTablet) {
        //     mainContentValue = "-54vw";
        // } else {
        //     mainContentValue = "-37vw";
        // }

        const breakpointMobile = 760;
        // if (viewportWidth <= breakpointMobile) {
        //     mainContentValue = "-64.5vw";
        // } else {
        //     mainContentValue = "-37vw";
        // }



        // Function to show main content
        const showMainContent = () => {
            console.log('Showing...');
            gsap.timeline({ease: "power2.out"})
                .to(this.mainContentTab, {
                    opacity: 0,
                    x: -10, 
                    duration: .25,
                },"sync1")
                .to(this.tabOpen, {
                    opacity: 0, 
                    duration: .25,
                    onComplete: () => {
                        this.tabOpen.style.display = 'none'
                        this.tabHide.style.display = 'block'
                    }
                }, "sync1")
                .to(mainContent, {
                    x: "0%",
                    opacity: 1,
                    duration: 1
                })
                .to(this.mainContentTab, {
                    opacity: 1, 
                    x: 0,
                    duration: .25,
                }, )
                .to(this.tabHide, {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                }, );
        };
    
        // Function to hide main content
        const hideMainContent = () => {
            console.log('Hiding...');
            gsap.timeline({
                ease: "power2.out", 
                onStart: () => {
                    this.tabOpen.style.display = 'none'
                    this.tabHide.style.display = 'block'
                }
            },)
                .to(this.mainContentTab, {
                    opacity: 0, 
                    x: -10,
                    duration: .25,
                }, )
                .to(this.tabHide, {
                    opacity: 0,
                    duration: 0.25,
                    onComplete: () => {
                        this.tabHide.style.display = 'none'
                        this.tabOpen.style.display = 'block'
                    }
                },)
                .to(mainContent, {
                    x: "-108%",
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
                .to(this.tabOpen, {
                    opacity: 1,
                    x: 0,
                    delay: -0.5,
                }, "sync1")
        };
    
        
    
           if (viewportWidth <= breakpointTablet) {
        if (this.flag) {
            hideMainContent();
        } else {
            showMainContent();
        }
    } else {
        if (this.flag) {
            showMainContent();
        } else {
            hideMainContent();
        }
    }
            this.flag = !this.flag; // Toggle the flag to switch between show and hide
      
    }

    
}