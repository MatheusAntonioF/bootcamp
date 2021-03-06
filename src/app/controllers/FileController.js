import File from '../models/File';

class FileController {
  async store(req, res) {
    // desestrutura array
    const { originalname: name, filename: path } = req.file;

    const file = await File.create({
      name,
      path,
    });
    // retorna json
    return res.json(file);
  }
}

export default new FileController();
