alert('Добрый день, уважаемый проверяющий! У меня был дикий заруб в ВУЗе и, к сожалению, я не успел сделать игру к понедельнику.. Буду безмерно Вам благодарен, если Вы проверите мою работу в четверг.. Discord для связи: ЗИЛИБОБКА-БЕЗУПРЕЧНЫЙ#4853')

const body = document.querySelector('body')
// body.insertAdjacentHTML('beforeend', `<header></header>`)
// body.insertAdjacentHTML('beforeend', `<div class="items"></div>`)
// body.insertAdjacentHTML('beforeend', `<footer></footer>`)

/////////////////////////////////////////////////////init//////////////////////////////////////////


const items = document.querySelector('.items')
const timerText = document.querySelector('.timer')
const restart = document.querySelector('.restart')

let cells = []
let elementsPerString = 4
let isTimer = 0

let empty = {
    top: 0,
    left: 0
}

cells.push(empty)

elementsAdd(elementsPerString)

///////////////////////////////////////////////////adding elements///////////////////////////////////

function elementsAdd(amount) {
    cells = []
    empty = {
        top: 0,
        left: 0
    }
    
    console.log(cells)
    const numbers = [...Array(amount ** 2 - 1).keys()]
        .map(x => x + 1)
        .sort(() => Math.random() - 0.5);

    for (let i = 1; i < amount ** 2; i++) {
        const cell = document.createElement('div')
        cell.className = 'cell'
        cell.innerHTML = numbers[i - 1]

        const left = i % amount
        const top = (i - left) / amount

        cell.style.left = `${left * 80}px`
        cell.style.top = `${top * 80}px`

        cells.push({
            left: left * 80,
            top: top * 80,
            inner: numbers[i - 1]
        })

        items.append(cell)
    }

    items.style.width = `${amount * 80}px`
    items.style.height = `${amount * 80}px`
}

//////////////////////////////////////////////////deleting elements////////////////////////////////////////////

function elementsDel() {
    items.childNodes.forEach(e => {
        items.removeChild(e)
        elementsDel()
    })
}

//////////////////////////////////////////////////////engine////////////////////////////////////////////////////

let cell = items.childNodes

cell.forEach(e => {
    e.addEventListener('click', () => {
        console.log('clicked')
        if (isTimer === 0) {
            timer()
        }
        cells.forEach(el => {
            if (el.inner === +e.innerHTML) {
                let tempLeft = el.left
                let tempTop = el.top

                if (Math.abs((el.left - empty.left)) <= 80 && Math.abs((el.top - empty.top)) <= 80 && (Math.abs((el.top - empty.top)) !== Math.abs((el.left - empty.left)))) {
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
                    if (count1 === elementsPerString * elementsPerString - 1 || count2 === elementsPerString * elementsPerString - 1) {
                        alert('you win')
                    }
                }
            }
        })
    })
})

///////////////////////////////////////////////////////timer//////////////////////////////////////////////

function timer() {
    let seconds = 0,
        minutes = 0
    isTimer = 1
    setInterval(() => {
        seconds++
        if (seconds === 60) {
            minutes++
            seconds = 0
        }
        timerText.innerHTML = `${minutes} min ${seconds} sec`
        console.log(minutes, seconds)
    }, 1000)
}

///////////////////////////////////////////////////////restart//////////////////////////////////////////////

restart.addEventListener('click', function() {
    elementsDel()
    elementsAdd(elementsPerString)
    cell = items.childNodes
    console.log(cell)
})