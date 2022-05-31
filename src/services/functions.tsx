

let months:any = [
    "Janeiro","Fevereiro","Março","Abril",
    "Maio","Junho","Julho","Agosto",
    "Setembro","Outubro","Novembro","Dezembro"
]

let weekdays:any = [
    "Dom","Seg","Ter","Qua","Qui","Sex","Sáb"
]

let weekdaysextended:any = [
    "Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"
]

let weekdaysextendedobj:any = {
    DOM: "Domingo",
    SEG: "Segunda",
    TER: "Terça",
    QUA: "Quarta",
    QUI: "Quinta",
    SEX: "Sexta",
    SAB:   "Sábado"  
}

let deliveryTypes:any = {
    "DELIVERY": "Delivery",
    "TAKEOUT" : "Retirar no local",
    "INDOOR": "Na mesa"
}

export const toWeekDay = (value: string) => {
    return weekdaysextendedobj[value]
}

export const toDeliveryType = (value: string) => {
    return deliveryTypes[value]
}


export const decimalToMoney = (value: any = 0) => {
    return "R$ "+(parseFloat(value).toFixed(2)).toString().replace(".",",")
}

export const decimalToPhone = (phone: any) => {
    var cleaned = ('' + phone).replace(/\D/g, '');
    var match = cleaned.match(/^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/);
    if (match) {
      return ['(', match[1], ') ', match[2], '-', match[3]].join('');
    }
    return null;
   
}

export const decimalToHour = (value: any = 0) => {
    let hour = Math.floor(value);
    let minute = hour === 0 ? Math.floor((value ) * 60) : Math.floor((value % hour) * 60) ;

    return `${hour.toString().padStart(2,"0")}:${minute.toString().padStart(2,"0")}`
}

export const decimalToWeekDay = (value: any = 0) => {
    let date = new Date(value);
    let day = date.getDay();

    let daysDiff = Math.floor((Math.abs( date.getTime() - new Date().getTime()) / 1000 / 60 / 60 / 24) * 100)/100 + 0.01

    
    if(daysDiff < 1)
        return "Hoje"

    else if(daysDiff >= 1 && daysDiff < 2)
        return "Amanhã"

    return weekdays[day];
}

export const formatTime = (value: any = 0) => {
    let date = new Date(value);
    let hours = date.getHours()
    let minutes =  date.getMinutes()
    return hours.toString().padStart(2,"0")+":"+minutes.toString().padStart(2,"0")
}

export const formatDateTime = (value: any = 0) => {
    let date = new Date(value);
    let day = date.getDate()
    let month =  date.getMonth()+1
    let year =  date.getFullYear()

    let hour = date.getHours();
    let minute = date.getMinutes();
    let seconds = date.getSeconds();
    return day.toString().padStart(2,"0")+"/"+month.toString().padStart(2,"0")+"/"+year.toString()+" "+hour.toString().padStart(2,"0")+":"+minute.toString().padStart(2,"0")+":"+seconds.toString().padStart(2,"0")
}

export const getTimeDifference = (value1: any = 0,value2: any=0) => {

    let date = new Date(value1);
    let now = new Date(value2);

    let diff = ((now.getTime() -  date.getTime()) / 1000 / 60 )

    let hour = diff / 60
    let minute = diff % 60

    if(diff < 0)
        return `0s`
    else if(diff < 1)
        return `${Math.round(diff*60)}s`
    else if(diff < 60)
        return `${Math.round(diff)}m`
    else if(diff < 60*24)
        return `${Math.floor(hour)}h${Math.floor(minute)}m`
    else if(diff < 60*24*365)
        return `${Math.floor(diff/60/24)}d`

}

export const formatTimeWithExtension = (value: any = 0) => {
    let date = new Date(value);
    let dateOnly = new Date(value).setHours(0,0,0,0);

   // let now = new Date();

    let nowDateOnly = new Date().setHours(0,0,0,0);

    let daysDiff = ((nowDateOnly -  dateOnly) / 1000 / 60 / 60 / 24)


    let year = date.getFullYear().toString();
    let month = date.getMonth().toString();
    let day = date.getDate().toString();
    let hour = date.getHours().toString();
    let minute = date.getMinutes().toString();


    if(daysDiff < -365)
        return `${day.padStart(2,"0")} de ${months[parseFloat(month)]} às ${hour.padStart(2,"0")}:${minute.padStart(2,"0")}`
    else if(daysDiff <= -2 && daysDiff > -365){
        return `${day.padStart(2,"0")} de ${months[parseFloat(month)]} às ${hour.padStart(2,"0")}:${minute.padStart(2,"0")}`
    }
    else if(daysDiff <= -1 && daysDiff > -2){
        return `Amanhã às ${hour.padStart(2,"0")}:${minute.padStart(2,"0")}`
    }
    else if(daysDiff <= 0 && daysDiff > -1){
        return `Hoje às ${hour.padStart(2,"0")}:${minute.padStart(2,"0")}`
    }
    else if(daysDiff <= 1 && daysDiff > 0)
        return `Ontem às ${hour.padStart(2,"0")}:${minute.padStart(2,"0")}`
    else if(daysDiff <= 2 && daysDiff > 1 )
        return `Anteontem às ${hour.padStart(2,"0")}:${minute.padStart(2,"0")}`
    else if(daysDiff < 365 )
    return `${day.padStart(2,"0")} de ${months[parseFloat(month)]} às ${hour.padStart(2,"0")}:${minute.padStart(2,"0")}`
    else {
        return `${day.padStart(2,"0")} de ${months[parseFloat(month)]} de ${year} às ${hour.padStart(2,"0")}:${minute.padStart(2,"0")}`
    }

}

export const formatTwoTimesWithExtension = (value1: any = 0,value2: any=0) => {
    let date1 = new Date(value1);
    let date2 = new Date(value2);

    let now = new Date();
    let nowyear = now.getFullYear().toString();

    let date1Diff = ((now.getTime() -  date1.getTime()) / 1000 / 60 / 60 / 24)
    let date2Diff = ((now.getTime() -  date2.getTime()) / 1000 / 60 / 60 / 24)

    let stringDate1 = {
         year: date1.getFullYear().toString(),
         month: date1.getMonth().toString(),
         day: date1.getDate().toString(),
         dayOfWeek: date1.getDay().toString(),
         hour: date1.getHours().toString(),
         minute: date1.getMinutes().toString(),
         date: date1.toDateString(),
         time: date1.toTimeString()
    }

    let stringDate2 = {
        year: date2.getFullYear().toString(),
        month: date2.getMonth().toString(),
        day: date2.getDate().toString(),
        dayOfWeek: date1.getDay().toString(),
        hour: date2.getHours().toString(),
        minute: date2.getMinutes().toString(),
        date: date2.toDateString(),
        time: date2.toTimeString()
   }

  

   const getDatePrefix = (daysDiff:number,date:any) => {

        console.log(daysDiff)

        if(daysDiff <= -2){
            if(stringDate1.year === nowyear && stringDate2.year === nowyear)
                return `${date.day.padStart(2,"0")} de ${months[parseFloat(date.month)]}`
            else 
                return `${date.day.padStart(2,"0")} de ${months[parseFloat(date.month)]} de ${date.year}`
        }
        else if(daysDiff > -2 && daysDiff <= -1){
            return `Amanhã`
        }
        else if(daysDiff > -1 && daysDiff <= 0){
            return `Hoje`
        }
        else if(daysDiff > 0 && daysDiff <= 1){
            return `Ontem`
        }
        else if(daysDiff <= 2 && daysDiff > 1)
            return `Anteontem`
        else if(daysDiff <= 7 && daysDiff > 2 )
            return `${weekdaysextended[date.dayOfWeek]}`
        else{
            if(stringDate1.year === nowyear && stringDate2.year === nowyear)
                return `${date.day.padStart(2,"0")} de ${months[parseFloat(date.month)]}`
            else 
                return `${date.day.padStart(2,"0")} de ${months[parseFloat(date.month)]} de ${date.year}`
        }
    } 

    const getTimePrefix = (date:any) => {
        return date.hour.padStart(2,"0")+":"+date.minute.padStart(2,"0")
    } 

    if(stringDate1.date === stringDate2.date && stringDate1.time === stringDate2.time){
        return getDatePrefix(date1Diff,stringDate1)+" às "+getTimePrefix(stringDate1)
    }
    else if(stringDate1.date === stringDate2.date){
        return getDatePrefix(date1Diff,stringDate1)+", entre "+getTimePrefix(stringDate1)+" e "+getTimePrefix(stringDate2)
    }
    else
        return "Entre "+getDatePrefix(date1Diff,stringDate1)+" às "+getTimePrefix(stringDate1)+" e "+getDatePrefix(date2Diff,stringDate2)+" às "+getTimePrefix(stringDate2)
    


}

export const formatCityName = (city: string,state: string) => {
    city = city.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(" ","-");
    return (city+"-"+state).toLowerCase()
}

export const formatAddress = (data: any) => {
    if(!data)
        return ""
    return `${data.streetName || ""}${data.streetNumber ? " , "+data.streetNumber:""}${data.neighborhood ? " - "+data.neighborhood+", " : ""}${data.city} - ${data.state}`
}

export const getDateDifference = (date1: Date,date2: Date) => {

    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    return diffTime/1000
}

export const formatDistance = (distance: number,places: number = 2) => {
    if(distance < 1)
        return Math.floor(distance*1000)+" metros"
    if(distance >= 1 && distance < 2)
        return Math.floor(distance*(10*places))/(10*places)+" quilômetro"
    else
        return Math.floor(distance*(10*places))/(10*places)+" quilômetros"
   
}

export const hourToDecimal = (string: string = "00:00") => {
    let [hour,minute] = string.split(":")

    let total = parseInt(hour) + (parseInt(minute)/60)
  
    return total
}

export const checkIsOpen = (schedules:any) => {
    let datetime = new Date();
    let weekdays = ["DOM","SEG","TER","QUA","QUI","SEX","SAB"]
    let dayOfWeek = weekdays[datetime.getDay()];
    let now = datetime.getHours() + (datetime.getMinutes()/60)
    let closein = 0

    schedules.map((sc:any) => {
      
    
        if(sc.weekDay === dayOfWeek){

          

            if(now > parseFloat(sc.startTime) && now < parseFloat(sc.endTime)){
                closein = parseFloat(sc.endTime) - now;
              // setIsOpen(true) 
            }
        }
    })

    return closein > 0
}