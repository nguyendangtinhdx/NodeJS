const controller = {};

controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM customer', (err, customers) => {
     if (err) {
      res.json(err);
     }
     res.render('customers', {
        data: customers
     });
    });
  });
};

controller.save = (req, res) => {
  const data = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO customer set ?', data, (err, customer) => {
      console.log(customer)
      res.redirect('/');
    })
  })
};

controller.edit = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM customer WHERE id = ?", [id], (err, rows) => {
      res.render('customers_edit', {
        data: rows[0]
      })
    });
  });
};

controller.update = (req, res) => {
  const { id } = req.params;
  const newCustomer = req.body;
  req.getConnection((err, conn) => {

  conn.query('UPDATE customer set ? where id = ?', [newCustomer, id], (err, rows) => {
    res.redirect('/');
  });
  });
};

controller.delete = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, connection) => {
    connection.query('DELETE FROM customer WHERE id = ?', [id], (err, rows) => {
      res.redirect('/');
    });
  });
}

controller.search = (req, res) => {
  // const { keyword } = req.params;
  var tmp = req.params.keyword;
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM customer WHERE phone = ?", [tmp], (err, customers) => {
     if (err) {
      res.json(err);
     }
     res.render('customers', {
        data: customers
     });
    });
  });
};

controller.loginpage = (req, res) => {
  res.render('login', {});
};

controller.login = (req, res) => {
  var data = req.body;
  // res.json(data.email + data.password);
  req.getConnection((err, conn) => {
  //   if(conn.query("SELECT * FROM customer WHERE email = " + data.email + " AND password =  " + data.password +" ") == true)
  //   {
  //     conn.query('SELECT * FROM customer', (err, customers) => {
  //       if (err) {
  //         res.json(err);
  //       }
  //       res.render('customers', {
  //         data: customers
  //       });
  //     });
  //   }
    conn.query("SELECT * FROM customer WHERE email = ? AND password = ?", [data.email, data.password], (err, customers) => {
      res.render('customers', {
        data: customers
      });
    });
    // res.end(x + "a");
    // if(x != 0){
    //   conn.query('SELECT * FROM customer', (err, customers) => {
    //     if (err) {
    //       res.json(err);
    //     }
    //     res.render('customers', {
    //       data: customers
    //     });
    //   });
    // }else{
    //   res.render('login', {});
    // }
    
  });
};

module.exports = controller;
