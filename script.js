const URL = "https://restcountries.com/v3.1/all"

const main = document.querySelector("main")

const countries_div = document.querySelector(".countries")
const filter_section = document.querySelector(".filter-section")
const filter_dropdown_div = document.querySelector(".filter-dropdown-div")
const filter_dropdown = document.querySelector(".filter-dropdown")
const filters_dropdown_div = document.querySelector(".filters-dropdown-div")
const filters_dropdown = document.querySelector(".filters-dropdown")

const all_countries_filter = document.querySelector("#All")

getAllCountries(URL)


    ;[...filters_dropdown.children].forEach(child => {
        child.addEventListener("click", e => {
            removeCountries()
            filter_dropdown.children[0].innerText = e.target.innerText

                ;[...filters_dropdown.children].forEach(child => {
                    child.style.fontWeight = "normal"
                })
            e.target.style.fontWeight = "bold"

            const filter_url = `https://restcountries.com/v3.1/region/${e.target.innerText}/`

            if (e.target.innerText != "All") {
                getAllCountries(filter_url)
            }

            const dark_mode_txt = document.querySelector(".dark-mode-txt")

            dark_mode_txt.addEventListener("click", () => {
                toggleDarkMode()
            })

            const moon_icon = document.querySelector(".moon-icon")

            moon_icon.addEventListener("click", () => {
                toggleDarkMode()
            })
        })
    })

all_countries_filter.addEventListener("click", () => { getAllCountries(URL) })

filter_dropdown_div.addEventListener("click", () => {
    console.log("Click")
    filters_dropdown_div.classList.toggle("dropdown-div-display")
    filters_dropdown.classList.toggle("dropdown-display")
    console.log("After Click")
})


function addCountries(temp, data) {
    const flag = temp.querySelector(".country-flag")
    flag.src = data.flags.png

    const country_name = temp.querySelector(".country-name")
    country_name.innerText = data.name.common

    const population = temp.querySelector(".thepopulation")
    population.innerText = data.population

    const region = temp.querySelector(".theregion")
    region.innerText = data.region

    const capital = temp.querySelector(".thecapital")
    if (data.capital != undefined) {
        capital.innerText = data.capital[0]
    } else {
        capital.innerText = ""
    }
}

function removeCountries() {
    countries_div.innerHTML = ""
}

function addDetails(temp, d) {
    const flag = temp.querySelector(".country-info-flag")
    flag.src = d.flags.png

    const country_common_name = temp.querySelector(".country-common-name")
    country_common_name.innerText = d.name.common

    const country_native_name = temp.querySelector(".native-name")
    Object.values(d.name.nativeName).forEach(val => country_native_name.innerText = val.common)

    const population = temp.querySelector(".population-detail")
    population.innerText = d.population

    const region = temp.querySelector(".region-detail")
    region.innerText = d.region

    const sub_region = temp.querySelector(".sub-region")
    sub_region.innerText = d.subregion

    const capital = temp.querySelector(".capital-detail")
    capital.innerText = d.capital

    const tld = temp.querySelector(".top-domain")
    tld.innerText = d.tld

    const currencies = temp.querySelector(".currencies")
    Object.values(d.currencies).forEach(val => currencies.innerText += `${val.name} `)

    const languages = temp.querySelector(".languages")
    Object.values(d.languages).forEach(val => languages.innerText += `${val}, `)

    const back_btn = temp.querySelector(".back-btn")
    const left_arrow = temp.querySelector(".left-arrow")

    const border_countries_p = temp.querySelector(".border-countries")

    if (d.borders != undefined) {
        d.borders.forEach(b => {
            const new_span = document.createElement("span")

            new_span.innerText = b

            border_countries_p.appendChild(new_span)
        })
    } else {
        border_countries_p.innerHTML += "<em style='color: hsl(0, 0%, 40%);'>none<em>"
    }

    if ([...document.body.classList].includes("dark-background1")) {
        border_countries_p.classList.add("dark-border-countries")
        back_btn.classList.add("dark-background2")
        left_arrow.classList.add("white-icon")
    } else {
        border_countries_p.classList.remove("dark-border-countries")
        back_btn.classList.remove("dark-background2")
        left_arrow.classList.remove("white-icon")
    }
}

function getCountryInfo(country) {
    const the_country_name = country.querySelector(".country-name")

    filter_section.classList.add("display")
    countries_div.classList.add("display")

    const country_api = `https://restcountries.com/v3.1/name/${the_country_name.innerText}/`

    fetch(country_api)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            data.forEach(d => {
                const country_info_temp = document.querySelector(".country-info-temp")
                const temp_clone = country_info_temp.content.cloneNode(true)

                addDetails(temp_clone, d)

                main.appendChild(temp_clone)

                const back = document.querySelector(".back-btn")

                back.addEventListener("click", () => {
                    const country_info_div = document.querySelector(".country-info-div")

                    main.removeChild(country_info_div)

                    filter_section.classList.remove("display")
                    countries_div.classList.remove("display")
                })
            })
        })
}

function toggleDarkMode() {
    const filter_input_field = document.querySelector(".filter-input-field")
    const header = document.querySelector("header")
    const countries = document.querySelectorAll(".country")
    const moon_icon = document.querySelector(".moon-icon")
    const dropdown_icon = document.querySelector(".dropdown-icon")
    const border_countriesP = document.querySelector(".border-countries")
    const back_btn = document.querySelector(".back-btn")
    const left_arrow = document.querySelector(".left-arrow")
    const search_btn = document.querySelector(".search-btn")

    document.querySelector("body").classList.toggle("dark-background1")
    filter_input_field.classList.toggle("dark-background2")
    filter_dropdown_div.classList.toggle("dark-background2")
    filters_dropdown_div.classList.toggle("dark-background2")
        ;[...countries].forEach(country => country.classList.toggle("dark-background2"))
    header.classList.toggle("dark-background2")
    search_btn.classList.toggle("dark-background1")
    moon_icon.classList.toggle("white-icon")
    dropdown_icon.classList.toggle("white-icon")
    border_countriesP.classList.toggle("dark-border-countries")
    back_btn.classList.toggle("dark-background2")
    left_arrow.classList.toggle("white-icon")
}

async function getAllCountries(url) {
    const response = await fetch(url)
    const data = await response.json()

    removeCountries()
    data.forEach(d => {
        const template = document.querySelector(".country-temp")
        const clone = template.content.cloneNode(true)

        addCountries(clone, d)

        countries_div.appendChild(clone)
    })

    const countries = document.querySelectorAll(".country")

    Array.from(countries).forEach(country => {
        country.addEventListener("click", e => {
            console.log("Clicked")

            getCountryInfo(country)
        })

        if ([...document.body.classList].includes("dark-background1")) {
            country.classList.add("dark-background2")
        } else {
            country.classList.remove("dark-background2")
        }
    })

    const dark_mode_txt = document.querySelector(".dark-mode-txt")

    dark_mode_txt.addEventListener("click", () => {
        toggleDarkMode()
    })

    const moon_icon = document.querySelector(".moon-icon")

    moon_icon.addEventListener("click", () => {
        toggleDarkMode()
    })

    const input = document.querySelector(".filter-input-field")

    input.addEventListener("input", () => {
        ;[...countries].forEach(country => {
            const country_name_ = country.querySelector(".country-name").innerText

            if (!country_name_.startsWith(input.value)) {
                country.classList.add("display")
            }

            if (country_name_.startsWith(input.value)) {
                console.log(country)
                country.classList.remove("display")
            }
        })
    })
}







