import moment from "moment-timezone";

export const useUtils = () => {
     function scrollTo(id: string) {
        const el = document.getElementById(id)
        el?.scrollIntoView({ behavior: 'smooth' })
    }

     function formatSelectedTime(time: string) {
        const splitTime = time.split(':')
        return moment().set('hour', parseInt(String(splitTime[0])))
            .set('minute', parseInt(String(splitTime[1])))
            .format('h:mm A')
    }

    function truncateText(text, length, clamp) {
        clamp = clamp || '...';
        return text && text.length > length ? text.slice(0, length) + clamp : text;
    }

    return {
        scrollTo,
        formatSelectedTime,
        truncateText
    }
}

