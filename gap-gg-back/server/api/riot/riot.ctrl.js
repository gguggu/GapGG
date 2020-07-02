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

const searchMatchList = async(req, res) => {
  try {
    const accountId = req.query.accountId;
    const begin = parseInt(req.query.beginIndex);
    const end = parseInt(req.query.endIndex);
    const data = await lib.searchMatchList(accountId, begin, end);
    res.json(data);
  } catch (error) {
    throw error;
  }
}

const searchMatch = async(req, res) => {
  try {
    const matchId = req.query.matchId;
    const data = await lib.searchMatch(matchId);
    res.json(data);
  } catch (error) {
    throw error;
  }
}

const getQueue = async(req, res) => {
  try {
    const data = await lib.getQueue();
    res.json(data);
  } catch (error) {
    throw error;
  }
}

const getSpell = async(req, res) => {
  try {
    const data = await lib.getSpell();
    res.json(data);
  } catch (error) {
    throw error;
  }
}

const getSummonerTier = async(req, res) => {
  try {
    const summonerName = req.query.summonerName;
    const data = await lib.getSummonerTier(summonerName);
    res.json(data);
  } catch (error) {
    throw error;
  }
}

module.exports={
  getChampion: getChampion,
  getRotation: getRotation,
  searchSummonerName: searchSummonerName,
  searchMatchList: searchMatchList,
  searchMatch: searchMatch,
  getQueue: getQueue,
  getSpell: getSpell,
  getSummonerTier: getSummonerTier
};