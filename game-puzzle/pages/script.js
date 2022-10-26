const items = document.querySelector('.items')
let elementsPerString = 3

const empty = {
    top: 0,
    left: 0
}

const cells = []
cells.push(empty)

for (let i = 1; i < 9; i++) {
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
                // console.log('element', empty.left, empty.top)
                let tempLeft = el.left
                let tempTop = el.top

                console.log() 
                if (Math.abs((el.left - empty.left)) <= 100 && Math.abs((el.top - empty.top)) <= 100 && (Math.abs((el.top - empty.top)) !== Math.abs((el.left - empty.left)))) {
                    e.style.left = `${empty.left}px`
                    e.style.top = `${empty.top}px`

                    el.left = empty.left
                    el.top = empty.top

                    empty.left = tempLeft
                    empty.top = tempTop
                }
                // console.log('empty', empty.left, empty.top)
            }
        })
        // console.log(e.innerHTML)
        // empty.left = `${left*100}px`
        // empty.top = top
        // e.style.top = `${empty.top*100}px`
        // e.style.left = `${empty.left*100}px`


    })
})