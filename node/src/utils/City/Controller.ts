import express from "express";
import city from "./modal";

export const create = async (req: express.Request, res: express.Response) => {
  try {
    const { CityName, municipalityName } = req.body;
    const newCity = await city.create({
      City: CityName,
      Municipality: [municipalityName],
    });
    return res.json({ success: "City Created", newCity });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error" });
  }
};

export const addMunicipality = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { cityId, municipalityName } = req.body;
    await city.findByIdAndUpdate(cityId, {
      $push: {
        Municipality: municipalityName,
      },
    });
    return res.json({ success: "Municipality Added" });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error" });
  }
};

export const getAll = async (req: express.Request, res: express.Response) => {
  try {
    const Cities = await city.find();
    return res.json({ Cities });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error" });
  }
};

export const getMunicipality = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    console.log(req.body);
    const { CityId } = req.body;
    const cityInfos = await city.findById("6560d2439382a73e53a71db2");
    return res.status(200).json("Working");
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error" });
  }
};
