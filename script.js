document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    

    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });


    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });


    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        const button = card.querySelector('.details-button');
        const content = card.querySelector('.details-content');

        button.addEventListener('click', () => {
            card.classList.toggle('expanded');
            if (card.classList.contains('expanded')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = "0px";
            }
        });
    });
    

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });


    const canvas = document.getElementById('star-canvas');
    const ctx = canvas.getContext('2d');
    let nodes = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createNodes() {
        nodes = [];
        const nodeCount = Math.floor((canvas.width * canvas.height) / 15000);
        for (let i = 0; i < nodeCount; i++) {
            nodes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                radius: Math.random() * 1.5 + 0.5,
                isQuasar: Math.random() < 0.05,
                quasarPhase: Math.random() * Math.PI * 2,
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        nodes.forEach(node => {

            node.x += node.vx;
            node.y += node.vy;


            if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > canvas.height) node.vy *= -1;


            let radius = node.radius;
            let alpha = 0.7;

            if (node.isQuasar) {
                node.quasarPhase += 0.03;
                radius = node.radius + Math.abs(Math.sin(node.quasarPhase)) * 2;
                alpha = 0.5 + Math.abs(Math.sin(node.quasarPhase)) * 0.5;
            }
            
            ctx.beginPath();
            ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(203, 213, 225, ${alpha})`; // slate-300
            ctx.fill();
        });


        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.strokeStyle = `rgba(100, 116, 139, ${1 - dist / 120})`; // slate-500
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(draw);
    }
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        createNodes();
    });

    resizeCanvas();
    createNodes();
    draw();
});
