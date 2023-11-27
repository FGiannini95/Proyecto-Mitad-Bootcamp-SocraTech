class IndexControllers {
  viewHome = (req, res) => {
    res.render("index");
  };

  viewABout = (req, res) => {
    res.render("about");
  }

  viewContact = (req, res) => {
    res.render("contact");
  }
}

module.exports = new IndexControllers()