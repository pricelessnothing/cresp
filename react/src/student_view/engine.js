export default class Engine {
  constructor() {
    this.subscribers = []
    this.cards = []
    this.state = {
      deck: [],
      cols: [],
      rows: [],
      expected: {}
    }
  }

  initState(inputData) {
    inputData.forEach((card, i) => {
      const {feature, taxonomy} = card
      const {deck, cols, rows, expected} = this.state
      deck.push(i)
      this.cards.push({...card, id: i})
      if (!cols.includes(feature)) {
        cols.push(feature)
      }
      if (expected[taxonomy]) {
        expected[taxonomy].push(i)
        rows.find(r => r[0] === taxonomy)[1].push(-1)
      } else {
        expected[taxonomy] = [i]
        rows.push([taxonomy, [-1]])
      }
    })
    this.state.deck = this.state.deck.sort(() => Math.random() - 0.5)
    this.notify()
    console.log(this.state)

  }

  subscribe(o) {
    this.subscribers.push(o)
  }

  notify() {
    console.log(this.state)
    this.subscribers.forEach(o => o())
  }

  getHeaders() {
    return this.state.cols
  }

  getDeck() {
    return this.state.deck.map(card => this.getCard(card))
  }

  getRows() {
    return this.state.rows
  }

  getSlotContent(tax, feature) {
    const i = ( this.state.rows.find(r => r[0] === tax) !== undefined && this.state.rows.find(r => r[0] === tax)[1][feature])
    return i > -1 ? this.getCard(i) : null
  }

  getCard(i) {
    return this.cards.find(card => card.id === i)
  }

  moveCard(id, tax, feature) {
    const {deck, rows} = this.state
    const slotContent = rows.find(r => r[0] === tax)[1][feature] //slot empty if -1
    if (deck.find(card => card === id) > -1) { //then it's deck => table movement
      if (slotContent === -1) { //then it's deck => table(empty) movement
        this.state.deck = deck.filter(card => card !== id)
      } else { //then it's swap between deck and table
        deck[deck.findIndex(card => card === id)] = slotContent
      }
    } else { //then it's table => table movement
      let fromTax = -1, fromFeature = -1
      for (const row of rows) {
        fromFeature = row[1].findIndex(card => card === id)
        if (fromFeature > -1) {
          fromTax = row[0]
          break
        }
      }
      rows.find(r => r[0] === fromTax)[1][fromFeature] = slotContent
    }
    rows.find(r => r[0] === tax)[1][feature] = id
    this.notify()
    if (this.win()) {
      setTimeout(() => {
        alert('Поздравляем, вы все сделали верно') //TODO: fire event
      }, 100)
    }
  }

  isCorrect(tax, feature) {
    const {rows, expected} = this.state
    return rows.find(r => r[0] === tax)[1][feature] === expected[tax][feature]
  }

  win() {
    const {rows, expected} = this.state
    for (const row of rows) {
      for(const i in row[1]) {
        if (expected[row[0]][i] !== row[1][i]) return false
      }
    }
    return true
  }
}