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

//
export const addSpeciality = async (
  req: express.Request,
  res: express.Response
) => {
  const { speciality, workId } = req.body;
  try {
    let workTable = await work.findById(workId);
    // Create a new object with WorkSpeciality property
    let newSpeciality = { WorkSpeciality: speciality };
    // Push the new object into the Speciality array
    workTable.Speciality.push(newSpeciality);
    await workTable.save();
    return res.json({ workTable });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error !" });
  }
};

//
export const getAllWorkTypes = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const workData = await work.find();
    return res.json({ workData });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error" });
  }
};

//
export const getSpecialities = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { workId } = req.body;
    const workSpecialities = await work.findById(workId);
    return res.json({ Specialities: workSpecialities.Speciality });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error" });
  }
};
