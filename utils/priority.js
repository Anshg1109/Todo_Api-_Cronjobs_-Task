const getDueDateFilter = (priority)=> {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    switch (parseInt(priority)) {
        case 0:
            return {
                $gte: today,
                $lt: tomorrow,
            };
        case 1:
            return {
                $gte: tomorrow,
                $lt: new Date(today.setDate(today.getDate() + 2)),
            };
        case 2:
            return {
                $gte: new Date(today.setDate(today.getDate() + 2)),
                $lt: new Date(today.setDate(today.getDate() + 4)),
            };
        case 3:
            return {
                $gte: new Date(today.setDate(today.getDate() + 4)),
                $lt: new Date(today.setDate(today.getDate() + 6)),
            };
        default:
            return {
                $gte: today,
            };
    }
}


const calculatePriority = (dueDate) => {
    const today = new Date();
    const diffInDays = Math.floor((dueDate - today) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
        return 0;
    } else if (diffInDays >= 1 && diffInDays <= 2) {
        return 1;
    } else if (diffInDays >= 3 && diffInDays <= 4) {
        return 2;
    } else if (diffInDays >= 5) {
        return 3;
    }

    return 0;
};

export {getDueDateFilter, calculatePriority};