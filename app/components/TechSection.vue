<script setup>
import { ref } from 'vue'

const techGroups = [
    {
        category: 'Frontend',
        comment: '// what you see',
        items: [
            {
                name: 'Vue',
                primary: true,
                level: 'Expert',
                icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 4L12 20L22 4H17.5L12 13.5L6.5 4H2Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round" fill="none"/>
                    <path d="M6.5 4L12 13.5L17.5 4H13.5L12 6.5L10.5 4H6.5Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round" fill="none"/>
                </svg>`,
            },
            {
                name: 'Nuxt',
                primary: true,
                level: 'Expert',
                icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.5 3L22 18H5L8.5 12" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M8.5 3L2 14H10" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>`,
            },
            {
                name: 'TypeScript',
                primary: true,
                level: 'Advanced',
                icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="18" height="18" rx="1" stroke="currentColor" stroke-width="1.2"/>
                    <path d="M7 9H17M12 9V17" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
                    <path d="M13 14C13 14 13.5 17 16 17C17.5 17 18 16.2 18 15.5C18 13.5 13 13.5 13 11.5C13 10.2 14 9.5 15.5 9.5C17.5 9.5 18 11 18 11" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
                </svg>`,
            },
            {
                name: 'Tailwind',
                primary: true,
                level: 'Advanced',
                icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 6C9.6 6 8.1 7.2 7.5 9.6C8.4 8.4 9.45 7.95 10.65 8.25C11.341 8.424 11.834 8.925 12.38 9.477C13.279 10.394 14.32 11.47 16.5 11.47C18.9 11.47 20.4 10.27 21 7.87C20.1 9.07 19.05 9.52 17.85 9.22C17.159 9.046 16.666 8.545 16.12 7.993C15.221 7.076 14.18 6 12 6Z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M7.5 14.47C5.1 14.47 3.6 15.67 3 18.07C3.9 16.87 4.95 16.42 6.15 16.72C6.841 16.894 7.334 17.395 7.88 17.947C8.779 18.864 9.82 19.94 12 19.94C14.4 19.94 15.9 18.74 16.5 16.34C15.6 17.54 14.55 17.99 13.35 17.69C12.659 17.516 12.166 17.015 11.62 16.463C10.721 15.546 9.68 14.47 7.5 14.47Z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>`,
            },
            {
                name: 'CSS / SCSS',
                primary: true,
                level: 'Expert',
                icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 3L5.5 19.5L12 21.5L18.5 19.5L20 3H4Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>
                    <path d="M8 8H16L15.5 13.5L12 14.5L8.5 13.5L8.25 11H10.25L10.375 12.25L12 12.75L13.625 12.25L13.75 10.5H8L7.5 8Z" stroke="currentColor" stroke-width="1" stroke-linejoin="round"/>
                </svg>`,
            },
            {
                name: 'GSAP',
                primary: true,
                level: 'Intermediate',
                icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.2"/>
                    <path d="M12 7V12L15 15" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
                    <path d="M7 12H9" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
                </svg>`,
            },
        ],
    },
    {
        category: 'Backend',
        comment: '// what you don\'t see',
        items: [
            {
                name: 'Node.js',
                primary: true,
                level: 'Advanced',
                icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L21 7V17L12 22L3 17V7L12 2Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>
                    <path d="M12 2V22M3 7L21 17M21 7L3 17" stroke="currentColor" stroke-width="0.6" stroke-linejoin="round" opacity="0.4"/>
                </svg>`,
            },
            {
                name: 'Laravel',
                primary: true,
                level: 'Intermediate',
                icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 7C21 7 14 3 12 2C10 3 3 7 3 7V13C3 16.5 7 19.5 12 22C17 19.5 21 16.5 21 13V7Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>
                    <path d="M12 7L16 9.5V14.5L12 17L8 14.5V9.5L12 7Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>
                </svg>`,
            },
            {
                name: 'Express',
                primary: true,
                level: 'Advanced',
                icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 6H20M4 10H14M4 14H20M4 18H10" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
                </svg>`,
            },
            {
                name: 'REST API',
                primary: true,
                level: 'Expert',
                icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="5" cy="12" r="2" stroke="currentColor" stroke-width="1.2"/>
                    <circle cx="19" cy="12" r="2" stroke="currentColor" stroke-width="1.2"/>
                    <circle cx="12" cy="6" r="2" stroke="currentColor" stroke-width="1.2"/>
                    <circle cx="12" cy="18" r="2" stroke="currentColor" stroke-width="1.2"/>
                    <path d="M7 12H17M12 8V16" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
                </svg>`,
            },
        ],
    },
    {
        category: 'Data & Tools',
        comment: '// under the hood',
        items: [
            {
                name: 'PostgreSQL',
                primary: true,
                level: 'Intermediate',
                icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="12" cy="7" rx="8" ry="3" stroke="currentColor" stroke-width="1.2"/>
                    <path d="M4 7V17C4 18.657 7.582 20 12 20C16.418 20 20 18.657 20 17V7" stroke="currentColor" stroke-width="1.2"/>
                    <path d="M4 12C4 13.657 7.582 15 12 15C16.418 15 20 13.657 20 12" stroke="currentColor" stroke-width="1.2"/>
                </svg>`,
            },
            {
                name: 'MySQL',
                primary: true,
                level: 'Advanced',
                icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="12" cy="7" rx="8" ry="3" stroke="currentColor" stroke-width="1.2"/>
                    <path d="M4 7V17C4 18.657 7.582 20 12 20C16.418 20 20 18.657 20 17V7" stroke="currentColor" stroke-width="1.2"/>
                    <path d="M20 12C20 12 17 14 12 14C7 14 4 12 4 12" stroke="currentColor" stroke-width="1.2"/>
                    <path d="M16 3V8M16 8L18 6M16 8L14 6" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>`,
            },
            {
                name: 'Git',
                primary: true,
                level: 'Advanced',
                icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="6" cy="6" r="2" stroke="currentColor" stroke-width="1.2"/>
                    <circle cx="6" cy="18" r="2" stroke="currentColor" stroke-width="1.2"/>
                    <circle cx="18" cy="10" r="2" stroke="currentColor" stroke-width="1.2"/>
                    <path d="M6 8V16" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
                    <path d="M6 8C6 8 6 5 9 4C12 3 16 4 18 8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
                </svg>`,
            },
            {
                name: 'Figma',
                primary: true,
                level: 'Intermediate',
                icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="8" y="3" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.2"/>
                    <rect x="8" y="8" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.2"/>
                    <rect x="8" y="13" width="5" height="5" rx="2.5" stroke="currentColor" stroke-width="1.2"/>
                    <rect x="13" y="3" width="5" height="5" rx="2.5" stroke="currentColor" stroke-width="1.2"/>
                    <circle cx="15.5" cy="10.5" r="2.5" stroke="currentColor" stroke-width="1.2"/>
                </svg>`,
            },
            {
                name: 'Docker',
                primary: true,
                level: 'Beginner',
                icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="11" width="3" height="3" stroke="currentColor" stroke-width="1.2"/>
                    <rect x="7" y="11" width="3" height="3" stroke="currentColor" stroke-width="1.2"/>
                    <rect x="11" y="11" width="3" height="3" stroke="currentColor" stroke-width="1.2"/>
                    <rect x="7" y="7" width="3" height="3" stroke="currentColor" stroke-width="1.2"/>
                    <rect x="11" y="7" width="3" height="3" stroke="currentColor" stroke-width="1.2"/>
                    <path d="M15 12C15 12 16 11 18 11.5C18.5 9.5 17 9 17 9C17 9 17.5 7.5 16 7C16 7 14.5 8 15 10" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M2 14C2 14 3 16 6 16H17C19 16 20 14.5 20 14" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
                </svg>`,
            },
        ],
    },
]

const levelWidth = { Expert: '100%', Advanced: '75%', Intermediate: '50%', Beginner: '25%' }

const tiltData = ref({})

const onMouseMove = (e, id) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const rotX = ((y - cy) / cy) * -10
    const rotY = ((x - cx) / cx) * 10
    tiltData.value[id] = { rotX, rotY, active: true }
}

const onMouseLeave = (id) => {
    tiltData.value[id] = { rotX: 0, rotY: 0, active: false }
}

const tiltStyle = (id) => {
    const d = tiltData.value[id]
    if (!d) return {}
    return {
        transform: `perspective(600px) rotateX(${d.rotX}deg) rotateY(${d.rotY}deg) ${d.active ? 'scale(1.03)' : 'scale(1)'}`,
        transition: d.active ? 'transform 0.08s ease' : 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
    }
}
</script>

<template>
    <section id="stack" class="stack">
        <div class="stack-inner">

            <Motion class="stack-header" :initial="{ opacity: 0, y: 24 }" :whileInView="{ opacity: 1, y: 0 }"
                :viewport="{ once: true, amount: 0.3 }" :transition="{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }">
                <span class="stack-label">( Stack. )</span>
                <h2 class="stack-title">TECH &<br>TOOLS</h2>
                <p class="stack-sub">Technologies I reach for when building things that last.</p>
            </Motion>

            <div class="groups-wrap">
                <div v-for="(group, gi) in techGroups" :key="group.category" class="group">

                    <!-- Group header -->
                    <Motion class="group-header" :initial="{ opacity: 0, x: -16 }" :whileInView="{ opacity: 1, x: 0 }"
                        :viewport="{ once: true, amount: 0.3 }"
                        :transition="{ delay: gi * 0.08, duration: 0.5, ease: 'easeOut' }">
                        <span class="group-comment">{{ group.comment }}</span>
                        <span class="group-name">{{ group.category }}</span>
                    </Motion>

                    <!-- Cards grid -->
                    <div class="cards-grid">
                        <Motion v-for="(item, ii) in group.items" :key="item.name" class="card-wrap"
                            :initial="{ opacity: 0, y: 30 }" :whileInView="{ opacity: 1, y: 0 }"
                            :viewport="{ once: true, amount: 0.2 }"
                            :transition="{ delay: gi * 0.06 + ii * 0.07, duration: 0.55, ease: [0.16, 1, 0.3, 1] }">
                            <div class="card" :class="{ 'card--primary': item.primary }"
                                :style="tiltStyle(`${gi}-${ii}`)" @mousemove="onMouseMove($event, `${gi}-${ii}`)"
                                @mouseleave="onMouseLeave(`${gi}-${ii}`)">

                                <!-- Shine layer -->
                                <div class="card-shine" />

                                <!-- Icon -->
                                <div class="card-icon" v-html="item.icon" />

                                <!-- Name -->
                                <span class="card-name">{{ item.name }}</span>

                                <!-- Corner decoration -->
                                <span class="card-corner card-corner--tl" />
                                <span class="card-corner card-corner--br" />
                            </div>
                        </Motion>
                    </div>

                </div>
            </div>

        </div>
    </section>
</template>

<style scoped>
.stack {
    position: relative;
    width: 100%;
    min-height: 100svh;
    background: #f0ece4;
    display: flex;
    align-items: flex-start;
    overflow: hidden;
}

.stack-inner {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 100px 2.5rem 6rem;
    display: flex;
    flex-direction: column;
    gap: 4rem;
}

.stack-header {
    display: flex;
    align-items: flex-end;
    gap: 2rem;
    flex-wrap: wrap;
}

.stack-label {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.62rem;
    letter-spacing: 0.14em;
    color: #a89880;
    padding-bottom: 0.3rem;
}

.stack-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(2.8rem, 6vw, 5rem);
    line-height: 0.9;
    letter-spacing: 0.04em;
    color: #1a1612;
}

.stack-sub {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 300;
    font-size: 0.82rem;
    color: #a89880;
    max-width: 280px;
    line-height: 1.7;
    padding-bottom: 0.2rem;
    margin-left: auto;
}

.groups-wrap {
    display: flex;
    flex-direction: column;
    gap: 3.5rem;
}

.group-header {
    display: flex;
    align-items: baseline;
    gap: 1rem;
    margin-bottom: 1.25rem;
    padding-bottom: 0.75rem;
    border-bottom: 0.5px solid #ddd8cf;
}

.group-comment {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.55rem;
    letter-spacing: 0.14em;
    color: #c8b89a;
}

.group-name {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.1rem;
    letter-spacing: 0.1em;
    color: #1a1612;
}

.cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 12px;
}

.card-wrap {
    perspective: 600px;
}

.card {
    position: relative;
    padding: 1.25rem 1rem 1rem;
    border: 0.5px solid #ddd8cf;
    background: #f0ece4;
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    cursor: default;
    will-change: transform;
    overflow: hidden;

    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6), 0 1px 3px rgba(26, 22, 18, 0.04);
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
    border-color: #c8b89a;
    box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.8),
        0 8px 32px rgba(26, 22, 18, 0.10),
        0 2px 8px rgba(26, 22, 18, 0.06);
}

.card--primary {
    background: #1a1612;
    border-color: #1a1612;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 4px 16px rgba(26, 22, 18, 0.18);
}

.card--primary:hover {
    border-color: #c8b89a;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 12px 40px rgba(26, 22, 18, 0.28);
}

.card-shine {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.12) 0%, transparent 60%);
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s ease;
}

.card:hover .card-shine {
    opacity: 1;
}

.card-icon {
    width: 28px;
    height: 28px;
    color: #a89880;
    flex-shrink: 0;
    transition: color 0.25s ease, transform 0.3s ease;
}

.card-icon :deep(svg) {
    width: 100%;
    height: 100%;
}

.card:hover .card-icon {
    color: #1a1612;
    transform: translateY(-2px);
}

.card--primary .card-icon {
    color: #c8b89a;
}

.card--primary:hover .card-icon {
    color: #f0ece4;
}

.card-name {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.62rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #1a1612;
    line-height: 1;
}

.card--primary .card-name {
    color: #f0ece4;
}

.card-level {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-top: auto;
}

.level-track {
    height: 1px;
    background: rgba(26, 22, 18, 0.12);
    overflow: hidden;
}

.card--primary .level-track {
    background: rgba(240, 236, 228, 0.15);
}

.level-fill {
    height: 100%;
    background: #a89880;
    transition: width 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.card--primary .level-fill {
    background: #c8b89a;
}

.level-label {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.44rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #c8b89a;
}

.card--primary .level-label {
    color: #a89880;
}

.card-corner {
    position: absolute;
    width: 6px;
    height: 6px;
    border-color: #c8b89a;
    border-style: solid;
    opacity: 0;
    transition: opacity 0.25s ease;
}

.card:hover .card-corner {
    opacity: 1;
}

.card-corner--tl {
    top: 5px;
    left: 5px;
    border-width: 0.5px 0 0 0.5px;
}

.card-corner--br {
    bottom: 5px;
    right: 5px;
    border-width: 0 0.5px 0.5px 0;
}

@media (max-width: 900px) {
    .cards-grid {
        grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    }
}

@media (max-width: 768px) {
    .stack-inner {
        padding: 80px 1.5rem 3rem;
        gap: 3rem;
    }

    .stack-header {
        gap: 1rem;
    }

    .stack-sub {
        margin-left: 0;
        width: 100%;
    }

    .cards-grid {
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 8px;
    }
}

@media (max-width: 480px) {
    .stack-inner {
        padding: 72px 1rem 2.5rem;
    }

    .cards-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}
</style>