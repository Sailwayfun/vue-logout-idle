import { router } from '../routes/index.js';
import { onMounted, onUnmounted, ref } from 'vue';

function startTimeout(timeoutId, timeout, isLoggedOut) {
    if (timeoutId.value !== null) window.clearTimeout(timeoutId.value);
    timeoutId.value = window.setTimeout(() => {
        localStorage.removeItem("activeUserId");
        isLoggedOut.value = true;
        console.log("User is logged out due to inactivity");
        router.replace("/");
    }, timeout);
}

function manageTimeout(timeoutId, isLoggedOut, timeout) {
    const onBlur = () => {
        if (isLoggedOut.value) return;
        startTimeout(timeoutId, timeout, isLoggedOut);
    };
    const onMouseDown = () => {
        if (timeoutId.value !== null) {
            window.clearTimeout(timeoutId.value);
            timeoutId.value = null;
        }
    };

    window.addEventListener("blur", onBlur);
    window.addEventListener("mousedown", onMouseDown);

    onUnmounted(() => {
        window.removeEventListener("blur", onBlur);
        window.removeEventListener("mousedown", onMouseDown);
    });
}

export function useLogoutIdle(timeout = 1000 * 60 * 1) {
    let isLoggedOut = ref(localStorage.getItem("activeUserId") === null);
    let timeoutId = ref(null);

    onMounted(() => {
        manageTimeout(timeoutId, isLoggedOut, timeout);
        if (!isLoggedOut.value) {
            startTimeout(timeoutId, timeout, isLoggedOut);
        }
    });

    onUnmounted(() => {
        if (timeoutId.value !== null) window.clearTimeout(timeoutId.value);
    });

    return { isLoggedOut };
}
