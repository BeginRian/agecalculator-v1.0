const agecalcu = () => {
    const today = new Date();
    const inputdate = new Date(document.getElementById("date-input").value);

    const birthdetail = {
        date : inputdate.getDate(),
        month : inputdate.getMonth() + 1,
        year : inputdate.getFullYear(),
    };

    const todaynow = today.getDate();
    const monthnow = today.getMonth() + 1;
    const yearnow = today.getFullYear();

    if(isfuture(birthdetail,yearnow,monthnow,todaynow)) {
        alert("Really ??");
        displayresult("-","-","-");
        return;
    }

    const {year, month, days} = calculateage (
        birthdetail,
        yearnow,
        monthnow,
        todaynow
    );

    displayresult(days,month,year);
};

    const isfuture = (
        birthdetail,
        yearnow,
        monthnow,
        todaynow
    ) => {
        return (
            birthdetail.year > yearnow ||
            (birthdetail.year === yearnow &&
                (birthdetail.year > monthnow ||
                    (birthdetail.month === monthnow &&
                        birthdetail.date > todaynow)))
        );
    };

const calculateage = (birthdetail, yearnow, monthnow,todaynow) => {
    let year = yearnow - birthdetail.year;
    let month, days;
    
    if (monthnow < birthdetail.month) {
            year--;
            month = 12 - (birthdetail.month - monthnow);
    } else {
        month = monthnow - birthdetail.month;
    }

    if (todaynow < birthdetail.date) {
        month--;
         const lastmonth = monthnow === 1 ? 12 : monthnow - 1;
         const daylastmonth = getdayinmonth (lastmonth, yearnow);
         days = daylastmonth - (birthdetail.date - todaynow)
    } else {
        days = todaynow - birthdetail.date;
    }
    return {year,month,days};
};

    const getdayinmonth = (month, year) => {
        const isleapyear = year % 4 === 0 && (year % 100 != 0 || year % 400 === 0);
        const getdayinmonth = [31, isleapyear ? 29: 28,
            31,30,31,30,31,31,30,31,30,31];
        return getdayinmonth[month - 1];
    };

const displayresult = (bdate, bMonth, bYear) => {
    document.getElementById("year").textContent = bYear;
    document.getElementById("month").textContent = bMonth;
    document.getElementById("day").textContent = bdate;
};

document.getElementById("calculate-btn").addEventListener("click",agecalcu);