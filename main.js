let citiesAr = ["سوهاج","القاهرة","الجيزة","الإسكندرية","أسيوط","قنا","الأقصر","أسوان","المنيا","الفيوم","الشرقية","الدقهلية","البحيرة","دمياط", "أخميم","جرجا","البلينا","دار السلام","المراغة","المنشاة","جهينة","ساقلتا","طهطا","طما","العسيرات","حي الكوثر","أخميم الجديدة"];
const days = {
    "Saturday": "السبت",
    "Sunday": "الأحد",
    "Monday": "الإثنين",
    "Tuesday": "الثلاثاء",
    "Wednesday": "الأربعاء",
    "Thursday": "الخميس",
    "Friday": "الجمعة"
};

let citiesEn = {
    "سوهاج": "Sohag",
    "القاهرة": "Cairo",
    "الجيزة": "Giza",
    "الإسكندرية": "Alexandria",
    "أسيوط": "Asyut",
    "قنا": "Qena",
    "الأقصر": "Luxor",
    "أسوان": "Aswan",
    "المنيا": "Minya",
    "الفيوم": "Fayoum",
    "الشرقية": "Sharqia",
    "الدقهلية": "Dakahlia",
    "البحيرة": "Beheira",
    "دمياط": "Damietta",
    "أخميم": "Akhmim",
    "جرجا": "Gerga",
    "البلينا": "Al Ballina",
    "دار السلام": "Dar El Salam",
    "المراغة": "El Maragha",
    "المنشاة": "El Monshah",
    "جهينة": "Juhayna",
    "ساقلتا": "Saqlta",
    "طهطا": "Tahta",
    "طما": "Tama",
    "العسيرات": "Al Aserat",
    "حي الكوثر": "El Kawthar",
    "أخميم الجديدة": "New Akhmim"
};

function getPrayerTimeOfCity(city) {
    axios.get(`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Egypt&method=5`)
    .then(response => {
        let prayerTime = response.data

        console.log(prayerTime.data.date.readable)
        
        document.getElementById("prayer-time").innerHTML = ""
        let content = `
            <li>
            <p>:الفجر</p>
            <span>${prayerTime.data.timings.Fajr}</span>
            </li>
            <li>
            <p>:الشروق</p>
            <span>${prayerTime.data.timings.Sunrise}</span>
            </li>
            <li>
            <p>:الظهر</p>
            <span>${prayerTime.data.timings.Dhuhr}</span>
            </li>
            <li>
            <p>:العصر</p>
            <span>${prayerTime.data.timings.Asr}</span>
            </li>
            <li>
            <p>:المغرب</p>
            <span>${prayerTime.data.timings.Maghrib}</span>
            </li>
            <li>
            <p>:العشاء</p>
            <span>${prayerTime.data.timings.Isha}</span>
            </li>
        `
        document.getElementById("prayer-time").innerHTML = content

        let date = `
            <span>${prayerTime.data.date.hijri.date}</span>
            <span>${prayerTime.data.date.hijri.weekday.ar}</span>
            <span>${prayerTime.data.date.gregorian.date}</span>
        `
        document.getElementById("date").innerHTML = date

    })
    .catch(error => {
        alert(error)
    })
}

function fillCities() {
    document.getElementById("select").innerHTML = ""
    for(cityAr of citiesAr) {
        let cityEn = citiesEn[cityAr]
        let header = `
            <option value="${cityEn}">${cityAr}</option>
        `
        document.getElementById("select").innerHTML += header
    }
}

getPrayerTimeOfCity("Sohag")
fillCities()

document.getElementById("select").addEventListener("change", function() {
    let city = this.value
    getPrayerTimeOfCity(city)
})