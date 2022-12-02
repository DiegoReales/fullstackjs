import { pool } from "../db.js";

export const getUsers = async (_, res) => {
  const q = "SELECT * FROM users";
  const [result] = await pool.query(q);
  res.json(result);
  // pool.query(q, (err, data) => {
  //   if (err) return res.json(err);

  //   return res.status(200).json(data);
  // });
};

export const addUser = async (req, res) => {
  try {
    const q =
    "INSERT INTO users(`name`, `email`, `phone`, `birthday`) VALUES(?)";

  const values = [
    req.body.name,
    req.body.email,
    req.body.phone,
    req.body.birthday,
  ];

  await pool.query(q, [values])
  return res.status(200).json(`Usuario creado.`);

  // pool.query(q, [values], (err) => {
  //   if (err) return res.json(err);

  //   return res.status(200).json("Usuario creado.");
  // });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({message: error.message});
  }
};

export const updateUser = async (req, res) => {
  
  try {
    const q =
    "UPDATE users SET `name` = ?, `email` = ?, `phone` = ?, `birthday` = ? WHERE `id` = ?";

  const values = [
    req.body.name,
    req.body.email,
    req.body.phone,
    req.body.birthday,
  ];

  await pool.query(q, [...values, req.params.id]);
  return res.json("Usuario actualizado con éxito.");  
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  // pool.query(q, [...values, req.params.id], (err) => {
  //   if (err) return res.json(err);

  //   return res.status(200).json("Usuario actualizado con éxito.");
  // });
};

export const deleteUser = async (req, res) => {
  const q = "DELETE FROM users WHERE `id` = ?";

  const [result] = await pool.query(q, [
    req.params.id,
  ]);
  if (result.affectedRows === 0)
      return res.status(404).json({ message: "Task not found" });

  return res.status(200).json("Usuario eliminado con éxito.");
  // pool.query(q, [req.params.id], (err) => {
  //   if (err) return res.json(err);

  //   return res.status(200).json("Usuario eliminado con éxito.");
  // });
};
