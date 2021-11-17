require("dotenv").config();
const chalk = require("chalk");
const debug = require("debug")("tuitah:tuitahController");
const Tuitah = require("../../database/models/tuitah");

const addTuitah = async (req, res, next) => {
  const tuitahBody = req.body;
  debug(chalk.blue("Haciendo un post a /tuitah/add"));
  debug(chalk.blue("Nos llega en el body el tuitah ->"));
  debug(chalk.blue(JSON.stringify(tuitahBody)));
  try {
    debug(chalk.blue("Creando usuario en el tuit /tuitah/add"));
    const tuit = await Tuitah.create(tuitahBody);
    debug(chalk.blue(`Hemos creado el tuit ${tuit}`));
    res.json({ tuit: "Creado correctamente!" });
  } catch (problem) {
    debug(chalk.blue("El detonante el catch es->"));
    debug(chalk.blue(problem));
    const error = new Error("Datos erroneos!");
    error.code = 400;
    debug(chalk.blue(`Hemos creado el error de tuit ${JSON.stringify(error)}`));
    next(error);
  }
};

module.exports = {
  addTuitah,
};
