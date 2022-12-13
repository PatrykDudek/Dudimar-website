//navslide
const navSlide = () => {
	const burger = document.querySelector('.burger');
	const nav = document.querySelector('.nav-links');
	const navLinks = document.querySelectorAll('.nav-links li');

	burger.addEventListener('click', () => {
		//Togle nav
		nav.classList.toggle('nav-active');
		//Animation nav
		navLinks.forEach((link, index) => {
			if (link.style.animation) {
				link.style.animation = '';
			} else {
				link.style.animation = `navLinkFade .5s ease  ${
					index / 7 + 0.4
				}s forwards`;
			}
		});

		//Animation burger
		burger.classList.toggle('toggle');
	});
};

navSlide();
//video
const videos = gsap.utils.toArray('.video');
gsap.set(videos, { opacity: 0 });

videos.forEach((video) => {
	ScrollTrigger.create({
		trigger: video,
		start: '-200top center',
		end: 'bottom center',

		onEnter: () => {
			gsap.to(video, { opacity: 1 });
			video.play();
		},
		onEnterBack: () => video.play(),
		onLeave: () => video.pause(),
		onLeaveBack: () => video.pause(),
	});
});

//counter
const counterItems = document.querySelectorAll('.counter');
const counterBox = document.querySelector('.counter-box');

const options = {
	rootMargin: '-250px',
};

const startConter = (entry) => {
	if (entry[0].isIntersecting) {
		counterItems.forEach((counter) => {
			const updateCounter = () => {
				const finalNumber = counter.getAttribute('data-number');
				const value = parseInt(counter.textContent);

				const speed = finalNumber / 12;

				if (value < finalNumber) {
					counter.textContent = `${Math.floor(value + speed)}`;
					setTimeout(updateCounter, 50);
				} else {
					counter.textContent = finalNumber;
				}
			};

			updateCounter();
		});
	}
};

const obserwer = new IntersectionObserver(startConter, options);
obserwer.observe(counterBox);

const sliderBox = document.querySelector('.slider-box');
const leftBtn = document.querySelector('.btn-left');
const rightBtn = document.querySelector('.btn-right');
const caruselImages = document.querySelectorAll('.slider-img');
const caruselWidth = 100;
const caruselSpeed = 3000;

let index = 0;

const handleCarusel = () => {
	index++;
	changeImage();
};

let startCarusel = setInterval(handleCarusel, caruselSpeed);

const changeImage = () => {
	if (index > caruselImages.length - 1) {
		index = 0;
	} else if (index < 0) {
		index = caruselImages.length - 1;
	}

	sliderBox.style.transform = `translateX(${-index * caruselWidth}%)`;
};

const handleRightArrow = () => {
	index++;
	resetInterval();
};
const handleLeftArrow = () => {
	index--;
	resetInterval();
};

const resetInterval = () => {
	changeImage();
	clearInterval(startCarusel);
	startCarusel = setInterval(handleCarusel, caruselSpeed);
};

rightBtn.addEventListener('click', handleRightArrow);
leftBtn.addEventListener('click', handleLeftArrow);


//scroll-to-top

const btn = document.querySelector('.scroll-to-top')

let root = document.querySelector(':root')


const handleScrollbar = () => {
    const scroll = window.scrollY
    
    const leftToScroll = document.body.getBoundingClientRect().height - window.innerHeight
    
    const scrollBarWidth = (Math.floor(scroll / leftToScroll * 100))
    root.style.setProperty('--scroll-width', `${scrollBarWidth}%`)



    if(scrollBarWidth > 57){
        btn.classList.add('active')
    }else{
        btn.classList.remove('active')
    }
}

const scrollToTop = () => {
    window.scroll(
        {
            top:0,
            behavior:'smooth'
        }
    )
}


window.addEventListener('scroll', handleScrollbar)
btn.addEventListener('click', scrollToTop)

document.cookie = 'SameSite= none; Secure'
