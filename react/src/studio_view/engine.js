export default class Engine {
  constructor() {
    this.id = 1
    this.state = {
      features: [],
      taxonomies: [],
      cards: []
    }
    this.errors = {
      taxonomies: [],
      features: [],
      cards: []
    }
    this.subscribers = []
    this.editableCard = null
    this.isInitialized = false
  }

  initState(inputData) {
    if (this.isInitialized) return
    this.isInitialized = true
    const {features, taxonomies, cards} = this.state
    inputData.forEach(card => {
      const feature = features.find(f => f.text === card.feature)
      const taxonomy = taxonomies.find(t => t.text === card.taxonomy)
      let featureId = feature ? feature.id : this.id++
      let taxonomyId = taxonomy ? taxonomy.id : this.id++
      if (!feature) {
        features.push({ id: featureId, text: card.feature })
      }
      if (!taxonomy) {
        taxonomies.push({ id: taxonomyId, text: card.taxonomy})
      }
      cards.push({...card, taxonomy: taxonomyId, feature: featureId})
    })
  }

  subscribe(o) {
    this.subscribers.push(o)
  }

  notify() {
    this.checkErrors()
    this.subscribers.forEach(o => o())
  }

  checkErrors() {
    this.errors.features = []
    this.errors.taxonomies = []
    this.errors.cards = []
    for (let i = 0; i < this.state.features.length; i++) {
      for(let j = i+1; j < this.state.features.length; j++) {
        if (this.state.features[i].text === this.state.features[j].text) {
          this.errors.features.push(this.state.features[i].id, this.state.features[j].id)
        }
      }
    }
    for (let i = 0; i < this.state.taxonomies.length; i++) {
      for(let j = i+1; j < this.state.taxonomies.length; j++) {
        if (this.state.taxonomies[i].text === this.state.taxonomies[j].text) {
          this.errors.taxonomies.push(this.state.taxonomies[i].id, this.state.taxonomies[j].id)
        }
      }
    }
    for (let i = 0; i < this.state.cards.length; i++) {
      for(let j = i+1; j < this.state.cards.length; j++) {
        if (this.state.cards[i].contentValue === this.state.cards[j].contentValue) {
          this.errors.cards.push(
            [this.state.cards[i].taxonomy, this.state.cards[i].feature],
            [this.state.cards[j].taxonomy, this.state.cards[j].feature])
        }
      }
    }
  }

  getErrors(category) {
    if (this.errors[category]) {
      return this.errors[category]
    } else {
      return this.errors
    }
  }

  getFeatures() {
    return this.state.features
  }

  addFeature() {
    const featureId = this.id++
    this.state.features.push({id: featureId, text: 'NewFeature'})
    this.state.taxonomies.forEach(({id}) => {
      this.state.cards.push({
        feature: featureId,
        taxonomy: id,
        contentType: 'text',
        contentValue: 'newCard'
      })
    })
    this.notify()
  }

  updateFeature(text, id) {
    this.state.features.find(f => f.id === id).text = text
    this.notify()
  }

  removeFeature(id) {
    this.state.features = this.state.features.filter(f => f.id !== id)
    this.state.cards = this.state.cards.filter(c => c.feature !== id)
    this.notify()
  }

  getTaxonomies() {
    return this.state.taxonomies
  }

  addTaxonomy() {
    const taxId = this.id++
    this.state.taxonomies.push({id: taxId, text: 'NewTaxonomy'})
    this.state.features.forEach(({id}) => this.state.cards.push({
      feature: id,
      taxonomy: taxId,
      contentType: 'text',
      contentValue: 'newCard'
    }))
    this.notify()
  }

  updateTaxonomy(text, id) {
    this.state.taxonomies.find(t => t.id === id).text = text
    this.notify()
  }

  removeTaxonomy(id) {
    this.state.taxonomies = this.state.taxonomies.filter(t => t.id !== id)
    this.state.cards = this.state.cards.filter(c => c.taxonomy !== id)
    this.notify()
  }

  getCard(taxonomyId, featureId) {
    return this.state.cards.find(c => c.taxonomy === taxonomyId && c.feature === featureId)
  }

  editCard(taxonomyId, featureId) {
    this.editableCard = this.getCard(taxonomyId, featureId) || null
    this.notify()
  }

  updateCard(type, value) {
    if (this.editableCard){
      const {taxonomy, feature} = this.editableCard
      this.getCard(taxonomy, feature).contentType = type
      this.getCard(taxonomy, feature).contentValue = value
    }
    this.notify()
  }

  getEditableCard() {
    return this.editableCard
  }

  exportCards() {
    const errors = this.getErrors()

    if (errors.features.length === 0 &&
      errors.taxonomies.length === 0 &&
      errors.cards.length === 0) {
      return this.state.cards.map(c => ({
        ...c,
        feature: this.state.features.find(f => f.id === c.feature).text,
        taxonomy: this.state.taxonomies.find(t => t.id === c.taxonomy).text
      }))
    }
    return 'Task contains duplicated items'
  }
}