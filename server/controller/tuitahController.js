require("dotenv").config();
const chalk = require("chalk");
const debug = require("debug")("tuitah:tuitahController");
const Tuitah = require("../../database/models/tuitah");

const getTuitah = async (req, res, next) => {
  try {
    const tuits = await Tuitah.find();
    debug(chalk.blue("Haciendo un get a /tuitah/all"));
    debug(chalk.blue("Devuelvo los tuits ->"));
    debug(chalk.blue(tuits));
    res.json(tuits);
  } catch (error) {
    error.code = 400;
    error.message = "Datos erroneos!";
    next(error);
  }
};

const addTuitah = async (req, res, next) => {
  const tuitahBody = req.body;
  debug(chalk.blue("Haciendo un post a /tuitah/add"));
  debug(chalk.blue("Nos llega en el body el tuitah ->"));
  debug(chalk.blue(JSON.stringify(tuitahBody)));
  try {
    debug(chalk.blue("Creando el tuit /tuitah/add"));
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

const likeTuitah = async (req, res, next) => {
  const { id } = req.body;
  debug(chalk.blue("Haciendo un patch a /tuitah/like"));
  debug(chalk.blue(`Con la id ${id}`));
  try {
    const tuit = await Tuitah.findById(id);
    debug(chalk.blue("Modifico el tuit ->"));
    tuit.likes += 1;
    debug(chalk.blue(tuit));
    await tuit.save();
    const tuitLiked = await Tuitah.findOne({ _id: id });
    res.json(tuitLiked);
  } catch (error) {
    error.code = 400;
    error.message = "Datos erroneos!";
    next(error);
  }
};

const deleteTuitah = async (req, res, next) => {
  const { id } = req.body;
  debug(chalk.blue("Haciendo un delete a /tuitah/delete"));
  debug(chalk.blue(`Nos llega en el body el tuitah con id -> ${id}`));
  try {
    debug(chalk.blue("borrando el tuit /tuitah/delete"));
    const tuit = await Tuitah.deleteOne({ id });
    debug(chalk.blue(`Se ha borrado el->`));
    debug(chalk.blue(JSON.stringify(tuit)));
    res.json({ tuit: "Borrado Correctamente!" });
  } catch (problem) {
    debug(chalk.blue("El detonante el catch es->"));
    debug(chalk.blue(problem));
    const error = new Error("Datos erroneos!");
    error.code = 400;
    debug(chalk.blue(`Hemos creado el error de tuit ${JSON.stringify(error)}`));
    next(error);
  }
};

const getTuitById = async (req, res, next) => {
  const { id } = req.params;
  console.log(req.params)
  try {
    const tuitFind = await Tuitah.findById(id);
    if (tuitFind) {
      res.json(tuitFind);
    }
    else {
      const error = new Error("Could not get tuit by id");
      error.code = 404;
      next(error);
    }
  } catch (error) {
    error.code = 400;
    error.message = "General pete getTuitById";
    next(error);
  }
}

module.exports = {
  addTuitah,
  getTuitah,
  likeTuitah,
  deleteTuitah,
  getTuitById,
};
