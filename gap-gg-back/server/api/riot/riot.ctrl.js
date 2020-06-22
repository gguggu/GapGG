const express = require('express');
const lib = require('../../lib/riotRequest/riotRequest');

//api 만들기 전에 데이터 가공하는 곳?

const getChampion = async (req, res) => {
  try {
    const data = await lib.getChampion();
    res.json(data);
  } catch (error) {
    throw error;
  }
}

const getRotation = async (req, res) => {
  try {
    const data = await lib.getRotation();
    res.json(data);
  } catch (error) {
    throw error;
  }
}

const searchSummonerName = async (req, res) => {
  try {
    const name = req.query.name;
    const data = await lib.searchSummonerName(name);
    res.json(data);
  } catch (error) {
    throw error;
  }
}

module.exports={
  getChampion: getChampion,
  getRotation: getRotation,
  searchSummonerName: searchSummonerName
};