import express from "express";
import languages from "./modal";

export const create = async (req: express.Request, res: express.Response) => {
  try {
    const { language } = req.body;
    const newLanguages = await languages.create({});
    newLanguages.Languages.push(language);
    await newLanguages.save();
    return res.json({ newLanguages });
  } catch (err) {
    console.log(err);
  }
};

export const addLanguage = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { languageId, language } = req.body;
    const languageTable = await languages.findById(languageId);
    if (languageTable.Languages.includes(language)) {
      return res.json({ error: "language exists allready " });
    }
    languageTable.Languages.push(language);
    await languageTable.save();
    return res.json({ success: "language added successfully" });
  } catch (err) {
    console.log(err);
  }
};

export const getAllLanguages = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { languageId } = req.body;
    const languageTable = await languages.findById(languageId);
    return res.json({ languageTable });
  } catch (err) {
    console.log(err);
    return res.json({ error: "Server Error" });
  }
};
