
class dashboardController {

  async index(req, res) {
    res.render('index');
  }
}

module.exports = new dashboardController;