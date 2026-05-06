<script setup>
const stats = [
    { value: '2+', label: 'Years\nExperience' },
    { value: '10+', label: 'Projects\nCompleted' },
    { value: 'THOUSANDS', label: 'of Lines\nWritten' },
    { value: 'HUNDREDS', label: 'of Screens\nBuilt' },
]
</script>

<template>
    <section id="about" class="about">
        <div class="about-inner">

            <!-- Main text area -->
            <div class="about-main">
                <span class="about-label">( About. )</span>

                <Motion as="h2" class="about-text" :initial="{ opacity: 0, y: 30 }" :whileInView="{ opacity: 1, y: 0 }"
                    :viewport="{ once: true, amount: 0.3 }" :transition="{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }">
                    I'm Rifqy, a Fullstack Developer. I use Vue, Nuxt, and modern web tools to craft digital
                    experiences where the elegance of clean code and the beauty of design come together to deliver
                    fast, reliable solutions.
                </Motion>
            </div>

            <!-- Stats row -->
            <div class="about-stats">
                <Motion v-for="(stat, i) in stats" :key="stat.value" class="stat-item" :initial="{ opacity: 0, y: 20 }"
                    :whileInView="{ opacity: 1, y: 0 }" :viewport="{ once: true, amount: 0.5 }"
                    :transition="{ delay: i * 0.08, duration: 0.5, ease: 'easeOut' }">
                    <span class="stat-value">{{ stat.value }}</span>
                    <span class="stat-label">{{ stat.label }}</span>
                </Motion>
            </div>

        </div>
    </section>
</template>

<style scoped>
.about {
    position: relative;
    width: 100%;
    height: 100svh;
    display: flex;
    align-items: center;
    background: #f0ece4;
    overflow: hidden;
}

.about-inner {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 64px 2.5rem 2rem;
    /* top = header height */
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 3rem;
}

.about-main {
    display: flex;
    align-items: flex-start;
    gap: 2.5rem;
}

.about-label {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.62rem;
    letter-spacing: 0.14em;
    color: #a89880;
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    white-space: nowrap;
    flex-shrink: 0;
    padding-top: 0.25rem;
}

.about-text {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(2rem, 4.2vw, 4rem);
    line-height: 1.12;
    letter-spacing: 0.03em;
    color: #1a1612;
}

.about-stats {
    display: flex;
    align-items: flex-start;
    border-top: 0.5px solid #ddd8cf;
    padding-top: 2rem;
}

.stat-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    padding: 0 1.5rem;
    border-right: 0.5px solid #ddd8cf;
}

.stat-item:first-child {
    padding-left: 0;
}

.stat-item:last-child {
    border-right: none;
}

.stat-value {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(1.5rem, 2.8vw, 2.6rem);
    line-height: 1;
    color: #1a1612;
    letter-spacing: 0.04em;
}

.stat-label {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.56rem;
    letter-spacing: 0.1em;
    color: #a89880;
    text-transform: uppercase;
    white-space: pre-line;
    line-height: 1.7;
}

@media (max-width: 768px) {
    .about-inner {
        padding: 56px 1.5rem 1.5rem;
        gap: 2rem;
    }

    .about-label {
        display: none;
    }

    .about-stats {
        flex-wrap: wrap;
        gap: 1.5rem;
        padding-top: 1.5rem;
    }

    .stat-item {
        flex: 1 1 calc(33% - 1rem);
        padding: 0;
        border-right: none;
    }
}

@media (max-width: 480px) {
    .about-inner {
        padding: 48px 1.25rem 1.25rem;
    }

    .stat-item {
        flex: 1 1 calc(50% - 0.75rem);
    }
}

@media (max-height: 600px) {
    .about-inner {
        gap: 1.5rem;
    }

    .about-text {
        font-size: clamp(1.6rem, 3.5vw, 3rem);
    }

    .about-stats {
        padding-top: 1rem;
    }

    .stat-value {
        font-size: clamp(1.2rem, 2.2vw, 1.8rem);
    }
}
</style>