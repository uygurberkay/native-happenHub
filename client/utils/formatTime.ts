import moment from "moment";

export const formatTime = (time: Date) => {
    const options : any = { hour: "numeric", minute: "numeric" };
    return new Date(time).toLocaleString("en-US", options);
};

export const formattedDate = (inputDate: Date) => {
    return moment(inputDate).format('DD MMMM YYYY / HH:mm');

}