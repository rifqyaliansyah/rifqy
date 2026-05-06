<script setup>
const projects = [
    {
        index: '01',
        name: 'Project Alpha',
        desc: 'Dashboard analytics internal perusahaan dengan visualisasi data real-time dan sistem notifikasi terintegrasi.',
        tags: ['Vue', 'Node.js', 'PostgreSQL', 'Chart.js'],
        year: '2024',
        type: 'Web App',
        live: 'https://example.com',
        github: 'https://github.com',
        thumb: null,
    },
    {
        index: '02',
        name: 'Studio Collective',
        desc: 'Website company profile untuk studio desain kreatif dengan animasi scroll dan galeri karya interaktif.',
        tags: ['Nuxt', 'GSAP', 'CSS'],
        year: '2024',
        type: 'Company Profile',
        live: 'https://example.com',
        github: 'https://github.com',
        thumb: null,
    },
    {
        index: '03',
        name: 'Warung Digital',
        desc: 'Platform e-commerce UMKM lokal lengkap dengan manajemen produk, keranjang, dan integrasi payment gateway.',
        tags: ['Nuxt', 'Laravel', 'MySQL', 'Midtrans'],
        year: '2023',
        type: 'E-Commerce',
        live: 'https://example.com',
        github: 'https://github.com',
        thumb: null,
    },
    {
        index: '04',
        name: 'Rifqy Portfolio',
        desc: 'Portfolio pribadi dengan canvas animation, custom cursor, CRT overlay, dan scroll-based interactions.',
        tags: ['Nuxt', 'Canvas API', 'Motion', 'CSS'],
        year: '2024',
        type: 'Personal Project',
        live: 'https://example.com',
        github: 'https://github.com',
        thumb: null,
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
                <div v-for="(project, i) in projects" :key="i" class="project-row">
                    <div class="project-divider">
                        <span class="project-index">{{ project.index }}</span>
                        <div class="divider-line" />
                    </div>

                    <div class="project-body">

                        <div class="project-info">
                            <div class="project-meta">
                                <span class="project-type">{{ project.type }}</span>
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
                                <a :href="project.live" target="_blank" class="project-link project-link--primary">
                                    Live Site ↗
                                </a>
                                <a :href="project.github" target="_blank" class="project-link project-link--ghost">
                                    GitHub ↗
                                </a>
                            </div>
                        </div>

                        <div class="project-thumb">
                            <div class="thumb-inner">
                                <div v-if="!project.thumb" class="thumb-placeholder">
                                    <span class="thumb-label">{{ project.name }}</span>
                                    <div class="thumb-grid">
                                        <div v-for="n in 12" :key="n" class="thumb-cell" />
                                    </div>
                                </div>
                                <img v-else :src="project.thumb" :alt="project.name" class="thumb-img" />
                            </div>
                            <div class="thumb-overlay">
                                <span class="thumb-overlay-text">View Project</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

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
}

.project-link--ghost:hover {
    border-color: #a89880;
    color: #1a1612;
}

.project-thumb {
    position: relative;
    overflow: hidden;
    aspect-ratio: 16 / 10;
    background: #e8e2d8;
    cursor: none;
}

.thumb-inner {
    width: 100%;
    height: 100%;
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.project-thumb:hover .thumb-inner {
    transform: scale(1.04);
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
    transition: background 0.3s ease;
}

.project-thumb:hover .thumb-cell:nth-child(odd) {
    background: #c8b89a;
}

.thumb-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.thumb-overlay {
    position: absolute;
    inset: 0;
    background: rgba(26, 22, 18, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.35s ease;
}

.project-thumb:hover .thumb-overlay {
    opacity: 1;
}

.thumb-overlay-text {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.4rem;
    letter-spacing: 0.2em;
    color: #f0ece4;
    transform: translateY(8px);
    transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.project-thumb:hover .thumb-overlay-text {
    transform: translateY(0);
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