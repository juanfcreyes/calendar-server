import moment from "moment"

export const isDate = (value: any) => {
    if (!value) {
        return false;
    }
    const time = moment(value);
    return time.isValid();
}