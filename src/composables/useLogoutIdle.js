import { router } from '../routes/index.js';
import { onMounted, onUnmounted, ref } from 'vue';
import { useToast } from "vue-toast-notification";

const MILLISECONDS_IN_SECOND = 1000;
const MILLISECONDS_IN_MINUTE = 60 * MILLISECONDS_IN_SECOND;
const toast = useToast();
const warningTimeoutId = ref(null);
const timeoutId = ref(null);

function startTimeout(timeoutId, timeout, isLoggedOut) {
    if (timeoutId.value !== null) {
        window.clearTimeout(timeoutId.value);
        timeoutId.value = null;
    }

    if (warningTimeoutId.value !== null) {
        window.clearTimeout(warningTimeoutId.value);
        warningTimeoutId.value = null;
    }

    const warningTimeout = timeout - MILLISECONDS_IN_SECOND * 10;
    if (warningTimeout > 0) {
        warningTimeoutId.value = window.setTimeout(() => {
            toast.warning("You will be logged out due to inactivity");
        }, warningTimeout);
    }

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
        if (timeoutId.value !== null) {
            window.clearTimeout(timeoutId.value);
        }
        if (warningTimeoutId.value !== null) {
            window.clearTimeout(warningTimeoutId.value);
        }
    });
}

export function useLogoutIdle(timeout = MILLISECONDS_IN_MINUTE * 1) {
    let isLoggedOut = ref(localStorage.getItem("activeUserId") === null);

    onMounted(() => {
        manageTimeout(timeoutId, isLoggedOut, timeout);
        if (!isLoggedOut.value) {
            startTimeout(timeoutId, timeout, isLoggedOut);
        }
    });

    onUnmounted(() => {
        if (timeoutId.value !== null) {
            window.clearTimeout(timeoutId.value);
            timeoutId.value = null;
        }
    });

    return { isLoggedOut };
}
