const controller = {};

controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM users', (err, users) => {
     if (err) {
      res.json(err);
     }
     res.render('users', {
        data: users
     });
    });
  });
};

controller.insert = (req, res) => {
  const data = req.body;
  data.date_created = new Date();
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO users set ?', data, (err, users) => {
      res.redirect('/');
    })
  })
};

controller.detail = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM users WHERE id = ?", [id], (err, rows) => {
      res.render('users_edit', {
        data: rows[0]
      })
    });
  });
};

controller.update = (req, res) => {
  const { id } = req.params;
  const newUsers = req.body;
  newUsers.date_created = new Date();
  req.getConnection((err, conn) => {

  conn.query('UPDATE users set ? where id = ?', [newUsers, id], (err, rows) => {
    res.redirect('/');
  });
  });
};

controller.delete = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, connection) => {
    connection.query('DELETE FROM users WHERE id = ?', [id], (err, rows) => {
      res.redirect('/');
    });
  });
}

module.exports = controller;
