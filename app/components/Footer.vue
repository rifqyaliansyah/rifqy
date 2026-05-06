<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const timeStr = ref('')
const city = 'Jakarta'

let timer = null

const updateTime = () => {
    const now = new Date()
    const opts = { timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit', hour12: true }
    timeStr.value = new Intl.DateTimeFormat('en-US', opts).format(now)
}

onMounted(() => {
    updateTime()
    timer = setInterval(updateTime, 1000)
})

onUnmounted(() => clearInterval(timer))
</script>

<template>
    <footer class="footer">

        <div class="footer-bar">
            <span class="bar-item">© 2025 Rifqy.</span>

            <span class="bar-item bar-location">{{ city }} {{ timeStr }}</span>
            <div class="bar-icons">
                <div class="icon-wrap">
                    <a href="https://github.com/rifqyaliansyah" target="_blank" class="bar-icon">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                                stroke="currentColor" stroke-width="1.2" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                    </a>
                    <span class="icon-tooltip">GitHub</span>
                </div>
                <div class="icon-wrap">
                    <a href="https://linkedin.com" target="_blank" class="bar-icon">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="2" y="2" width="20" height="20" rx="3" stroke="currentColor" stroke-width="1.2" />
                            <path d="M7 10v7M7 7v.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
                            <path d="M11 17v-4c0-1.5 1-2 2-2s2 .5 2 2v4" stroke="currentColor" stroke-width="1.2"
                                stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M11 10v7" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
                        </svg>
                    </a>
                    <span class="icon-tooltip">LinkedIn</span>
                </div>
                <div class="icon-wrap">
                    <a href="https://instagram.com" target="_blank" class="bar-icon">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" stroke-width="1.2" />
                            <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.2" />
                            <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                        </svg>
                    </a>
                    <span class="icon-tooltip">Instagram</span>
                </div>
            </div>
        </div>

        <div class="footer-name">
            <a href="#" class="footer-brand">
                <span class="name-at">@</span>rifqyaliansyah
            </a>
        </div>

    </footer>
</template>

<style scoped>
.footer {
    position: relative;
    width: 100%;
    background: #0e0c0a;
    border-top: 0.5px solid rgba(255, 255, 255, 0.06);
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.footer-bar {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    padding: 1.25rem 2.5rem;
    border-bottom: 0.5px solid rgba(255, 255, 255, 0.05);
    gap: 1rem;
}

.bar-item {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.58rem;
    letter-spacing: 0.12em;
    color: rgba(168, 152, 128, 0.7);
    text-transform: uppercase;
}

.bar-location {
    text-align: center;
}

.bar-icons {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: flex-end;
}

.icon-wrap {
    position: relative;
    display: flex;
    align-items: center;
}

.icon-tooltip {
    position: absolute;
    top: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%) translateY(-4px);
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.45rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(168, 152, 128, 0.9);
    background: #1a1714;
    border: 0.5px solid rgba(255, 255, 255, 0.06);
    padding: 4px 8px;
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s ease, transform 0.2s ease;
}

.icon-wrap:hover .icon-tooltip {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
}

.bar-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    color: rgba(168, 152, 128, 0.5);
    transition: color 0.2s ease;
    text-decoration: none;
}

.bar-icon svg {
    width: 100%;
    height: 100%;
}

.bar-icon:hover {
    color: #c8b89a;
}

.footer-name {
    padding: 1.25rem 2.5rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.footer-brand {
    font-family: 'VT323', monospace;
    font-size: 2rem;
    line-height: 1;
    color: rgba(255, 255, 255, 0.9);
    text-decoration: none;
    letter-spacing: 0.02em;
}

.name-at {
    color: #c8b89a;
}

@media (max-width: 768px) {
    .footer-bar {
        grid-template-columns: 1fr auto 1fr;
        padding: 1rem 1.5rem;
        gap: 0.5rem;
    }

    .bar-location {
        text-align: center;
    }

    .bar-icons {
        justify-content: flex-end;
        gap: 0.75rem;
    }

    .bar-icon {
        width: 15px;
        height: 15px;
    }

    .footer-name {
        padding: 1rem 1.5rem 1.25rem;
    }

    .footer-brand {
        font-size: 1.4rem;
    }
}

@media (max-width: 480px) {
    .footer-bar {
        padding: 0.875rem 1rem;
        gap: 0.4rem;
    }

    .bar-item {
        font-size: 0.5rem;
    }

    .bar-icon {
        width: 13px;
        height: 13px;
    }

    .footer-name {
        padding: 0.875rem 1rem 1.25rem;
    }

    .footer-brand {
        font-size: 1.2rem;
    }
}
</style>