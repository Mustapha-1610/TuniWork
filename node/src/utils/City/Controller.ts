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
    const cityInfos = await city.findById(CityId);
    return res.status(200).json({ Municipality: cityInfos.Municipality });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error" });
  }
};
