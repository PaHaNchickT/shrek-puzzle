const items = document.querySelector('.items')
let elementsPerString = 3
let answer = {}


answer = [
    { top: 0, left: 0 },
    { left: 100, top: 0, inner: 1 },
    { left: 200, top: 0, inner: 2 },
    { left: 0, top: 100, inner: 3 },
    { left: 100, top: 100, inner: 4 },
    { left: 200, top: 100, inner: 5 },
    { left: 0, top: 200, inner: 6 },
    { left: 100, top: 200, inner: 7 },
    { left: 200, top: 200, inner: 8 }
]

const empty = {
    top: 0,
    left: 0
}

const cells = []
cells.push(empty)

for (let i = 1; i < elementsPerString ** 2; i++) {
    const cell = document.createElement('div')
    cell.className = 'cell'
    cell.innerHTML = i

    const left = i % elementsPerString
    const top = (i - left) / elementsPerString

    cell.style.left = `${left * 100}px`
    cell.style.top = `${top * 100}px`

    cells.push({
        left: left * 100,
        top: top * 100,
        inner: i
    })

    items.append(cell)
}

const cell = document.querySelectorAll('.cell')
console.log(cells)

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
                        if (e.inner * 100-100 === e.top * elementsPerString + e.left) {
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

