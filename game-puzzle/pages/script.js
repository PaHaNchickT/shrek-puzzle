const body = document.querySelector('body')
body.insertAdjacentHTML('beforeend', `<header></header>`)
body.insertAdjacentHTML('beforeend', `<div class="items"></div>`)
body.insertAdjacentHTML('beforeend', `<footer></footer>`)

/////////////////////////////////////////////////////init//////////////////////////////////////////

const items = document.querySelector('.items')
const cells = []
let elementsPerString = 3

const empty = {
    top: 0,
    left: 0
}

cells.push(empty)

elementsAdd(3)

///////////////////////////////////////////////////making elements///////////////////////////////////

function elementsAdd(amount) {
    const numbers = [...Array(amount ** 2 - 1).keys()]
    .map(x => x + 1)
    .sort(() => Math.random() - 0.5);

    for (let i = 1; i < amount ** 2; i++) {
        const cell = document.createElement('div')
        cell.className = 'cell'
        cell.innerHTML = numbers[i - 1]

        const left = i % amount
        const top = (i - left) / amount

        cell.style.left = `${left * 100}px`
        cell.style.top = `${top * 100}px`

        cells.push({
            left: left * 100,
            top: top * 100,
            inner: numbers[i - 1]
        })

        items.append(cell)
    }
}

//////////////////////////////////////////////////////engine////////////////////////////////////////////////////

const cell = document.querySelectorAll('.cell')

cell.forEach(e => {
    e.addEventListener('click', () => {
        cells.forEach(el => {
            if (el.inner === +e.innerHTML) {
                let tempLeft = el.left
                let tempTop = el.top

                if (Math.abs((el.left - empty.left)) <= 100 && Math.abs((el.top - empty.top)) <= 100 && (Math.abs((el.top - empty.top)) !== Math.abs((el.left - empty.left)))) {
                    e.style.left = `${empty.left}px`
                    e.style.top = `${empty.top}px`

                    el.left = empty.left
                    el.top = empty.top

                    empty.left = tempLeft
                    empty.top = tempTop

                    let count1 = 0,
                        count2 = 0
                    cells.forEach(e => {
                        if (e.inner * 100 === e.top * elementsPerString + e.left) {
                            count1++
                        }
                        if (e.inner * 100 - 100 === e.top * elementsPerString + e.left) {
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

