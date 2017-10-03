class Course {
  constructor(hash) {
    this.hash = hash
  }

  get name() {
    return this.hash.data.realisation_name[0].text
  }
}

export default Course