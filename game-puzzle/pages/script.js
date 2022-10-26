// alert('Добрый день, уважаемый проверяющий! У меня был дикий заруб в ВУЗе и, к сожалению, я не успел сделать игру к понедельнику.. Буду безмерно Вам благодарен, если Вы проверите мою работу в четверг.. Discord для связи: ЗИЛИБОБКА-БЕЗУПРЕЧНЫЙ#4853')

const body = document.querySelector('body')
body.insertAdjacentHTML('beforeend', '<header>')
body.querySelector('header').insertAdjacentHTML('beforeend', `<p>Shrek Puzzle</p>`)
body.querySelector('header').insertAdjacentHTML('beforeend', `<div class="steps">Steps 0</div>`)
body.querySelector('header').insertAdjacentHTML('beforeend', `<div class="timer">0 min 0 sec</div>`)

body.insertAdjacentHTML('beforeend', '<div class="items field-4"></div>')
body.insertAdjacentHTML('beforeend', '<div class="restart">Restart</div>')

body.insertAdjacentHTML('beforeend', '<footer><a href="https://github.com/PaHaNchickT">Made by PaHaNchickT</a><p>2022</p></footer>')

// body.insertAdjacentHTML('beforeend', `<div class="items"></div>`)
// body.insertAdjacentHTML('beforeend', `<footer></footer>`)

/////////////////////////////////////////////////////init//////////////////////////////////////////


let items = document.querySelector('.items'),
    timerText = document.querySelector('.timer'),
    restart = document.querySelector('.restart'),
    stepsText = document.querySelector('.steps'),
    soundBtn = document.querySelector('.sound-wrapper'),
    fieldBtn = document.querySelector('.field-btn'),
    values = document.querySelector('.size-wrapper'),
    valuesList = document.querySelector('.values')

let cells = [],
    elementsPerString = 4,
    isTimer = 0,
    steps = 0,
    timerID,
    isSound = true,
    isMenu = false,

    empty = {
        top: 0,
        left: 0
    }

cells.push(empty)

elementsAdd(elementsPerString)
soundBtnFunc(body.childNodes[8].childNodes[0].childNodes[1])

    valueFunc(body.childNodes[8].childNodes[0].childNodes[0])

    body.childNodes[8].childNodes[0].childNodes[0].childNodes[1].querySelectorAll('p').forEach(e => {
        e.addEventListener('click', () => {
            elementsPerString = +e.innerHTML.slice(0, 1)
            restartBtn()
        })
    })

///////////////////////////////////////////////////adding elements///////////////////////////////////

function settingsAdding() {
    items.insertAdjacentHTML('beforeend', `<div class="settings-wrapper">`)
    items.querySelector('.settings-wrapper').insertAdjacentHTML('beforeend', `<div class="size-wrapper">`)
    items.querySelector('.settings-wrapper').insertAdjacentHTML('beforeend', `<div class="sound-wrapper">`)
    items.querySelector('.size-wrapper').insertAdjacentHTML('beforeend', `<p class="field-btn">Field size</p>`)
    items.querySelector('.size-wrapper').insertAdjacentHTML('beforeend', `<div class="values menu-off"><p>3x3</p><p>4x4</p><p>5x5</p><p>6x6</p><p>7x7</p><p>8x8</p></div>`)
    items.querySelector('.sound-wrapper').insertAdjacentHTML('beforeend', `<p>Sound Off</p>`)

    soundBtn = document.querySelector('.sound-wrapper')
    fieldBtn = document.querySelector('.field-btn')
    values = document.querySelector('.size-wrapper')
    valuesList = document.querySelector('.values')
}

function elementsAdd(amount) {
    settingsAdding()
    items.classList.remove(items.className.slice(items.className.length - 7, items.className.length))
    items.classList.add(`field-${elementsPerString}`)
    cells = []
    empty = {
        top: 0,
        left: 0
    }

    const numbers = [...Array(amount ** 2 - 1).keys()]
        .map(x => x + 1)
        .sort(() => Math.random() - 0.5);

    for (let i = 1; i < amount ** 2; i++) {
        const cell = document.createElement('div')
        cell.className = `cell cell-${elementsPerString}`
        cell.innerHTML = numbers[i - 1]

        const left = i % amount
        const top = (i - left) / amount

        cell.style.left = `${left * (items.offsetWidth / amount)}px`
        cell.style.top = `${top * (items.offsetWidth / amount)}px`

        cells.push({
            left: left * (items.offsetWidth / amount),
            top: top * (items.offsetWidth / amount),
            inner: numbers[i - 1]
        })

        items.append(cell)
    }
}


//////////////////////////////////////////////////deleting elements////////////////////////////////////////////

function elementsDel() {
    items.childNodes.forEach(e => {
        items.removeChild(e)
        elementsDel()
    })
}

//////////////////////////////////////////////////////engine////////////////////////////////////////////////////

click(items.childNodes)

function click(cell) {
    cell.forEach(e => {
        e.addEventListener('click', () => {
            if (isTimer === 0) {
                timer()
            }
            cells.forEach(el => {
                if (el.inner === +e.innerHTML) {
                    let tempLeft = el.left
                    let tempTop = el.top

                    if (Math.abs((el.left - empty.left)) <= 80 && Math.abs((el.top - empty.top)) <= 80 && (Math.abs((el.top - empty.top)) !== Math.abs((el.left - empty.left)))) {
                        sound()

                        e.style.left = `${empty.left}px`
                        e.style.top = `${empty.top}px`

                        el.left = empty.left
                        el.top = empty.top

                        empty.left = tempLeft
                        empty.top = tempTop

                        let count1 = 0,
                            count2 = 0
                        cells.forEach(e => {
                            if (e.inner * 80 === e.top * elementsPerString + e.left) {
                                count1++
                            }
                            if (e.inner * 80 - 80 === e.top * elementsPerString + e.left) {
                                count2++
                            }
                        })
                        steps++
                        stepsText.innerHTML = `Steps ${steps}`
                        if (count1 === elementsPerString * elementsPerString - 1 || count2 === elementsPerString * elementsPerString - 1) {
                            alert(`Hooray! You solved the puzzle in ${timerText.innerHTML} and ${steps} moves!`)
                        }
                    }
                }
            })
        })
    })
}

///////////////////////////////////////////////////////timer//////////////////////////////////////////////

function timer() {
    let seconds = 0,
        minutes = 0
    isTimer = 1
    timerID = setInterval(() => {
        seconds++
        if (seconds === 60) {
            minutes++
            seconds = 0
        }
        timerText.innerHTML = `${minutes} min ${seconds} sec`
    }, 1000)
}

///////////////////////////////////////////////////////restart//////////////////////////////////////////////

restart.addEventListener('click', restartBtn)

function restartBtn() {
    steps = 0
    elementsDel()
    elementsAdd(elementsPerString)
    click(items.childNodes)
    clearInterval(timerID)
    isTimer = 0
    steps = 0
    timerText.innerHTML = `0 min 0 sec`
    stepsText.innerHTML = `Steps 0`

    soundBtnFunc(body.childNodes[8].childNodes[0].childNodes[1])

    valueFunc(body.childNodes[8].childNodes[0].childNodes[0])

    body.childNodes[8].childNodes[0].childNodes[0].childNodes[1].querySelectorAll('p').forEach(e => {
        e.addEventListener('click', () => {
            elementsPerString = +e.innerHTML.slice(0, 1)
            restartBtn()
        })
    })
}

/////////////////////////////////////////////////////////sound/////////////////////////////////////////////////

function soundBtnFunc(elem) {
    elem.addEventListener('click', () => {
        console.log('click')
        if (isSound === true) {
            soundBtn.childNodes[0].innerHTML = 'Sound On'
            isSound = false
        } else {
            soundBtn.childNodes[0].innerHTML = 'Sound Off'
            isSound = true
        }
    })
}

function sound() {
    let audio = new Audio()
    audio.src = '../assets/sounds/cell-move.mp3'
    if (isSound === true) {
        audio.autoplay = true
    }
}

///////////////////////////////////////////////////////////field change////////////////////////////////////////////

function valueFunc(elem) {
    elem.addEventListener('click', () => {
        if (isMenu === false) {
            values.childNodes[1].classList.remove('menu-off')
            values.childNodes[1].classList.add('menu-on')
            isMenu = true
        } else {
            values.childNodes[1].classList.remove('menu-on')
            values.childNodes[1].classList.add('menu-off')
            isMenu = false
        }
    })
}