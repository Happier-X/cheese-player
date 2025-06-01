import { ref } from 'vue'

export function useLayout() {
    const isNormal = ref(true)

    const toggleLayout = () => {
        isNormal.value = !isNormal.value
    }

    return { isNormal, toggleLayout }
}
