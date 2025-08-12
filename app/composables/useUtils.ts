import moment from "moment-timezone";

export function scrollTo(id: string) {
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: 'smooth' })
}

export function formatSelectedTime(time: string) {
    const splitTime = time.split(':')
    return moment().set('hour', parseInt(String(splitTime[0])))
        .set('minute', parseInt(String(splitTime[1])))
        .format('h:mm A')
}