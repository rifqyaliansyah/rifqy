<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const heroRef = ref(null)
const formRef = ref(null)
const formVisible = ref(false)

const form = ref({ name: '', email: '', message: '' })
const sending = ref(false)
const sent = ref(false)

let observer = null

const handleSubmit = async () => {
    if (!form.value.name || !form.value.email || !form.value.message) return
    sending.value = true

    try {
        await fetch('https://script.google.com/macros/s/AKfycbzWb6aNfPJ2fQ3U2naDkYzuoSAvCVqyFxZ0pFjc9_wWeSqdx38WUO5t-u7XDqAQqtg/exec', {
            method: 'POST',
            body: JSON.stringify({
                name: form.value.name,
                email: form.value.email,
                message: form.value.message,
            }),
        })
    } catch (err) {
        console.error(err)
    }

    sending.value = false
    sent.value = true
}

const resetForm = () => {
    form.value = { name: '', email: '', message: '' }
    sent.value = false
}

onMounted(() => {
    observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) formVisible.value = true },
        { threshold: 0.15 }
    )
    if (formRef.value) observer.observe(formRef.value)
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
    <section id="contact" class="contact">

        <div class="contact-hero" ref="heroRef">
            <Motion as="p" class="contact-label" :initial="{ opacity: 0, y: -10 }" :whileInView="{ opacity: 1, y: 0 }"
                :viewport="{ once: true, amount: 0.5 }" :transition="{ delay: 0.2, duration: 0.5 }">
                // Let’s build something great together.
            </Motion>

            <h2 class="contact-big">
                <Motion as="span" class="big-line" :initial="{ opacity: 0, y: 60 }" :whileInView="{ opacity: 1, y: 0 }"
                    :viewport="{ once: true, amount: 0.5 }"
                    :transition="{ delay: 0.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] }">
                    GET IN
                </Motion>
                <Motion as="span" class="big-line big-outline" :initial="{ opacity: 0, y: 60 }"
                    :whileInView="{ opacity: 1, y: 0 }" :viewport="{ once: true, amount: 0.5 }"
                    :transition="{ delay: 0.48, duration: 0.8, ease: [0.16, 1, 0.3, 1] }">
                    TOUCH
                </Motion>
            </h2>

            <Motion as="div" class="scroll-hint" :initial="{ opacity: 0 }" :whileInView="{ opacity: 1 }"
                :viewport="{ once: true, amount: 0.5 }" :transition="{ delay: 0.9, duration: 0.6 }">
                <span class="scroll-text">scroll</span>
                <div class="scroll-track">
                    <div class="scroll-thumb" />
                </div>
            </Motion>
        </div>

        <div class="contact-form-wrap" ref="formRef">
            <div class="contact-form-inner" :class="{ 'is-visible': formVisible }">

                <div class="contact-info">
                    <span class="section-label">( Contact. )</span>
                    <h3 class="contact-subtitle">Let's Work<br>Together</h3>
                    <p class="contact-body">
                        Have an interesting project? Need a developer who cares about the details? Let’s talk.
                    </p>
                </div>

                <div class="contact-form">
                    <Transition name="sent-fade" mode="out-in">
                        <div v-if="sent" class="form-sent">
                            <span class="sent-icon">✓</span>
                            <p class="sent-title">Message Sent.</p>
                            <p class="sent-body">I'll get back to you soon.</p>
                            <button class="reset-btn" @click="resetForm">Send Another →</button>
                        </div>

                        <div v-else class="form-fields">
                            <div class="field">
                                <label class="field-label">Name</label>
                                <input v-model="form.name" class="field-input" type="text" placeholder="Your name"
                                    autocomplete="off" />
                            </div>
                            <div class="field">
                                <label class="field-label">Email</label>
                                <input v-model="form.email" class="field-input" type="email"
                                    placeholder="your@email.com" autocomplete="off" />
                            </div>
                            <div class="field">
                                <label class="field-label">Message</label>
                                <textarea v-model="form.message" class="field-textarea"
                                    placeholder="Your message..." rows="5" />
                            </div>
                            <button class="send-btn" :class="{ 'is-sending': sending }" :disabled="sending"
                                @click="handleSubmit">
                                <span v-if="!sending">Send Message →</span>
                                <span v-else class="sending-dots">Sending<span class="dots" /></span>
                            </button>
                        </div>
                    </Transition>
                </div>

            </div>
        </div>

    </section>
</template>

<style scoped>
.contact {
    position: relative;
    width: 100%;
    background: #f0ece4;
    display: flex;
    flex-direction: column;
}

.contact-hero {
    height: 100svh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 64px 2rem 2rem;
    position: relative;
}

.contact-label {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.62rem;
    letter-spacing: 0.2em;
    color: #a89880;
    margin-bottom: 1.5rem;
    text-transform: uppercase;
}

.contact-big {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.big-line {
    display: block;
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(5rem, 18vw, 16rem);
    line-height: 0.88;
    letter-spacing: 0.04em;
    color: #1a1612;
}

.big-outline {
    color: transparent;
    -webkit-text-stroke: 1.5px #c8b89a;
}

.scroll-hint {
    position: absolute;
    bottom: 2.5rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
}

.scroll-text {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.5rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #c8b89a;
}

.scroll-track {
    width: 1px;
    height: 30px;
    background: rgba(200, 184, 154, 0.12);
    position: relative;
    overflow: hidden;
}

.scroll-thumb {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 40%;
    background: linear-gradient(to bottom, #c8b89a, transparent);
    animation: scrollFlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes scrollFlow {
    0% {
        transform: translateY(-100%);
        opacity: 0;
    }

    15% {
        opacity: 1;
    }

    85% {
        opacity: 1;
    }

    100% {
        transform: translateY(250%);
        opacity: 0;
    }
}

.contact-form-wrap {
    min-height: 100svh;
    display: flex;
    align-items: center;
    padding: 100px 2.5rem 5rem;
}

.contact-form-inner {
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 5rem;
    align-items: start;
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.contact-form-inner.is-visible {
    opacity: 1;
    transform: translateY(0);
}

.contact-info {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
}

.section-label {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.62rem;
    letter-spacing: 0.14em;
    color: #a89880;
}

.contact-subtitle {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(2.5rem, 5vw, 4.5rem);
    line-height: 0.9;
    letter-spacing: 0.04em;
    color: #1a1612;
}

.contact-body {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 300;
    font-size: 0.85rem;
    line-height: 1.85;
    color: #6b5f52;
    max-width: 360px;
}

.link-label {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.52rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #a89880;
}

.link-val {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.58rem;
    letter-spacing: 0.06em;
    color: #1a1612;
    transition: color 0.2s ease;
}

.contact-form {
    display: flex;
    flex-direction: column;
}

.form-fields {
    display: flex;
    flex-direction: column;
    gap: 1.75rem;
}

.field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.field-label {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.52rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #a89880;
    font-weight: 500;
}

.field-input,
.field-textarea {
    width: 100%;
    background: transparent;
    border: none;
    border-bottom: 0.5px solid #ddd8cf;
    padding: 0.6rem 0;
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 300;
    font-size: 0.88rem;
    color: #1a1612;
    outline: none;
    transition: border-color 0.2s ease;
    resize: none;
    font-weight: 400;
}

.field-textarea {
    border: 0.5px solid #ddd8cf;
    padding: 0.75rem;
    line-height: 1.75;
}

.field-input:focus,
.field-textarea:focus {
    border-color: #a89880;
}

.field-input::placeholder,
.field-textarea::placeholder {
    color: #c8b89a;
}

.send-btn {
    align-self: flex-end;
    margin-top: 0.5rem;
    background: #1a1612;
    color: #f0ece4;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.62rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    padding: 12px 28px;
    border: none;
    cursor: none;
    transition: background 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
}

.send-btn:hover:not(:disabled) {
    background: #2e2820;
    box-shadow: 0 0 24px rgba(26, 22, 18, 0.15);
}

.send-btn:disabled {
    opacity: 0.6;
}

.dots::after {
    content: '...';
    animation: dotCycle 1.2s steps(4, end) infinite;
    display: inline-block;
    width: 1.5em;
    overflow: hidden;
    vertical-align: bottom;
}

@keyframes dotCycle {
    0% {
        content: '';
    }

    25% {
        content: '.';
    }

    50% {
        content: '..';
    }

    75% {
        content: '...';
    }
}

.form-sent {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 4rem 2rem;
    border: 0.5px solid #ddd8cf;
    text-align: center;
}

.sent-icon {
    font-family: 'Share Tech Mono', monospace;
    font-size: 2rem;
    color: #1a1612;
}

.sent-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 2rem;
    letter-spacing: 0.06em;
    color: #1a1612;
}

.sent-body {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 300;
    font-size: 0.82rem;
    color: #a89880;
}

.reset-btn {
    margin-top: 0.5rem;
    background: transparent;
    color: #a89880;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.55rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    padding: 8px 20px;
    border: 0.5px solid #ddd8cf;
    cursor: pointer;
    transition: border-color 0.2s ease, color 0.2s ease;
}

.reset-btn:hover {
    border-color: #a89880;
    color: #1a1612;
}

.sent-fade-enter-active,
.sent-fade-leave-active {
    transition: opacity 0.4s ease, transform 0.4s ease;
}

.sent-fade-enter-from,
.sent-fade-leave-to {
    opacity: 0;
    transform: translateY(12px);
}

@media (max-width: 900px) {
    .contact-form-inner {
        grid-template-columns: 1fr;
        gap: 3rem;
    }
}

@media (max-width: 768px) {
    .contact-form-wrap {
        padding: 80px 1.5rem 3rem;
    }

    .contact-hero {
        padding-top: 56px;
    }
}

@media (max-width: 480px) {
    .contact-form-wrap {
        padding: 72px 1rem 2.5rem;
    }

    .big-line {
        font-size: clamp(4rem, 20vw, 6rem);
    }

    .send-btn {
        align-self: stretch;
        text-align: center;
    }
}

@media (max-height: 600px) {
    .big-line {
        font-size: clamp(3rem, 12vw, 8rem);
    }

    .scroll-hint {
        bottom: 1rem;
    }
}
</style>