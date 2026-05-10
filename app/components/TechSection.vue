<script setup>
import { ref } from 'vue'

const techGroups = [
    {
        category: 'Frontend',
        comment: '// what you see',
        items: [
            { name: 'HTML', icon: 'devicon:html5', primary: true },
            { name: 'CSS', icon: 'devicon:css3', primary: true },          
            { name: 'Vue.js', icon: 'devicon:vuejs', primary: true },
            { name: 'Nuxt.js', icon: 'devicon:nuxtjs', primary: true },
            { name: 'JavaScript', icon: 'devicon:javascript', primary: true },
            { name: 'TypeScript', icon: 'devicon:typescript', primary: true },
            { name: 'Tailwind CSS', icon: 'devicon:tailwindcss', primary: true },
            { name: 'Bootstrap', icon: 'devicon:bootstrap', primary: true },
        ],
    },
    {
        category: 'Backend',
        comment: "// what you don't see",
        items: [
            { name: 'Node.js', icon: 'devicon:nodejs', primary: true },
            { name: 'Laravel', icon: 'devicon:laravel', primary: true },
            { name: 'Express.js', icon: 'devicon:express', primary: true },
            { name: 'PHP', icon: 'devicon:php', primary: true },
        ],
    },
    {
        category: 'Data & Tools',
        comment: '// under the hood',
        items: [
            { name: 'PostgreSQL', icon: 'devicon:postgresql', primary: true },
            { name: 'MySQL', icon: 'devicon:mysql', primary: true },
            { name: 'Git', icon: 'devicon:git', primary: true },
            { name: 'GitHub', icon: 'devicon:github', primary: true },
            { name: 'Figma', icon: 'devicon:figma', primary: true },       
        ],
    },
]

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
                <p class="stack-sub">Technologies I use to build scalable and reliable digital products.</p>
            </Motion>

            <div class="groups-wrap">
                <div v-for="(group, gi) in techGroups" :key="group.category" class="group">

                    <Motion class="group-header" :initial="{ opacity: 0, x: -16 }" :whileInView="{ opacity: 1, x: 0 }"
                        :viewport="{ once: true, amount: 0.3 }"
                        :transition="{ delay: gi * 0.08, duration: 0.5, ease: 'easeOut' }">
                        <span class="group-comment">{{ group.comment }}</span>
                        <span class="group-name">{{ group.category }}</span>
                    </Motion>

                    <div class="cards-grid">
                        <Motion v-for="(item, ii) in group.items" :key="item.name" class="card-wrap"
                            :initial="{ opacity: 0, y: 30 }" :whileInView="{ opacity: 1, y: 0 }"
                            :viewport="{ once: true, amount: 0.2 }"
                            :transition="{ delay: gi * 0.06 + ii * 0.07, duration: 0.55, ease: [0.16, 1, 0.3, 1] }">
                            <div class="card" :class="{ 'card--primary': item.primary }"
                                :style="tiltStyle(`${gi}-${ii}`)" @mousemove="onMouseMove($event, `${gi}-${ii}`)"
                                @mouseleave="onMouseLeave(`${gi}-${ii}`)">

                                <div class="card-shine" />

                                <div class="card-icon">
                                    <Icon :name="item.icon" />
                                </div>

                                <span class="card-name">{{ item.name }}</span>

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

/* Icon — pakai font-size karena Icon component render sebagai inline svg/img */
.card-icon {
    width: 28px;
    height: 28px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    transition: transform 0.3s ease, filter 0.25s ease;
}

.card:hover .card-icon {
    transform: translateY(-2px);
}

/* Icon di dark card — grayscale supaya warnanya netral, hover balik ke warna asli */
.card--primary .card-icon {
    filter: grayscale(1) brightness(0.7) sepia(0.3);
}

.card--primary:hover .card-icon {
    filter: grayscale(0) brightness(1);
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