<template>
    <section class="hero">

        <Motion as="p" class="hero-tag" :initial="{ opacity: 0, x: -20 }" :animate="{ opacity: 1, x: 0 }"
            :transition="{ delay: 0.5, duration: 0.6, ease: 'easeOut' }">
            // frontend developer &amp; designer
        </Motion>

        <h1 class="hero-title" aria-label="Build things that last">
            <Motion as="span" class="title-line" :initial="{ opacity: 0, y: 40, skewX: 3 }"
                :animate="{ opacity: 1, y: 0, skewX: 0 }"
                :transition="{ delay: 0.7, duration: 0.7, ease: [0.16, 1, 0.3, 1] }">
                BUILD
            </Motion>

            <Motion as="span" class="title-line title-outline" :initial="{ opacity: 0, y: 40, skewX: 3 }"
                :animate="{ opacity: 1, y: 0, skewX: 0 }"
                :transition="{ delay: 0.82, duration: 0.7, ease: [0.16, 1, 0.3, 1] }">
                THINGS
            </Motion>

            <Motion as="span" class="title-line" :initial="{ opacity: 0, y: 40, skewX: 3 }"
                :animate="{ opacity: 1, y: 0, skewX: 0 }"
                :transition="{ delay: 0.94, duration: 0.7, ease: [0.16, 1, 0.3, 1] }">
                THAT LAST
            </Motion>
        </h1>

        <Motion as="p" class="hero-body" :initial="{ opacity: 0, y: 16 }" :animate="{ opacity: 1, y: 0 }"
            :transition="{ delay: 1.15, duration: 0.6, ease: 'easeOut' }">
            Saya seorang developer yang fokus pada pengalaman<br>
            digital yang bersih, cepat, dan berkesan.
        </Motion>

        <Motion as="div" class="hero-divider" :initial="{ scaleX: 0, opacity: 0 }" :animate="{ scaleX: 1, opacity: 1 }"
            :transition="{ delay: 1.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }" />

        <Motion as="div" class="hero-cta" :initial="{ opacity: 0, y: 10 }" :animate="{ opacity: 1, y: 0 }"
            :transition="{ delay: 1.45, duration: 0.5, ease: 'easeOut' }">
            <a href="#works" class="cta-btn">View my work</a>
            <a href="#contact" class="cta-link">Get in touch →</a>
        </Motion>

    </section>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Share+Tech+Mono&family=Space+Grotesk:wght@300;400&display=swap');

.hero {
    min-height: 100vh;
    padding: 0 2.5rem;
    padding-top: 72px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.hero-tag {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.72rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #2e2e2e;
    margin-bottom: 1.25rem;
}

.hero-title {
    display: flex;
    flex-direction: column;
    margin-bottom: 1.75rem;
}

.title-line {
    display: block;
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(4.5rem, 11vw, 8rem);
    line-height: 0.92;
    letter-spacing: 0.04em;
    color: #e8e8e8;
}

.title-outline {
    color: transparent;
    -webkit-text-stroke: 1.5px #383838;
}

.hero-body {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 300;
    font-size: 0.9rem;
    line-height: 1.8;
    color: #3a3a3a;
    margin-bottom: 1.75rem;
}

.hero-divider {
    height: 0.5px;
    width: 40%;
    background: linear-gradient(to right, #2a2a2a, transparent);
    transform-origin: left center;
    margin-bottom: 1.75rem;
}

.hero-cta {
    display: flex;
    align-items: center;
    gap: 2rem;
}

.cta-btn {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.7rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #080808;
    background: #e8e8e8;
    text-decoration: none;
    padding: 10px 24px;
    transition: background 0.2s ease, box-shadow 0.2s ease;
}

.cta-btn:hover {
    background: #ffffff;
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
}

.cta-link {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    color: #2e2e2e;
    text-decoration: none;
    transition: color 0.2s ease, text-shadow 0.2s ease;
}

.cta-link:hover {
    color: #e8e8e8;
    text-shadow: 0 0 8px rgba(255, 255, 255, 0.35);
}
</style>