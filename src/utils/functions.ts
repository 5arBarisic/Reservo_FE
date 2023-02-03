const formatDate = (backendDate: string|undefined) => {
    if(backendDate) {
        const hours = new Date(backendDate).getHours();
        const minutes = new Date(backendDate).getMinutes();

        return new Date(backendDate).toLocaleDateString('en-GB') +
            ' ' + (hours < 10 ? '0' + hours : hours) +
            ':' + (minutes < 10 ? '0' + minutes : minutes);
    }else return ""
};

const handlePrice = (seats: number[], maxSeats: number | undefined) => {

    let price = 0;

    if (seats.length > 0 && maxSeats) {
        for (let i = 0; i < seats.length; i++) {
            if ((maxSeats === 64 && seats[i] > 56) || (maxSeats === 80 && seats[i] > 64)) {
                price += 8;
            } else price += 5;
        }
    }

    return price
}


export {formatDate,handlePrice};
