import express from "express";
import work from "./modal";

export const create = async (req: express.Request, res: express.Response) => {
  const { WorkTitle, Speciality } = req.body;
  let newWork = await work.create({
    WorkTitle: WorkTitle,
    Speciality: {
      WorkSpeciality: Speciality,
    },
  });
  await newWork.save();
  return res.json({ newWork });
};
