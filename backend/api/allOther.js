const managemodel = require("../model/moviemodel");
const adminmodel = require("../model/adminmodel");
const moviemodel = require("../model/bookmoviemodel");
const paymentmodel = require("../model/paymentmodel");
const ticketmodel = require("../model/ticketmodel");

module.exports = function (app) {
    // GET APi to get all the users
    app.get('/user/add', (req, res) => {
        managemodel.find().then((userRes) => {
            res.send({ users: userRes });
        }).catch((error) => {
            res.status(400).send({ message: "Some error occured", error });
        });
    })
    //movie adding
app.post('/addmovie',  (req, res) => {
    const New= req.body;

            managemodel.create({
                movieId: New. movieId ,
                movieName: New.movieName,
                category: New. category,
                image: New.image,
                description: New.description,
                releaseDate:New.releaseDate,
                cast: New.cast,
                crew: New.crew
            }).then(() => {
                res.send({ message: "movie added succesfully", status: 1 })
            }).catch(() => {
                res.send({ message: "Error createing .", status: 0 })
            })
       
});
app.get('/viewmovie', (req, res) => {console.log(req.body)
    console.log(req.query)
    fetchmovie(req,res)
  })
  async function fetchmovie(req,res){
    const data = await managemodel.find();
    res.send({"status":200,"data":data});
  }
  app.put('/updatemovie', async (req, res) => {
    try {
      const movieId = req.query.movieId || req.body.movieId;
      await managemodel.updateOne({ movieId: movieId });
      res.json({ message: 'movie update successfully' });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Failed to update the movie' });
    }
  });
  app.delete('/deletemovie', async (req, res) => {
    try {
      const movieId = req.query.movieId || req.body.movieId;
      await managemodel.deleteOne({ movieId: movieId });
      res.json({ message: 'movie delete successfully' });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Failed to delete the movie' });
    }
  });

    // GET APi to get all the users
    app.get('/users/admin', (req, res) => {
        adminModel.find().then((userRes) => {
            res.send({ users: userRes });
        }).catch((error) => {
            res.status(400).send({ message: "Some error occured", error });
        });
    })

    // To create admin
    app.post('/admin/create', (req, res) => {
        const credential = req.body;

       
                adminmodel.create({
                    userName: credential.userName,
                    password: credential.password
                }).then(() => {
                    res.send({ message: "User created succesfully", status: 1 })
                }).catch(() => {
                    res.send({ message: "Error createing the user.", status: 0 })
                })
            });

            // GET APi to get all the users
            app.get('/user/movie', (req, res) => {
                moviemodel.find().then((userRes) => {
                    res.send({ users: userRes });
                }).catch((error) => {
                    res.status(400).send({ message: "Some error occured", error });
                });
            })
            app.post('/user/bookmovie',  (req, res) => {
                const credentials = req.body;
        
        
        
                        moviemodel.create({
                            viewerName: credentials.viewerName,
                            movieName: credentials.movieName,
                            date: credentials.date,
                            time: credentials.time
                        }).then(() => {
                            res.send({ message: "booking succesfully", status: 1 })
                        }).catch(() => {
                            res.send({ message: "Error createing the user.", status: 0 })
                        })
                   
        });

            // GET APi to get all the users
            app.get('/user/payment', (req, res) => {
                paymentmodel.find().then((userRes) => {
                    res.send({ users: userRes });
                }).catch((error) => {
                    res.status(400).send({ message: "Some error occured", error });
                });
            })
            app.post('/payment',  (req, res) => {
                const Model = req.body;
        
        
        
                        paymentmodel.create({
                            viewerName: Model.viewerName,
                            date: Model.date,
                            cardNumber: Model.cardNumber,
                            expiryDate: Model.expiryDate,
                            cvv: Model.cvv

                        }).then(() => {
                            res.send({ message: "payment succesfully", status: 1 })
                        }).catch(() => {
                            res.send({ message: "Error createing .", status: 0 })
                        })
                   
        });

            // GET APi to get all the users
            app.get('/user/seats', (req, res) => {
                ticketmodel.find().then((userRes) => {
                    res.send({ users: userRes });
                }).catch((error) => {
                    res.status(400).send({ message: "Some error occured", error });
                });
            })
            
        app.post('/tickets',  (req, res) => {
            const seats= req.body;
        
                    ticketmodel.create({
                        movieId: seats.movieId ,
                        movieName: seats.movieName,
                        numberOfSeats:seats.numberOfSeats,
                       
                        
                    }).then(() => {
                        res.send({ message: "ticket added succesfully", status: 1 })
                    }).catch(() => {
                        res.send({ message: "Error createing .", status: 0 })
                    })
               
        });
        app.get('/viewtickets', (req, res) => {console.log(req.body)
            console.log(req.query)
            fetch(req,res)
          })
          async function fetch(req,res){
            const list = await ticketmodel.find();
            res.send({"status":200,"list":list});
          }
          
        }

