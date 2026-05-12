<script setup>
import { ref } from 'vue'
import { Motion } from 'motion-v'

const modal = ref({ show: false, project: null })
const cardStates = ref({})

function handleMouseMove(e, i) {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    cardStates.value[i] = { rotateX: -y * 12, rotateY: x * 12 }
}

function handleMouseLeave(i) {
    cardStates.value[i] = { rotateX: 0, rotateY: 0 }
}

function getThumbStyle(i) {
    const s = cardStates.value[i] || { rotateX: 0, rotateY: 0 }
    const shadowX = s.rotateY * 1.5
    const shadowY = s.rotateX * -1.5
    return {
        transform: `perspective(900px) rotateX(${s.rotateX}deg) rotateY(${s.rotateY}deg)`,
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        boxShadow: `${shadowX}px ${shadowY}px 30px rgba(26, 22, 18, 0.25)`,
    }
}

function openGithubModal(project) {
    if (project.githubBE) {
        modal.value = { show: true, project }
    } else {
        window.open(project.github, '_blank')
    }
}

function closeModal() {
    modal.value = { show: false, project: null }
}

const projects = [
    {
        index: '01',
        name: 'KnowledgePulse',
        desc: 'A UI design exploration built while learning Figma. Covers landing page, register page, and checkout page with focused on layout, spacing, and component structure.',
        tags: ['Figma', 'UI Design'],
        year: '2026',
        type: 'Design',
        live: 'https://www.figma.com/design/GodL1rEnmTBcpa9ndkczTB/Portofolio?node-id=0-1&t=WsvblzNjXpsQu5i7-1',
        liveLabel: 'View in Figma',
        github: null,
        githubBE: null,
        thumb: "assets/project-9.png",
    },
    {
        index: '02',
        name: 'Motion Portfolio',
        desc: 'The portfolio you are looking at right now. Built to showcase projects and identity with custom scroll animations and interactions.',
        tags: ['Nuxt.js', 'Motion-V', 'CSS'],
        year: '2026',
        type: 'Web App',
        live: 'https://rifqy.vercel.app',
        github: 'https://github.com/rifqyaliansyah/rifqy.git',
        thumb: 'assets/project.png',
    },
    {
        index: '03',
        name: 'MyUang',
        desc: 'A personal finance app to help you track income, manage expenses, set budgets with pockets, and achieve your financial goals all in one place. Secured with PIN protection and smart notifications.',
        tags: ['Vue.js', 'Ionic', 'Capacitor', 'Express.js', 'Supabase', 'PostgreSQL'],
        year: '2026',
        type: 'Web & Mobile App',
        live: 'https://my-uang.vercel.app',
        github: 'https://github.com/rifqyaliansyah/myUang.git',
        githubBE: 'https://github.com/rifqyaliansyah/myUang-API.git',
        thumb: 'assets/project-1.png',
    },
    {
        index: '04',
        name: 'Presensi Guru SMKN 1 Cisarua',
        desc: 'A web-based attendance system for tracking teacher presence in class. Students can submit attendance records, while admins can monitor, export, and import attendance reports.',
        tags: ['Nuxt.js', 'Express.js', 'PostgreSQL', 'Chart.js', 'Cloudinary', 'ExcelJS'],
        year: '2026',
        type: 'Web App',
        team: true,
        live: 'https://presensi-guru-smkn-1-cisarua.vercel.app',
        github: null,
        githubBE: null,
        thumb: 'assets/project-2.png',
    },
    {
        index: '05',
        name: 'Peta-Pim',
        desc: 'A collaborative map where users can drop pins on real locations, attach a title, description, and personal story to each spot. Browse others pins on the map and read their stories.',
        tags: ['Nuxt.js', 'Leaflet', 'Express.js', 'PostgreSQL', 'Tailwind', 'Pinia'],
        year: '2026',
        type: 'Web App',
        live: 'https://peta-pim.vercel.app',
        github: 'https://github.com/rifqyaliansyah/peta-pim.git',
        githubBE: 'https://github.com/rifqyaliansyah/peta-pim-bridge.git',
        thumb: 'assets/project-3.png',
    },
    {
        index: '06',
        name: 'Cherry Music',
        desc: 'A web-based music player where you can add tracks from local files or YouTube. Powered by a REST API with cloud storage via Cloudinary, synced interactive lyrics, and full playback controls including shuffle.',
        tags: ['Nuxt.js', 'Express.js', 'PostgreSQL', 'Cloudinary', 'Tailwind', 'Pinia'],
        year: '2026',
        type: 'Web App',
        live: 'https://cherry-music-client-v1.vercel.app',
        github: 'https://github.com/rifqyaliansyah/cherry-music-landing-v2.git',
        githubBE: 'https://github.com/rifqyaliansyah/cherry-music-api-v2.git',
        thumb: 'assets/project-4.png',
    },
    {
        index: '07',
        name: 'Kata-Ku',
        desc: 'A platform where anyone can write and share their own quotes and thoughts, with AI-assisted writing powered by Groq. Built with a separate REST API backend and a reactive Nuxt.js frontend.',
        tags: ['Nuxt.js', 'Express.js', 'PostgreSQL', 'Groq', 'Pinia', 'PaperCSS'],
        year: '2025',
        type: 'Web App',
        live: 'https://kata-ku.vercel.app',
        github: 'https://github.com/rifqyaliansyah/qwerty-landing.git',
        githubBE: 'https://github.com/rifqyaliansyah/qwerty-api.git',
        thumb: 'assets/project-5.png',
    },
    {
        index: '08',
        name: 'Lochness Terminal',
        desc: 'A personal portfolio disguised as a terminal. Type commands to explore who I am built entirely with Nuxt.js, no libraries, just raw interaction.',
        tags: ['Nuxt.js', 'CSS'],
        year: '2025',
        type: 'Web App',
        live: 'https://lochness-terminal.vercel.app',
        github: 'https://github.com/rifqyaliansyah/lochness-landing.git',
        thumb: 'assets/project-6.png',
    },
    {
        index: '09',
        name: 'WaroengElektronik',
        desc: 'A full-stack e-commerce platform for local small businesses, featuring product management, shopping cart, and Stripe payment integration. Admin panel powered by Filament with a reactive storefront built on Livewire.',
        tags: ['Laravel', 'Livewire', 'Filament', 'Stripe', 'Tailwind', 'MySQL'],
        year: '2025',
        type: 'Web App',
        live: 'https://github.com/rifqyaliansyah/project-ecommerce.git',
        liveLabel: 'Clone & Try',
        github: 'https://github.com/rifqyaliansyah/project-ecommerce.git',
        thumb: 'assets/project-7.png',
    },
    {
        index: '10',
        name: 'Image Resizer Electron',
        desc: 'A desktop application built with Electron.js for resizing and optimizing images in bulk. Supports multiple formats with a clean UI, real-time output preview, and instant toast notifications on completion.',
        tags: ['Electron.js', 'Node.js', 'resize-img', 'Toastify'],
        year: '2025',
        type: 'Desktop App',
        live: 'https://github.com/rifqyaliansyah/Image-resizer-electron.git',
        liveLabel: 'Clone & Try',
        github: 'https://github.com/rifqyaliansyah/Image-resizer-electron.git',
        thumb: 'assets/project-8.png',
    },
]
</script>

<template>
    <section id="works" class="works">
        <div class="works-inner">

            <div class="works-header">
                <span class="section-label">( Works. )</span>
                <h2 class="section-title">Selected<br>Projects</h2>
            </div>

            <div class="works-list">
                <Motion v-for="(project, i) in projects" :key="i" class="project-row" :initial="{ opacity: 0, y: 50 }"
                    :animate="{ opacity: 1, y: 0 }" :transition="{ duration: 0.6, delay: i * 0.08, ease: 'easeOut' }">
                    <div class="project-divider">
                        <span class="project-index">{{ project.index }}</span>
                        <div class="divider-line" />
                    </div>

                    <div class="project-body">

                        <div class="project-info">
                            <div class="project-meta">
                                <span class="project-type">{{ project.type }}</span>
                                <span v-if="project.team" class="project-team">Team Project</span>
                                <span class="project-year">{{ project.year }}</span>
                            </div>
                            <h3 class="project-name">{{ project.name }}</h3>
                            <p class="project-desc">{{ project.desc }}</p>
                            <div class="project-tags">
                                <span v-for="tag in project.tags" :key="tag" class="project-tag">
                                    {{ tag }}
                                </span>
                            </div>
                            <div class="project-links">
                                <a v-if="project.live" :href="project.live" target="_blank"
                                    class="project-link project-link--primary">
                                    {{ project.liveLabel || 'Live Site' }} ↗
                                </a>
                                <button v-if="project.github || project.githubBE" @click="openGithubModal(project)"
                                    class="project-link project-link--ghost">
                                    GitHub ↗
                                </button>
                            </div>
                        </div>

                        <div class="project-thumb" :style="getThumbStyle(i)" @mousemove="handleMouseMove($event, i)"
                            @mouseleave="handleMouseLeave(i)">
                            <div class="thumb-inner">
                                <div v-if="!project.thumb" class="thumb-placeholder">
                                    <span class="thumb-label">{{ project.name }}</span>
                                    <div class="thumb-grid">
                                        <div v-for="n in 12" :key="n" class="thumb-cell" />
                                    </div>
                                </div>
                                <img v-else :src="project.thumb" :alt="project.name" class="thumb-img" />
                            </div>
                        </div>

                    </div>
                </Motion>
            </div>

            <Transition name="modal">
                <div v-if="modal.show" class="modal-backdrop" @click.self="closeModal">
                    <div class="modal">
                        <span class="modal-title">{{ modal.project.name }}</span>
                        <a :href="modal.project.github" target="_blank" class="project-link project-link--primary">
                            Frontend ↗
                        </a>
                        <a :href="modal.project.githubBE" target="_blank" class="project-link project-link--primary">
                            Backend ↗
                        </a>
                        <button @click="closeModal" class="modal-close">✕</button>
                    </div>
                </div>
            </Transition>

        </div>
    </section>
</template>

<style scoped>
.works {
    position: relative;
    width: 100%;
    min-height: 100svh;
    background: #f0ece4;
    display: flex;
    align-items: flex-start;
}

.works-inner {
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
    padding: 100px 2.5rem 5rem;
}

.works-header {
    display: flex;
    align-items: flex-end;
    gap: 2rem;
    margin-bottom: 4rem;
}

.section-label {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.62rem;
    letter-spacing: 0.14em;
    color: #a89880;
    padding-bottom: 0.3rem;
}

.section-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(2.8rem, 6vw, 5rem);
    line-height: 0.9;
    letter-spacing: 0.04em;
    color: #1a1612;
}

.works-list {
    display: flex;
    flex-direction: column;
}

.project-row {
    border-bottom: 0.5px solid #ddd8cf;
    padding-bottom: 3.5rem;
    margin-bottom: 3.5rem;
}

.project-row:last-child {
    border-bottom: none;
    margin-bottom: 0;
}

.project-divider {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.project-index {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.58rem;
    letter-spacing: 0.14em;
    color: #c8b89a;
    flex-shrink: 0;
}

.divider-line {
    flex: 1;
    height: 0.5px;
    background: #ddd8cf;
}

.project-body {
    display: grid;
    grid-template-columns: 1fr 1.1fr;
    gap: 3rem;
    align-items: center;
}

.project-row:nth-child(even) .project-body {
    direction: rtl;
}

.project-row:nth-child(even) .project-body>* {
    direction: ltr;
}

.project-info {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.project-meta {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
}

.project-team {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.52rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #a89880;
    border: 0.5px solid #ddd8cf;
    padding: 2px 10px;
}

.project-type {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.52rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #f0ece4;
    background: #1a1612;
    padding: 2px 10px;
}

.project-year {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.56rem;
    letter-spacing: 0.1em;
    color: #a89880;
}

.project-name {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(2rem, 4vw, 3.5rem);
    line-height: 0.95;
    letter-spacing: 0.04em;
    color: #1a1612;
}

.project-desc {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 300;
    font-size: 0.82rem;
    line-height: 1.85;
    color: #6b5f52;
    max-width: 420px;
}

.project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
}

.project-tag {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.5rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #a89880;
    border: 0.5px solid #ddd8cf;
    padding: 3px 10px;
    transition: border-color 0.2s ease, color 0.2s ease;
}

.project-tag:hover {
    border-color: #a89880;
    color: #1a1612;
}

.project-links {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 0.25rem;
}

.project-link {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.58rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    text-decoration: none;
    transition: all 0.2s ease;
}

.project-link--primary {
    color: #f0ece4;
    background: #1a1612;
    padding: 8px 18px;
}

.project-link--primary:hover {
    background: #2e2820;
    box-shadow: 0 0 20px rgba(26, 22, 18, 0.12);
}

.project-link--ghost {
    color: #a89880;
    border: 0.5px solid #ddd8cf;
    padding: 8px 18px;
    cursor: pointer;
    background: none;
}

.project-link--ghost:hover {
    border-color: #a89880;
    color: #1a1612;
}

.project-thumb {
    position: relative;
    overflow: hidden;
    aspect-ratio: 16 / 9;
    background: #e8e2d8;
    cursor: none;
    will-change: transform;
    transform-style: preserve-3d;
}

.thumb-inner {
    width: 100%;
    height: 100%;
}

.thumb-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    position: relative;
    overflow: hidden;
}

.thumb-label {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(1.5rem, 3vw, 2.2rem);
    letter-spacing: 0.06em;
    color: #c8b89a;
    position: relative;
    z-index: 1;
}

.thumb-grid {
    position: absolute;
    inset: 0;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 1px;
    opacity: 0.3;
}

.thumb-cell {
    background: #ddd8cf;
}

.thumb-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(26, 22, 18, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
}

.modal {
    background: #f0ece4;
    padding: 2rem 2.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    min-width: 260px;
    position: relative;
}

.modal-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.4rem;
    letter-spacing: 0.08em;
    color: #1a1612;
}

.modal-close {
    position: absolute;
    top: 0.75rem;
    right: 1rem;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.7rem;
    color: #a89880;
    background: none;
    border: none;
    cursor: pointer;
}

.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.25s ease;
}

.modal-enter-active .modal,
.modal-leave-active .modal {
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .modal {
    transform: translateY(20px);
    opacity: 0;
}

.modal-leave-to .modal {
    transform: translateY(10px);
    opacity: 0;
}

@media (max-width: 900px) {
    .project-body {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }

    .project-row:nth-child(even) .project-body {
        direction: ltr;
    }

    .project-thumb {
        order: -1;
    }
}

@media (max-width: 768px) {
    .works-inner {
        padding: 80px 1.5rem 3rem;
    }

    .works-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
        margin-bottom: 2.5rem;
    }

    .project-row {
        padding-bottom: 2.5rem;
        margin-bottom: 2.5rem;
    }
}

@media (max-width: 480px) {
    .works-inner {
        padding: 72px 1rem 2.5rem;
    }

    .project-links {
        flex-wrap: wrap;
    }
}
</style>