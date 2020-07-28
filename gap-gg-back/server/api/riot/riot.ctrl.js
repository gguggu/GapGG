const express = require('express');
const lib = require('../../lib/riotRequest/riotRequest');

//api 만들기 전에 데이터 가공하는 곳?

const getChampion = async (req, res) => {
  try {
    const data = await lib.getChampion();

    sendResult(res, data);
  } catch (error) {
    catchError(error, res);
  }
}

const getRotation = async (req, res) => {
  try {
    const data = await lib.getRotation();

    sendResult(res, data);
  } catch (error) {
    catchError(error, res);
  }
}

const searchSummonerName = async (req, res) => {
  try {
    const name = req.query.name;
    const data = await lib.searchSummonerName(name);

    sendResult(res, data);
  } catch (error) {
    catchError(error, res);
  }
}

const searchMatchList = async(req, res) => {
  try {
    const accountId = req.query.accountId;
    const begin = parseInt(req.query.beginIndex);
    const end = parseInt(req.query.endIndex);
    
    const data = await lib.searchMatchList(accountId, begin, end);

    sendResult(res, data);
  } catch (error) {
    catchError(error, res);
  }
}

const searchMatch = async(req, res) => {
  try {
    const matchId = req.query.matchId;
    const data = await lib.searchMatch(matchId);

    sendResult(res, data);
  } catch (error) {
    catchError(error, res);
  }
}

const getQueue = async(req, res) => {
  try {
    const data = await lib.getQueue();

    sendResult(res, data);
  } catch (error) {
    catchError(error, res);
  }
}

const getSpell = async(req, res) => {
  try {
    const data = await lib.getSpell();

    sendResult(res, data);
  } catch (error) {
    catchError(error, res);
  }
}

const getSummonerTier = async(req, res) => {
  try {
    const summonerName = req.query.summonerName;
    const data = await lib.getSummonerTier(summonerName);

    sendResult(res, data);
  } catch (error) {
    catchError(error, res);
  }
}

const sendResult = (res, resultData) => {
  const result = {
    status: 200,
    message: '조회 성공',
    data: resultData,
  };

  res.status(200).json(result);
}

const catchError = (error, res) => {
  const { statusCode } = error.response;
  const result = compareErrorStatusMessage(statusCode);

  res.status(result.status).json(result);
}

const compareErrorStatusMessage = (status) => {
  if(status === 504) return { status: status, message: '통신 시간제한 초과' };

  if(status === 429) return { status: status, message: 'api 요청 제한 초과' };

  if(status === 404 || status === 400) return { status: status, message: '잘못된 요청 양식' };

  return { status: 500, message: '서버 에러' };
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