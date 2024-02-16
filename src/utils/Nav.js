import gsap from 'gsap'

export default class Nav {
    constructor() {
      this.openButton = document.querySelector('.menu-button_container.is-open');
      this.closeButton = document.querySelector('.menu-button_container.is-close');
      this.navOverlay = document.querySelector('.nav-overlay');
      this.links = document.querySelectorAll('[data-nav]');


      this.initEvents()
    }

    initEvents() {
        this.openButton.addEventListener('click', () => this.showNav())
        this.closeButton.addEventListener('click', () => this.hideNav())

        this.links.forEach(link => {
            link.addEventListener ('click', (e) => {
                e.preventDefault()

                this.hideNav()

                const targetUrl = link.getAttribute('href')
            })
            
        })
    }
  
    showNav() {
        this.navOverlay.style.display = 'block'; // Make sure the element is not display:none
        this.closeButton.style.display = 'block'; // Adjust if using GSAP for animation
        gsap.timeline({ease: "power2.out"})
        .to(this.openButton, {
            duration: .25,
            opacity: 0
        })
        .to(this.closeButton, { 
            duration: 0.25,
            opacity: 1,
        })
        
        .to(this.navOverlay, { 
            duration: 0.25,
            opacity: 1
        })
    }
  
    hideNav() {

        gsap.timeline({ease:"power2.out", onComplete: () => {
            this.closeButton.style.display = 'none'
            this.navOverlay.style.display = 'none'
        }})
        .to(this.closeButton, { 
            duration: 1,
            opacity: 0,
        }, "sync")
        
        .to(this.navOverlay, { 
            duration: 1,
            delay: .25,
            opacity: 0
        }, "sync")

        .to(this.openButton, {
            duration: .25,
            opacity: 1
        })

    }
  }

  